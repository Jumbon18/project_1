import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmFactory implements TypeOrmOptionsFactory {
    constructor() {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
        };
    }
}
