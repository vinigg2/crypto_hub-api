import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../infra/typeorm/entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<User>;
  showByEmail(email: string): Promise<User>;
}
