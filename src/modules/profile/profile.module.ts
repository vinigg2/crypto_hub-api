import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Profile } from './infra/typeorm/entities/profile.entity';

// Controllers
import { CreateProfileController } from './infra/http/controllers/create-profile.controller';
import { FindProfileController } from './infra/http/controllers/find-profile.controller';

// Repositories
import { ProfileRepository } from './infra/typeorm/repositories/profile.repository';

// UseCases
import { CreateProfileUseCase } from './useCases/createProfile/create-profile.useCase';
import { FindProfileUseCase } from './useCases/findProfile/find-profile.useCase';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [CreateProfileController, FindProfileController],
  providers: [
    CreateProfileUseCase,
    FindProfileUseCase,
    {
      provide: 'PROFILE_REPOSITORY',
      inject: [ProfileRepository],
      useClass: ProfileRepository,
    },
  ],
  exports: [CreateProfileUseCase, FindProfileUseCase],
})
export class ProfileModule {}
