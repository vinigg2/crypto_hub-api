import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwt } from '@src/config/jwt';

@Injectable()
export class CommonAuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: jwt.secret,
        });
        req['user'] = decoded;
        next();
      } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Token inválido' });
      }
    } else {
      res.status(401).json({ message: 'Token não fornecido' });
    }
  }
}
