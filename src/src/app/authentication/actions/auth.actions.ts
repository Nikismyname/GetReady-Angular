import { Action } from '@ngrx/store';
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
    public type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

class LoginSuccessAction implements Action {
    public type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }

}

class LoginFailAction implements Action {
    public type = AuthActionTypes.LOGIN_FAIL;
    constructor(public payload: null = null) { }
}
/* #endregion */


/* #region  REGISTER */

class RegisterAction implements Action {
    public type = AuthActionTypes.REGISTER;
    constructor(public payload: any) { }

}

class RegisterSuccessAction implements Action {
    public type = AuthActionTypes.REGISTER_SUCCESS;
    constructor(public payload: null = null) { }
}

class RegisterFailAction implements Action {
    public type = AuthActionTypes.REGISTER_FAIL;
    constructor(public payload: null = null) { }
}

/* #endregion */


/* #region  OTHER */

class LogoutAction implements Action {
    public type = AuthActionTypes.LOGOUT;
    constructor(public payload: null = null) { }
}

class ClearAuthState implements Action {
    public type = AuthActionTypes.CLEAR_AUTH_STATE;
    constructor(public payload: null = null) { }
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

