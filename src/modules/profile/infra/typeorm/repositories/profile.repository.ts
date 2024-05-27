import { CreateProfileDTO } from '@modules/profile/dtos/create-profile.dto';
import { IProfileRepository } from '@modules/profile/repositories/IProfileRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { CreateProfileException } from '../../exceptions/create-profile.exceptions';
import { FindProfileException } from '../../exceptions/find-profile.exceptions';

@EntityRepository(Profile)
export class ProfileRepository implements IProfileRepository {
  private ormRepository: Repository<Profile>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Profile);
  }

  async create(profile: CreateProfileDTO): Promise<Profile> {
    try {
      const newProfile = this.ormRepository.create({
        id: uuid(),
        ...profile,
      });

      this.ormRepository.save(newProfile);

      return newProfile;
    } catch (err) {
      throw new CreateProfileException();
    }
  }

  async showByUserId(usr_id: any): Promise<Profile> {
    const profile = await this.ormRepository.findOne(
      {
        user: {
          id: usr_id,
        },
      },
      {
        relations: ['user'],
      },
    );
    return profile;
  }
}
