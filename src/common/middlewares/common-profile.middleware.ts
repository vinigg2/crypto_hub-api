import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProfileIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Verifique se a rota requer o profileId (adicione suas condições aqui)
    const requiresProfileId = req.url.includes('/sua-rota-requerida');

    if (requiresProfileId && !req.body.profileId) {
      return res
        .status(400)
        .json({ message: 'profileId é obrigatório para esta rota.' });
    }

    next();
  }
}
