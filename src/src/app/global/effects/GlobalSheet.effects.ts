import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalSheetActionTypes, GlobalSheetActions } from "../actions/global-sheet.action";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { createEffect } from "../../services/effects.services";
import { QuestionService } from 'src/app/services/question-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlablEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    loadGlobalSheet$: Observable<any> = this.actions
        .pipe(
            ofType(GlobalSheetActionTypes.LOAD),
            tap(x => {
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionSheetService.getGlobalIndexObs(payload)
                    .pipe(
                        map((sheet) => {
                            return new GlobalSheetActions.loadSuccess(sheet);
                        }),
                        catchError((error) => {
                            return of(new GlobalSheetActions.loadFail(error));
                        }),
                    )
            })
    );
    
    @Effect()
    reorderQuestions$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.reorderGlobalObs,
        actionType: GlobalSheetActionTypes.QUESTIONS_REORDER,
        successActions: [GlobalSheetActions.globalQuestionReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: GlobalSheetActions.globalQuestionReorderFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });
}