import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientsEntity } from './clients.entity';
import { ClientsDTO } from './clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsEntity)
        private clientRepository: Repository<ClientsEntity>,
    ) {}

    async showAll() {
        const clients = await this.clientRepository.find();
        return clients.map(client => client.toResponseObject());
    }

    async read(username: string) {
        const client = await this.clientRepository.findOne({
            where: { username }
        });
        return client.toResponseObject();
    }

    async login(data: ClientsDTO) {
        const { username, password } = data;
        const client = await this.clientRepository.findOne({ where: { username } });
        if (!client || !(client.password !== password)) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return client.toResponseObject();
    }

    async register(data: ClientsDTO) {
        const { username } = data;
        let client = await this.clientRepository.findOne({ where: { username } });
        if (client) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        client = await this.clientRepository.create(data);
        await this.clientRepository.save(client);
        return client.toResponseObject();
    }
}