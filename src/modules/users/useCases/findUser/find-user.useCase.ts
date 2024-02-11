import { Inject, Injectable } from '@nestjs/common';
import { User } from '@modules/users/infra/typeorm/entities/user.entity';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject('USERS_REPOSITORY')
    private ormRepository: IUserRepository,
  ) {}

  public async byEmail(email: string): Promise<User> {
    return await this.ormRepository.showByEmail(email);
  }
}
