import { Injectable } from '@nestjs/common';
import { LoginAuthDTO } from '@modules/auth/dtos/login-auth.dtos';
import { RegisterAuthException } from '@modules/auth/infra/http/exceptions/register-auth.exceptions';
import { CreateUserDTO } from '@src/modules/users/dtos/create-user.dto';
import JwtProvider from '@src/common/providers/JwtProvider/implementations/JwtProvider';

@Injectable()
export class RegisterAuthUseCase {
  constructor(private readonly jwtProvider: JwtProvider) {}

  public async execute(user: CreateUserDTO): Promise<LoginAuthDTO> {
    if (!user || !user?.id) {
      throw new RegisterAuthException();
    }

    const dataCredentials = {
      usr_id: user.id,
    };

    const accessToken = await this.jwtProvider.generateToken(dataCredentials);

    return {
      accessToken,
      expiresIn: '1d',
      tokenType: 'user',
    };
  }
}
