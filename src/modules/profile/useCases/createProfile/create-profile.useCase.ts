import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDTO } from '@modules/profile/dtos/create-profile.dto';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { IProfileRepository } from '@modules/profile/repositories/IProfileRepository';

@Injectable()
export class CreateProfileUseCase {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private ormRepository: IProfileRepository,
  ) {}

  public async execute(profile: CreateProfileDTO): Promise<Profile> {
    return await this.ormRepository.create(profile);
  }
}
