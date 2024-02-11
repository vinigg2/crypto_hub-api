import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProfileDTO } from '@modules/profile/dtos/create-profile.dto';
import { CreateProfileUseCase } from '@modules/profile/useCases/createProfile/create-profile.useCase';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';
import { multer } from '@src/config/multer';

@Controller('profile')
export class CreateProfileController {
  constructor(private createProfileUseCase: CreateProfileUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar', multer))
  public async execute(
    @Body() profile: CreateProfileDTO,
    @Req() request: any,
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<Profile> {
    const newProfile = profile;
    newProfile.user = request.user.usr_id;

    if (file) {
      newProfile.avatar = file.location;
    }

    return await this.createProfileUseCase.execute(newProfile);
  }
}
