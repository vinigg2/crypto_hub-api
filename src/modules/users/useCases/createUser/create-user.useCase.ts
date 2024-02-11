import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';
import { User } from '@modules/users/infra/typeorm/entities/user.entity';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import BCryptHashProvider from '@src/common/providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserException } from '../../infra/exceptions/create-user.exceptions';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('USERS_REPOSITORY')
    private ormRepository: IUserRepository,
    private bCryptHashProvider: BCryptHashProvider,
  ) {}

  public async execute(user: CreateUserDTO): Promise<User> {
    try {
      user.password = await this.bCryptHashProvider.generateHash(user.password);
      return await this.ormRepository.create(user);
    } catch (err) {
      throw new CreateUserException();
    }
  }
}
