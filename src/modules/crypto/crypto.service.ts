import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
