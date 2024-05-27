import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwt } from '@src/config/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '@modules/profile/infra/typeorm/entities/profile.entity';

@Injectable()
export class CommonAuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
      }

      const decoded = this.verifyToken(token);

      req['user'] = decoded;
      req['token'] = token;

      const profile = await this.getProfile(decoded.usr_id);

      if (profile) {
        req['profile'] = profile.id;
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Token inválido' });
    }
  }

  private verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: jwt.secret,
    });
  }

  private async getProfile(userId: any) {
    return this.profileRepository.findOne({ user: userId });
  }
}
