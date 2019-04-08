import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CudActionTypes, CudActions } from "../actions/cud.actions";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from "src/app/services/question-service";
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect } from 'src/app/services/effects.services';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CudEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    editQuestion$: Observable<any> = this.actions
        .pipe(
            ofType(CudActionTypes.EDIT_QUESTION),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionService.editQuestionObs(payload)
                    .pipe(
                        map(() => {
                            return new CudActions.editQuestionSuccess();
                        }),
                        catchError((error) => {
                            return of(new CudActions.editQuestionFailed(error));
                        }),
                    )
            })
        );

    @Effect()
    editQuestionSheet$: Observable<any> = this.actions
        .pipe(
            ofType(CudActionTypes.EDIT_Q_SHEET),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionSheetService.editQuestionSheetObs(payload)
                    .pipe(
                        map(() => {
                            return new CudActions.editQSheetSuccess();
                        }),
                        catchError((response) => {
                            if(response instanceof HttpErrorResponse){
                                if (response.error.errors) {
                                    return of(new CudActions.validationErrors(response.error.errors));
                                }
                            }
                        }),
                    )
            })
    );
    
    @Effect()//CREATE_Q_SHEET
    createQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.createQuestionSheetObs,
        actionType: CudActionTypes.CREATE_Q_SHEET,
        successActions: [CudActions.createQSheetSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.createQuestionFailed,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()//DELETE_Q_SHEET
    deleteQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.deleteQuestionSheetObs,
        actionType: CudActionTypes.DELETE_Q_SHEET,
        successActions: [CudActions.deleteQSheetSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: CudActions.deleteQSheetFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()//CREATE_QUESTION
    createQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.createQuestionObs,
        actionType: CudActionTypes.CREATE_QUESTION,
        successActions: [CudActions.createQuestionSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.createQuestionFailed,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()//DELETE_QUESTION
    deleteQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.deleteQuestionObs,
        actionType: CudActionTypes.DELETE_QUESTION,
        successActions: [CudActions.deleteQuestionSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: CudActions.deleteQuestionFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });
}
