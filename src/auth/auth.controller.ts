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
  @HttpCode(HttpStatus.OK)
  public async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }

  @Get('logout')
  public async logout(@Req() req, @Res() res) {
    req.session.destroy(() => res.json());
  }
}
