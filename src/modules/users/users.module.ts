import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Providers
import BCryptHashProvider from '@src/common/providers/HashProvider/implementations/BCryptHashProvider';

// Entities
import { User } from './infra/typeorm/entities/user.entity';

// Controllers
import { CreateUserController } from './infra/http/controllers/create-user.controller';

// Repositories
import { UsersRepository } from './infra/typeorm/repositories/users.repository';

// UseCases
import { CreateUserUseCase } from './useCases/createUser/create-user.useCase';
import { FindUserUseCase } from './useCases/findUser/find-user.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    BCryptHashProvider,
    {
      provide: 'USERS_REPOSITORY',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
  exports: [CreateUserUseCase, FindUserUseCase],
})
export class UsersModule {}
