import { CreateProfileDTO } from '../dtos/create-profile.dto';
import { Profile } from '../infra/typeorm/entities/profile.entity';

export interface IProfileRepository {
  create(profile: CreateProfileDTO): Promise<Profile>;
  showByUserId(usr_id: string): Promise<Profile>;
}
