export interface User {
    name: string;
    email: string;
    password: string;
    phone?: number;
    token?: string;
    loginAt?: string;
}
