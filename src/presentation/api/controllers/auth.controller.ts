import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body, HttpStatus, HttpCode
} from '@nestjs/common';
import { AuthManager } from '../../../domain/auth/auth.manager';
import { CreateUserDto } from '../../../entities/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthManager) {
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
