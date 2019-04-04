import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadActionTypes, ReadActions } from "../actions/read.actions";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from 'src/app/services/question-service'; 

@Injectable() 
export class ReadEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
    ) { }

    @Effect()
    loadGlobalSheet$: Observable<any> = this.actions
        .pipe(
            ofType(ReadActionTypes.GLOBAL_QUESTION),
            tap(x => { 
                console.log("HEEEERE");
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionService.getGlobalQuestionObs(payload)
                    .pipe(
                        map((question) => {
                            return new ReadActions.GlobalQuestionsSuccess(question);
                        }),
                        catchError((error) => {
                            return of(new ReadActions.GlobalQuestionFail(error));
                        }),
                    )
            })
        );
}