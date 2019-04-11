import {
    Controller,
    Get,
    Post,
    Body,
    Param,
} from '@nestjs/common';

import { ClientsDTO } from './clients.dto';
import { ClientsService } from "./clients.service";
import { Clients } from "./clients.decorator";

@Controller()
export class ClientsController {
    constructor(private ClientsService: ClientsService) {}



    @Get('api/clients')
    showAllUsers() {
        return this.ClientsService.showAll();
    }

    @Get('api/clients/:username')
    showOneUser(@Param('username') username: string) {
        return this.ClientsService.read(username);
    }

    @Get('auth/whoami')
    showMe(@Clients('username') username: string) {
        return this.ClientsService.read(username);
    }

    @Post('auth/login')
    login(@Body() data: ClientsDTO) {
        return this.ClientsService.login(data);
    }

    @Post('auth/register')
    register(@Body() data: ClientsDTO) {
        return this.ClientsService.register(data);
    }
}