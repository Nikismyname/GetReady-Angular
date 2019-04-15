import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";
import { UserService } from "../../services/user-service";
import { CudActions } from "../../crud/actions/cud.actions";
import { ToastrService } from 'ngx-toastr';
import { createEffect } from "../../utilities/effects-creators";

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



















    // register$: Observable<any> = this.actions
    //     .pipe(
    //         ofType(AuthActionTypes.REGISTER),
    //         map(action => action["payload"]),
    //         switchMap(payload => this.userService.registerObs(payload)),
    //         switchMap(res => {
    //             console.log("REGISTER RESPONSE");
    //             return [
    //                 new AuthActions.registerSuccess(),
    //                 new AuthActions.clear(),
    //             ]
    //         }),
    //         catchError((response) => {
    //             if (response instanceof HttpErrorResponse) {
    //                 if (response.error.errors) {
    //                     return of(new CudActions.validationErrors(response.error.errors));
    //                 } else {
    //                     console.log("REGISTER ERROR");
    //                     this.toastr.error(response.error, "Error");
    //                 }
    //             }
    //         }),
    //     );

    /*   
        this.actions,
        this.userService.loginObs,
        AuthActionTypes.LOGIN,
        [AuthActions.loginSuccess, AuthActions.clear],
        this.toastr,
        null,
        AuthActions.loginFail,
        false, true, true,
    */

    // @Effect()
    // login$: Observable<any> = this.actions
    //     .pipe(
    //         ofType(AuthActionTypes.LOGIN),
    //         // tap(x => { 
    //         //     console.log("LOGIN_ACTION_DETECTED: ", x );
    //         // }),
    //         map(action => action["payload"]),
    //         switchMap (payload => {
    //             console.log("LOGGIN REQUEST SENT");
    //             return this.userService.loginObs(payload).pipe(
    //                 switchMap (res => {
    //                     // console.log("LOGIN RESPONSE");
    //                     return [
    //                         new AuthActions.loginSuccess(res),
    //                         new AuthActions.clear(),
    //                     ]
    //                 }),
    //                 catchError((response) => {
    //                     if (response instanceof HttpErrorResponse) {
    //                         if (response.error.errors) {
    //                             // console.log("LOGING VALIDATION ERROR");
    //                             return of(new CudActions.validationErrors(response.error.errors));
    //                         } else {
    //                             // console.log("LOGIN ERROR");
    //                             this.toastr.error(response.error, "Error");
    //                             return of(new AuthActions.loginFail());
    //                         }
    //                     }
    //                 }),
    //             )
    //         }),
    // );
