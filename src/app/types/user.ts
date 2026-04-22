export interface User {
    email: string;
    password: string
}

export interface registerUserDetails {
    name: string;
    email: string;
    password: string;
    confirm: string;
    phoneNo: string;
    age: number;
    roles: string[];
}

export interface UserLoginResponse {
    accessToken: string;
    refreshToken: string;
    roles: string[];
}

export interface RefreshToken{
    accessToken: string;
    refreshToken: string;
}