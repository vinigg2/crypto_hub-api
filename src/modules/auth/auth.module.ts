import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from '@src/config/jwt';

import JwtProvider from '@src/common/providers/JwtProvider/implementations/JwtProvider';
import BCryptHashProvider from '@src/common/providers/HashProvider/implementations/BCryptHashProvider';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users.repository';

import { LoginAuthController } from './infra/http/controllers/login-auth.controller';
import { RegisterAuthController } from './infra/http/controllers/register-auth.controller';

import { LoginAuthUseCase } from './useCases/loginAuth/login-auth.useCase';
import { RegisterAuthUseCase } from './useCases/registerAuth/register-auth.useCase';
import { FindUserUseCase } from '@modules/users/useCases/findUser/find-user.useCase';
import { CreateUserUseCase } from '@modules/users/useCases/createUser/create-user.useCase';

@Module({
  imports: [JwtModule.register(jwt)],
  controllers: [LoginAuthController, RegisterAuthController],
  providers: [
    LoginAuthUseCase,
    RegisterAuthUseCase,
    FindUserUseCase,
    CreateUserUseCase,
    JwtProvider,
    BCryptHashProvider,
    {
      provide: 'USERS_REPOSITORY',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
})
export class AuthModule {}
