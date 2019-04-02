import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { GlobalSheetActionTypes, GlobalSheetActions } from "../actions/global-sheet.action";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';

@Injectable()
export class GlablEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
    ) { }

    @Effect()
    loadGlobalSheet$: Observable<any> = this.actions
        .pipe(
            ofType(GlobalSheetActionTypes.LOAD),
            tap(x => {
                console.log("first pipe");
                console.log(x);
            }),
            map(action => action["payload"]),
            switchMap(payload => {
                return this.questionSheetService.getGlobalIndexObs(payload)
                    .pipe(
                        // tap(x => {
                        //     console.log("second pipe here");
                        //     console.log(x);
                        // }),
                        map((sheet) => {
                            console.log(sheet);
                            return new GlobalSheetActions.Loaded(sheet.json());
                        }),
                        catchError((error) => {
                            return of(new GlobalSheetActions.Failed(error));
                        }),
                    )
            })
        );
}