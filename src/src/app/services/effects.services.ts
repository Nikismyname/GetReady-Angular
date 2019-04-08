import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

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

export function createEffect(d: CreateEffectInput) {
    return d.actions
        .pipe(
            ofType(d.actionType),
            tap(x => {
                console.log(d.actionType + "_ACTION_DETECTED: ", x);
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                console.log(d.actionType + " REQUEST SENT");
                return d.serviceMethod(payload).pipe(
                    switchMap(res => {
                        console.log(d.actionType + "_RESPONSE");
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
                    catchError((response) => {
                        if (response instanceof HttpErrorResponse) {
                            if (response.error && response.error.errors) {
                                if (!d.catchValidationErrors) {
                                    return of(new ValidationErrorWasIgnoredAction(response));
                                }
                                console.log("LOGING VALIDATION ERROR");
                                return of(new d.validationErrorAction(response.error.errors));
                            } else {
                                if (!d.catchGeneralErrors) {
                                    return of(new GeneralErrorWasIgnoredAction(response));
                                }
                                if (d.useToastrForGErr) {
                                    d.toastr.error(response.error, "Error");
                                }
                                return of(new d.errorAction(response.error));
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