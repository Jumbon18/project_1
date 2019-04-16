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

  @Post('signup')
  public async signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.signUp(user);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local-signIn'))
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.createToken(req.user);

  }

  @Get('signout')
  public async signout(@Req() req, @Res() res) {
    req.session.destroy(() => res.json(true));
  }
}
