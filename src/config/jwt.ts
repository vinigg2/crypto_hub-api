import { JwtModuleOptions } from '@nestjs/jwt';

export const jwt: JwtModuleOptions = {
  secret: String(process.env.JWT_SECRET),
  signOptions: { expiresIn: String(process.env.JWT_EXPIRES) },
};
