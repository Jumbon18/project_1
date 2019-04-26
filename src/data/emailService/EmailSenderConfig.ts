import {HandlebarsAdapter} from '@nest-modules/mailer';

const transport = {
    service: 'gmail',
    auth: {
        user: 'taraskozub20@gmail.com',
        pass: 'sobachera15'
    }
};
const defaults = {from: '"nest-modules" <modules@nestjs.com>',};
const template = {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
        strict: true,
    },
};

export const config = {
    default: {
        transport,
        defaults,
        template
    }
};