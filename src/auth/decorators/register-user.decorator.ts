import { createParamDecorator } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';

export const RegisterUser = createParamDecorator((data, req) => {
  const { email, password } = req.body;
  return { email, password } as RegisterUserDto;
});
