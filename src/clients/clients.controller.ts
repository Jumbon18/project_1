import {Controller, Get, Post} from '@nestjs/common';

@Controller('clients')
export class ClientsController {

    @Post()
    create(): string {
        return 'This action adds a new client';
    }

    @Get()
    findAll(): string {
        return 'This action returns all client';
    }
}
