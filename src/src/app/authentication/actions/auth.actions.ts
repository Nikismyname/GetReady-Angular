import { Action } from '@ngrx/store';

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
    public payload: any;

    constructor(
        public loginData: any,
    ) {
        console.log("LOGIN_ACTION_CONSTRUCTOR");
        this.payload = loginData;
    }
}

class LoginSuccessAction implements Action {
    public type = AuthActionTypes.LOGIN_SUCCESS;
    public payload: any;

    constructor(
        public userData: any,
    ) {
        this.payload = userData;
    }
}

class LoginFailAction implements Action {
    public type = AuthActionTypes.LOGIN_FAIL;
}
/* #endregion */


/* #region  REGISTER */

class RegisterAction implements Action {
    public type = AuthActionTypes.REGISTER;
    public payload: any;

    constructor(
        public registerData: any,
    ) {
        this.payload = registerData;
    }
}

class RegisterSuccessAction implements Action {
    public type = AuthActionTypes.REGISTER_SUCCESS;
}

class RegisterFailAction implements Action {
    public type = AuthActionTypes.REGISTER_FAIL;
}

/* #endregion */


/* #region  OTHER */

class LogoutAction implements Action { 
    public type = AuthActionTypes.LOGOUT;
}

class ClearAuthState implements Action { 
    public type = AuthActionTypes.CLEAR_AUTH_STATE;
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

