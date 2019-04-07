import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthActionTypes, AuthActions } from "../actions/auth.actions";
import { map, switchMap, catchError, tap, concatMap } from "rxjs/operators";
import { UserService } from "../../services/user-service";
import { HttpErrorResponse } from '@angular/common/http';
import { CudActions } from "../../crud/actions/cud.actions";
import { ToastrService } from 'ngx-toastr';
import { createEffect } from "../../services/effects.services"; 

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private userService: UserService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    login$: Observable<any> = createEffect(
        this.actions,
        this.userService.loginObs,
        AuthActionTypes.LOGIN,
        [AuthActions.loginSuccess, AuthActions.clear],
        this.toastr,
        null,
        AuthActions.loginFail,
        false, true, true,
    );

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

    register$: Observable<any> = this.actions
    .pipe(
        ofType(AuthActionTypes.REGISTER),
        map(action => action["payload"]),
        switchMap(payload => this.userService.registerObs(payload)),
        switchMap(res => {
            console.log("REGISTER RESPONSE");
            return [
                new AuthActions.registerSuccess(),
                new AuthActions.clear(),
            ]
        }),
        catchError((response) => {
            if (response instanceof HttpErrorResponse) {
                if (response.error.errors) {
                    return of(new CudActions.validationErrors(response.error.errors));
                } else {
                    console.log("REGISTER ERROR");
                    this.toastr.error(response.error, "Error");
                }
            }
        }),
    );
}
