import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { IProfileRepository } from '@modules/profile/repositories/IProfileRepository';

@Injectable()
export class FindProfileUseCase {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private ormRepository: IProfileRepository,
  ) {}

  public async byUserId(usr_id: string): Promise<Profile> {
    return await this.ormRepository.showByUserId(usr_id);
  }
}
