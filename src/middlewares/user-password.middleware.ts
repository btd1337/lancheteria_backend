import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { ConfigService } from 'nestjs-config';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UserPasswordMiddleware implements NestMiddleware {
  private saltRounds: number;

  constructor(private readonly config: ConfigService) {
    this.saltRounds = +this.config.get('security.saltRounds');
  }

  use(req: Request, res: Response, next: () => void) {
    const password = req.body.password;

    if (password) {
      bcrypt
        .hash(password, this.saltRounds)
        .then(hash => {
          req.body.password = hash;
          next();
        })
        .catch(next);
    }
  }
}
