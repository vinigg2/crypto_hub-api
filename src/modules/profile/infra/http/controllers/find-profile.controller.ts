import { Controller, Get, Req } from '@nestjs/common';
import { FindProfileUseCase } from '@modules/profile/useCases/findProfile/find-profile.useCase';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';

@Controller('profile')
export class FindProfileController {
  constructor(private findProfileUseCase: FindProfileUseCase) {}

  @Get()
  public async execute(@Req() request): Promise<Profile> {
    return await this.findProfileUseCase.byUserId(request.user.usr_id);
  }
}
