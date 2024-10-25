import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

  isValidPassword(password: string, user: { password: string }): boolean {
    return bcrypt.compareSync(password, user.password);
  }

  createHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}
