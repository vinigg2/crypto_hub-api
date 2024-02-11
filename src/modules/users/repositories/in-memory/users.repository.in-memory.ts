import { EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from '@modules/users/dtos/create-user.dto';
import { User } from '@modules/users/infra/typeorm/entities/user.entity';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';

@EntityRepository(User)
export class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    status,
  }: CreateUserDTO): Promise<User> {
    const user = {
      id: uuid(),
      name,
      password,
      email,
      status,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async showByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
