import { createParamDecorator } from '@nestjs/common';

export const Clients = createParamDecorator((data, req) => {
    return data ? req.client[data] : req.client;
});