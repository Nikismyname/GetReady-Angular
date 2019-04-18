import { Action } from '@ngrx/store';
import { ILoginData } from 'src/app/services/models/others/login-data';
import { ILoginResponse } from 'src/app/services/models/others/login-response';
import { IRegisterData } from 'src/app/services/models/others/register-data';
//1
export namespace AuthActionTypes {
    export const LOGIN = "[auth] login";
    export const LOGIN_SUCCESS = "[auth] login success";
    export const LOGIN_FAIL = "[auth] login fail";

    export const REGISTER = "[auth] register";
    export const REGISTER_SUCCESS = "[auth] register success";
    export const REGISTER_FAIL = "[auth] register fail";

    export const LOGOUT = "[auth] logout";

    export const CLEAR_AUTH_STATE = "[auth] clear";
}

/* #region  LOGIN */
class LoginAction implements Action {
    public readonly type = AuthActionTypes.LOGIN;
    constructor(public readonly payload: ILoginData) { }
}

class LoginSuccessAction implements Action {
    public readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public readonly payload: ILoginResponse) { }
}

class LoginFailAction implements Action {
    public readonly type = AuthActionTypes.LOGIN_FAIL;
    constructor(/** error any */public readonly payload: any) { }
}
/* #endregion */


/* #region  REGISTER */

class RegisterAction implements Action {
    public readonly type = AuthActionTypes.REGISTER;
    constructor(public readonly payload: IRegisterData) { }
}

class RegisterSuccessAction implements Action {
    public readonly type = AuthActionTypes.REGISTER_SUCCESS;
    constructor(public readonly payload: null = null) { }
}

class RegisterFailAction implements Action {
    public readonly type = AuthActionTypes.REGISTER_FAIL;
    constructor(/**error any*/public readonly payload: any) { }
}

/* #endregion */


/* #region  OTHER */

class LogoutAction implements Action {
    public readonly type = AuthActionTypes.LOGOUT;
    constructor(public readonly payload: null = null) { }
}

class ClearAuthState implements Action {
    public readonly type = AuthActionTypes.CLEAR_AUTH_STATE;
    constructor(public readonly payload: null = null) { }
}

/* #endregion */

export namespace AuthActions {
    export const login = LoginAction;
    export const loginSuccess = LoginSuccessAction;
    export const loginFail = LoginFailAction;

    export const register = RegisterAction;
    export const registerSuccess = RegisterSuccessAction;
    export const registerFail = RegisterFailAction;

    export const logout = LogoutAction;
    export const clear = ClearAuthState;
};

export type AuthActionType 
    = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | RegisterAction
    | RegisterSuccessAction
    | RegisterFailAction
    | LogoutAction
    | ClearAuthState
    

