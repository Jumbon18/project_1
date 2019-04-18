import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body, HttpStatus, HttpCode, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
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
