import {pbkdf2Sync, randomBytes} from 'crypto';

export class CryptoUtils {
    private static getHash(password: string, salt: string): string {
        /** Generate Hash using Password based key derivative function (PBKDF2)*/
        return pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
    }

    public static createToken(): string {
        const tmp = randomBytes(32).toString('hex');
        return pbkdf2Sync(tmp, tmp, 2048, 32, 'sha512').toString('hex');
    }

    public static hashPassword(password: string) {
        /** Salt is a pseudo-random data buffer contains raw bytes represented in hex*/
        const salt: string = randomBytes(32).toString('hex');
        const passwordHash: string = CryptoUtils.getHash(password, salt);
        /** Return the salt + passwordHash of the password*/
        return {passwordHash, salt};
    }

    public static checkPassword(passwordHash: string, salt: string, password: string): boolean {
        const basePassword = CryptoUtils.getHash(password, salt);
        return basePassword === passwordHash;
    }
}
