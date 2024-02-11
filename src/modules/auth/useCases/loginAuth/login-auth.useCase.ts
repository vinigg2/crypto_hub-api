import { Injectable } from '@nestjs/common';

import JwtProvider from '@src/common/providers/JwtProvider/implementations/JwtProvider';
import BCryptHashProvider from '@src/common/providers/HashProvider/implementations/BCryptHashProvider';

import {
  LoginCredentialsAuthDTO,
  LoginAuthDTO,
} from '@modules/auth/dtos/login-auth.dtos';
import { FindUserUseCase } from '@modules/users/useCases/findUser/find-user.useCase';
import { AuthenticationException } from '@modules/auth/infra/http/exceptions/login-auth.exceptions';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly findUserUseCase: FindUserUseCase,
    private bCryptHashProvider: BCryptHashProvider,
  ) {}

  public async execute(
    credentials: LoginCredentialsAuthDTO,
  ): Promise<LoginAuthDTO> {
    const findUser = await this.findUserUseCase.byEmail(credentials.email);

    if (!findUser) {
      throw new AuthenticationException();
    }

    const comparePassword = await this.bCryptHashProvider.compareHash(
      credentials.password,
      findUser.password,
    );

    if (!comparePassword) {
      throw new AuthenticationException();
    }

    const accessToken = await this.jwtProvider.generateToken({
      usr_id: findUser.id,
    });

    return {
      accessToken,
      expiresIn: '1d',
      tokenType: 'user',
    };
  }
}
