import { IUser } from "src/app/services/models/other";

export interface IAuthState {
    auth: {
        user: IUser,
        loginSuccess: boolean,
        registerSuccess: boolean,
    }
} 