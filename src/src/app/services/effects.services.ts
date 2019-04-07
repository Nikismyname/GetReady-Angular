import { Actions, ofType } from "@ngrx/effects";
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

export function createEffect(
    actions: Actions,
    serviceMethod:(paylaod) => Observable<any>,
    actionType: string,
    successActions: any[],
    toastr: ToastrService,
    validationErrorAction: any,
    errorAction: any,
    catchValidationErrors: boolean,
    catchGeneralErrors: boolean,
    useToastr: boolean,
) {
    return actions
        .pipe(
            ofType(actionType),
            tap(x => {
                console.log(actionType + "_ACTION_DETECTED: ", x);
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                console.log(actionType + " REQUEST SENT");
                return serviceMethod(payload).pipe(
                    switchMap(res => {
                        console.log(actionType + "_RESPONSE");
                        let result = [];
                        for (let i = 0; i < successActions.length; i++) {
                            const act = successActions[i];
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
                            if (response.error.errors) {
                                if (!catchValidationErrors) {
                                    return of(new ValidationErrorWasIgnoredAction());
                                }
                                // console.log("LOGING VALIDATION ERROR");
                                return of(new validationErrorAction(response.error.errors));
                            } else {
                                if (!catchGeneralErrors) {
                                    return of(new GeneralErrorWasIgnoredAction());
                                }
                                if (useToastr) {
                                    toastr.error(response.error, "Error");
                                }
                                return of(new errorAction(response.error));
                            }
                        }
                    }),
                )
            }),
        );
}

class ValidationErrorWasIgnoredAction implements Action{
    public type = "[ignore] validation error";
}

class GeneralErrorWasIgnoredAction implements Action{
    public type = "[ignore] general error";
}