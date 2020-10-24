export interface UserState {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: number;
    token?: string;
    loginAt?: string;
    role?: string;
}
