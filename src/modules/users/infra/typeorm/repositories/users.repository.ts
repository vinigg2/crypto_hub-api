import { CreateUserDTO, UserStatus } from '@modules/users/dtos/create-user.dto';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '@modules/users/infra/typeorm/entities/user.entity';
import { CreateUserException } from '../../exceptions/create-user.exceptions';

@EntityRepository(User)
export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(User);
  }

  async show(id: string): Promise<User> {
    try {
      return await this.ormRepository.findOne(
        {
          id,
          status: UserStatus.ACTIVE,
        },
        {
          select: ['password', 'name', 'id', 'email'],
        },
      );
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }

  async showByEmail(email: string): Promise<User> {
    try {
      return await this.ormRepository.findOne(
        {
          email,
          status: UserStatus.ACTIVE,
        },
        {
          select: ['password', 'name', 'id', 'email'],
        },
      );
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }

  async create({ email, name, password }: CreateUserDTO): Promise<User> {
    try {
      const newUser = this.ormRepository.create({
        id: uuid(),
        name,
        password,
        email,
      });

      this.ormRepository.save(newUser);

      return newUser;
    } catch (err) {
      throw new CreateUserException();
    }
  }
}
