import { Controller, Get, Req } from '@nestjs/common';
import { RefreshAuthUseCase } from '@modules/auth/useCases/refreshAuth/refresh-auth.useCase';
import { LoginAuthDTO } from '@modules/auth/dtos/login-auth.dtos';

@Controller('auth')
export class RefreshAuthController {
  constructor(private refreshAuthUseCase: RefreshAuthUseCase) {}

  @Get('refresh')
  async execute(@Req() request: any): Promise<LoginAuthDTO> {
    return await this.refreshAuthUseCase.execute(
      request.user.usr_id,
      request.token,
    );
  }
}
