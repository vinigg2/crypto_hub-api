import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthUseCase } from '@modules/auth/useCases/loginAuth/login-auth.useCase';
import {
  LoginCredentialsAuthDTO,
  LoginAuthDTO,
} from '@modules/auth/dtos/login-auth.dtos';

@Controller('auth')
export class LoginAuthController {
  constructor(private loginAuthUseCase: LoginAuthUseCase) {}

  @Post('login')
  async login(
    @Body() credentials: LoginCredentialsAuthDTO,
  ): Promise<LoginAuthDTO> {
    return await this.loginAuthUseCase.execute(credentials);
  }
}
