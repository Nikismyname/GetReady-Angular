import { User } from "src/app/services/models/other";

export interface IAuthState {
    auth: {
        user: User,
        loginSuccess: boolean,
        registerSuccess: boolean,
    }
}