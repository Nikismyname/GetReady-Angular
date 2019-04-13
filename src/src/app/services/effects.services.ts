import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

const shouldConsoleLog = true;

class CreateEffectInput {
    constructor(
        public actions: Actions,
        public serviceMethod: (paylaod) => Observable<any>,
        public actionType: string,
        public successActions: any[],
        public toastr: ToastrService,
        public validationErrorAction: any,
        public errorAction: any,
        public catchValidationErrors: boolean,
        public catchGeneralErrors: boolean,
        public useToastrForGErr: boolean,
    ) { }
}

// actions: "",
// serviceMethod: "",
// actionType: "",
// successActions: "",
// toastr: "",
// validationErrorAction: "",
// errorAction: "",
// catchValidationErrors: "",
// catchGeneralErrors: "",
// useToastrForGErr: "",

// @Effect()
// login$: Observable<any> = createEffect({
//     actions: this.actions,
//     serviceMethod: this.userService.loginObs,
//     actionType: AuthActionTypes.LOGIN,
//     successActions: [AuthActions.loginSuccess, AuthActions.clear],
//     toastr: this.toastr,
//     validationErrorAction: null,
//     errorAction: AuthActions.loginFail,
//     catchValidationErrors: false,
//     catchGeneralErrors: true,
//     useToastrForGErr: true,
// });

export function createEffect(
    d: CreateEffectInput,
    successMessage: string = null,
    failedMessage: string = null,
) {
    return d.actions
        .pipe(
            ofType(d.actionType),
            tap(x => {
                if (shouldConsoleLog) {
                    console.log("__ACTION_DETECTED: " + d.actionType);
                }
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                if (shouldConsoleLog) {
                    console.log("__REQUEST SENT: " + d.actionType);
                }
                return d.serviceMethod(payload).pipe(
                    switchMap(res => { //SUCCESS
                        if (successMessage) {
                            d.toastr.success(successMessage, "Success");
                        }
                        if (shouldConsoleLog) {
                            console.log("__RESPONSE RECIEVED: " + d.actionType);
                        }
                        let result = [];
                        for (let i = 0; i < d.successActions.length; i++) {
                            const act = d.successActions[i];
                            if (i === 0) {
                                result.push(new act(res));
                            } else {
                                result.push(new act());
                            }
                        }
                        return result;
                    }),
                    catchError((response) => {//ERROR
                        if (response instanceof HttpErrorResponse) {
                            if (failedMessage) {
                                d.toastr.error(failedMessage, "Error");
                            }
                            if (response.error && response.error.errors) {
                                if (!d.catchValidationErrors) {
                                    return of(new ValidationErrorWasIgnoredAction(response));
                                }
                                if (shouldConsoleLog) {
                                    console.log("__GOT VALIDATION ERROR");
                                }
                                return of(new d.validationErrorAction(response.error.errors));
                            } else {
                                if (!d.catchGeneralErrors) {
                                    return of(new GeneralErrorWasIgnoredAction(response));
                                }
                                if (d.useToastrForGErr) {
                                    d.toastr.error(response.error, "Error");
                                }
                                if (shouldConsoleLog) {
                                    console.log("__GOT GENERAL VALIDATION ERROR");
                                } return of(new d.errorAction(response.error));
                            }
                        }
                    }),
                )
            }),
        );
}

class ValidationErrorWasIgnoredAction implements Action {
    public type = "[ignore] validation error";
    public payload: any;
    constructor(data: any) {
        this.payload = data;
    }
}

class GeneralErrorWasIgnoredAction implements Action {
    public type = "[ignore] general error";
    public payload: any;
    constructor(data: any) {
        this.payload = data;
    }
}