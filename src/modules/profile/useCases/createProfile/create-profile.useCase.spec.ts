import { GenderProfileDTO } from '../../dtos/create-profile.dto';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/ProfileRepositoryInMemory';
import { CreateProfileUseCase } from './create-profile.useCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createProfileUseCase: CreateProfileUseCase;

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createProfileUseCase = new CreateProfileUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a new profile', async () => {
    const createdUser = await createProfileUseCase.execute({
      usr_id: 'User 01',
      gender: GenderProfileDTO.MALE,
      birthday: new Date('1995-11-11'),
      phone: '1111111',
    });

    expect(createdUser).toHaveProperty('id');
  });
});
