import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";
import { UserService } from "../../services/user-service";
import { CudActions } from "../../crud/actions/cud.actions";
import { ToastrService } from 'ngx-toastr';
import { createEffect } from "../../utilities/effects-creators";
//1
@Injectable()//messagesX
export class AuthEffects {

    constructor(
        private actions: Actions,
        private userService: UserService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    login$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.userService.loginObs,
        actionType: AuthActionTypes.LOGIN,
        successActions: [AuthActions.loginSuccess, AuthActions.clear],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: AuthActions.loginFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    },null, "Login failed!");

    @Effect()
    register$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.userService.registerObs,
        actionType: AuthActionTypes.REGISTER,
        successActions: [AuthActions.registerSuccess, AuthActions.clear],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: AuthActions.registerFail,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    },"Successfully registered, please log in!", "Register failed!");

}
