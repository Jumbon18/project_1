import { authenticate } from 'passport';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  ValidationPipe,
  Body, HttpStatus, HttpCode, UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local-login'))
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.login(req.email, req.password);
  }

  @Get('logout')
  public async logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.json());
  }
}
