export interface UserState{
    email: string;
    roles: string[];
}

export const intialUserState: UserState = {
    email: '',
    roles: []
}