import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadActionTypes, ReadActions } from "../actions/read.actions";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from 'src/app/services/question-service'; 
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';
import { ToastrService } from 'ngx-toastr';
import { CudActions } from '../actions/cud.actions';
import { createEffect } from 'src/app/services/effects.services';

@Injectable() 
export class ReadEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    loadGlobalQuestion$: Observable<any> = this.actions
        .pipe(
            ofType(ReadActionTypes.GLOBAL_QUESTION),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionService.getGlobalQuestionObs(payload)
                    .pipe(
                        map((question) => {
                            return new ReadActions.QuestionsSuccess(question);
                        }),
                        catchError((error) => {
                            return of(new ReadActions.QuestionFail(error));
                        }),
                    )
            })
    );

    @Effect()
    loadQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getQuestionSheetObs,
        actionType: ReadActionTypes.QUESTION_SHEET,
        successActions: [ReadActions.QuestionSheetSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: ReadActions.QuestionSheetFail,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    // @Effect()
    // loadQuestionShee$: Observable<any> = this.actions
    //     .pipe(
    //         ofType(ReadActionTypes.QUESTION_SHEET),
    //         map(action => action["payload"]),
    //         switchMap(payload => {
    //             return this.questionSheetService.getQuestionSheetObs(payload)
    //                 .pipe(
    //                     map((questionSheet) => {
    //                         return new ReadActions.QuestionSheetSuccess(questionSheet);
    //                     }),
    //                     catchError((error) => {
    //                         return of(new ReadActions.QuestionSheetFail(error));
    //                     }),
    //                 )
    //         })
    // );
}