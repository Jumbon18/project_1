
export class ClientsDTO {
    username: string;
    password: string;
}

export class UserRO {
    id: string;
    username: string;
    created: Date;
    token?: string;
}