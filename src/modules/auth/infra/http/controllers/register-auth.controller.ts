import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/create-user.useCase';
import { LoginAuthDTO } from '@modules/auth/dtos/login-auth.dtos';
import { CreateUserDTO } from '@src/modules/users/dtos/create-user.dto';
import { RegisterAuthUseCase } from '@src/modules/auth/useCases/registerAuth/register-auth.useCase';

@Controller('auth')
export class RegisterAuthController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private registerAuthUseCase: RegisterAuthUseCase,
  ) {}

  @Post('register')
  async register(@Body() user: CreateUserDTO): Promise<LoginAuthDTO> {
    const newUser = await this.createUserUseCase.execute(user);
    return this.registerAuthUseCase.execute(newUser);
  }
}
