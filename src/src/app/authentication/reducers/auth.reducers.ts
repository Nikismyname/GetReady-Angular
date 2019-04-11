import { Action } from "@ngrx/store";
import { AuthActionTypes } from "../actions/auth.actions";
import { IUser } from 'src/app/services/models/other';

export function authReducer(
    state: IReducerState = Object.assign({}, initialAuthState),
    action: Action,
) {
    switch (action.type) {
        //EDIT
        case AuthActionTypes.LOGIN_SUCCESS:
            let user = action["payload"];
            let token = user["token"];
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            let lgState = Object.assign({}, state);
            lgState.user = user; 
            lgState.loginSuccess = true;
            return lgState;
        case AuthActionTypes.REGISTER_SUCCESS:
            let rState = Object.assign({}, state);
            rState.registerSuccess = true;
            return rState;
        case AuthActionTypes.LOGOUT:
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            let loState = Object.assign({}, state);
            loState.user = null;
            return loState;
        case AuthActionTypes.CLEAR_AUTH_STATE:
            let clearState = Object.assign({}, state);
            clearState.loginSuccess = false;
            clearState.registerSuccess = false;
            return clearState;
        default:
            return state;
    }
}

interface IReducerState {
    user: IUser,
    loginSuccess: boolean,
    registerSuccess: boolean,
}

const initialAuthState: IReducerState = {
    user: null,
    loginSuccess: false, 
    registerSuccess: false,
}