import { HttpStatus, Injectable } from '@nestjs/common';
import JwtProvider from '@src/common/providers/JwtProvider/implementations/JwtProvider';

import { LoginAuthDTO } from '@modules/auth/dtos/login-auth.dtos';
import { FindUserUseCase } from '@modules/users/useCases/findUser/find-user.useCase';
import { AuthenticationException } from '@modules/auth/infra/http/exceptions/login-auth.exceptions';
import { FindProfileUseCase } from '@modules/profile/useCases/findProfile/find-profile.useCase';

@Injectable()
export class RefreshAuthUseCase {
  constructor(
    private readonly jwtProvider: JwtProvider,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findProfileUseCase: FindProfileUseCase,
  ) {}

  public async execute(id: string, token: string): Promise<LoginAuthDTO> {
    try {
      const validToken = await this.jwtProvider.verifyToken(token);

      if (!validToken) {
        throw new AuthenticationException(
          {
            name: 'error',
            message: 'Token inválido',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const findUser = await this.findUserUseCase.byId(id);

      if (!findUser) {
        throw new AuthenticationException(
          {
            name: 'error',
            message: 'Usuário ou senha não encontrado',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const user: any = {
        email: findUser.email,
        name: findUser.name,
        id: findUser.id,
      };

      const findProfile = await this.findProfileUseCase.byUserId(findUser.id);

      if (findProfile) {
        user.profile = findProfile;
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
