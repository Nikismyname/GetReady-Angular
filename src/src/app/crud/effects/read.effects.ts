import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadActionTypes, ReadActions } from "../actions/read.actions";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from 'src/app/services/question-service'; 
import { ToastrService } from 'ngx-toastr';
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
    loadQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.getQuestionObs,
        actionType: ReadActionTypes.QUESTION,
        successActions: [ReadActions.QuestionsSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.QuestionFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    // @Effect()
    // loadGlobalQuestion$: Observable<any> = this.actions
    //     .pipe(
    //         ofType(ReadActionTypes.QUESTION),
    //         map(action => action["payload"]),
    //         switchMap(payload => {
    //             return this.questionService.getGlobalQuestionObs(payload)
    //                 .pipe(
    //                     map((question) => {
    //                         return new ReadActions.QuestionsSuccess(question);
    //                     }),
    //                     catchError((error) => {
    //                         return of(new ReadActions.QuestionFail(error));
    //                     }),
    //                 )
    //         })
    // );

    @Effect()
    loadQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getQuestionSheetObs,
        actionType: ReadActionTypes.QUESTION_SHEET,
        successActions: [ReadActions.QuestionSheetSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.QuestionSheetFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

}