import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CudActionTypes, CudActions } from "../actions/cud.actions";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from "src/app/services/question-service";

@Injectable()
export class CudEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
    ) { }

    @Effect()
    editQuestion$: Observable<any> = this.actions
        .pipe(
            ofType(CudActionTypes.EDIT_QUESTION),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionService.editQuestionObs(payload["data"], payload["global"])
                    .pipe(
                        map(() => {
                            return new CudActions.editQuestionSuccess();
                        }),
                        catchError((error) => {
                            return of(new CudActions.editQuestionFailedValidation(error));
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
                return this.questionSheetService.editQuestionSheetObs(payload["data"], payload["global"])
                    .pipe(
                        map(() => {
                            return new CudActions.editQSheetSuccess();
                        }),
                        catchError((error) => {
                            return of(new CudActions.editQSheetFailedValidation(error));
                        }),
                    )
            })
    );
    
    @Effect()
     createQuestionSheet$: Observable<any> = this.actions
        .pipe(
            ofType(CudActionTypes.CREATE_Q_SHEET),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionSheetService.createQuestionSheetObs(payload["data"], payload["global"])
                    .pipe(
                        map((qSheetId) => {
                            return new CudActions.createQSheetSuccess(qSheetId);
                        }),
                        catchError((error) => {
                            return of(new CudActions.createQSheetFaildeValidation(error));
                        }),
                    )
            })
        );
}
