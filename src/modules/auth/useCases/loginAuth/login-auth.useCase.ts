import { HttpStatus, Injectable } from '@nestjs/common';

import JwtProvider from '@src/common/providers/JwtProvider/implementations/JwtProvider';
import BCryptHashProvider from '@src/common/providers/HashProvider/implementations/BCryptHashProvider';

import {
  LoginAuthDTO,
  LoginCredentialsAuthDTO,
} from '@modules/auth/dtos/login-auth.dtos';
import { FindUserUseCase } from '@modules/users/useCases/findUser/find-user.useCase';
import { AuthenticationException } from '@modules/auth/infra/http/exceptions/login-auth.exceptions';
import { FindProfileUseCase } from '@modules/profile/useCases/findProfile/find-profile.useCase';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findProfileUseCase: FindProfileUseCase,
    private bCryptHashProvider: BCryptHashProvider,
  ) {}

  public async execute(
    credentials: LoginCredentialsAuthDTO,
  ): Promise<LoginAuthDTO> {
    try {
      const findUser = await this.findUserUseCase.byEmail(credentials.email);
      const findProfile = await this.findProfileUseCase.byUserId(findUser.id);
      const user: any = {
        email: findUser.email,
        name: findUser.name,
        id: findUser.id,
      };

      if (findProfile) {
        user.profile = findProfile;
      }

      if (!findUser) {
        throw new AuthenticationException(
          {
            name: 'error',
            message: 'Usuário ou senha não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const comparePassword = await this.bCryptHashProvider.compareHash(
        credentials.password,
        findUser.password,
      );

      if (!comparePassword) {
        throw new AuthenticationException(
          {
            name: 'error',
            message: 'Usuário ou senha não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const accessToken = await this.jwtProvider.generateToken({
        usr_id: findUser.id,
      });


      return {
        accessToken,
        expiresIn: '1d',
        tokenType: 'user',
        user,
      };
    } catch (e) {
      throw new AuthenticationException(e);
    }
  }
}
