import { EntityRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateProfileDTO } from '@modules/profile/dtos/create-profile.dto';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { IProfileRepository } from '@modules/profile/repositories/IProfileRepository';

@EntityRepository(Profile)
export class UsersRepositoryInMemory implements IProfileRepository {
  profiles: Profile[] = [];

  async create({
    birthday,
    phone,
    avatar,
    gender,
    user,
  }: CreateProfileDTO): Promise<Profile> {
    const profile = {
      id: uuid(),
      birthday,
      avatar,
      phone,
      gender,
      user,
      created_at: new Date(),
    };

    this.profiles.push(profile);

    return profile;
  }

  async showByUserId(usr_id: string): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}
