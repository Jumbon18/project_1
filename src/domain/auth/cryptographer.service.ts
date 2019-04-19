import { pbkdf2Sync, randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptographerService {

  private getHash(password: string, salt: string): string {
    /** Generate Hash using Password based key derivative function (PBKDF2)*/
    return pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
  }

  public createToken(): string {
    const tmp = randomBytes(32).toString('hex');
    return pbkdf2Sync(tmp, tmp, 2048, 32, 'sha512').toString('hex');
  }

  public hashPassword(password: string) {
    /** Salt is a pseudo-random data buffer contains raw bytes represented in hex*/
    const salt: string = randomBytes(32).toString('hex');
    const hash: string = this.getHash(password, salt);
    /** Return the salt + hash of the password*/
    return { hash, salt };
  }

  public checkPassword(passwordHash: string, salt: string, password: string): boolean {
    const basePassword = this.getHash(password, salt);
    return basePassword === passwordHash;
  }

}