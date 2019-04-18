import { IUser } from "src/app/services/models/others/user";
//1
export interface IAuthState {
    auth: {
        user: IUser,
        loginSuccess: boolean,
        registerSuccess: boolean,
    }
} 