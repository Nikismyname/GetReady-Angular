import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ReadActions } from "../../crud/actions/read.actions";
import { IQuestionSheet } from '../models/question-sheet/question-sheet';

const shouldConsoleLog = true;

@Injectable({
    providedIn: "root"
})
export class SheetGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    getFromStoreOrAPI(id: string, isGlobal: boolean): Observable<any> {
        let counter = 0;
        return this.store
            .select(x => x.crud.read.questionSheet).pipe(
                tap((sheetObj: any) => {
                    counter++;
                    let sheet = <IQuestionSheet>sheetObj.qSheet;
                    if (shouldConsoleLog) { console.log("::TAP::", sheet) };
                    if (sheet === null) {
                        if (shouldConsoleLog) { console.log("S_GUARD_FETCHED_NULL"); }
                        this.store.dispatch(new ReadActions.QuestionSheet({ global: isGlobal, data: id }));
                    }
                    else {
                        if (shouldConsoleLog) { console.log("Sheet Not Null"); }
                        if (Number(id) === sheet.id) {
                            if (shouldConsoleLog) { console.log("SHEET ALREADY THERE"); }
                        } else {
                            if (shouldConsoleLog) { console.log("S_GUARD_FETCHED_WRONG_ID"); }
                            this.store.dispatch(new ReadActions.QuestionSheet({ global: isGlobal, data: id }));
                        }
                    }
                }),
                filter((sheetObj: any) => {
                    if (shouldConsoleLog) { console.log("COUTER::", counter); }
                    if (counter >= 5) {
                        return true;
                    };

                    let sheet = <IQuestionSheet>sheetObj.qSheet;
                    if (sheet && Number(id) === sheet.id) {
                        if (shouldConsoleLog) { console.log("::FILTER::true"); }
                        return true;
                    }
                    if (shouldConsoleLog) { console.log("::FILTER::false"); }
                    return false;
                }),
                switchMap(x => {
                    if (counter >= 5) {
                        return throwError("Too many attemts (five to be exact)!");
                    } else {
                        return of(x);
                    }
                }),
                take(1)
            )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = next.paramMap.get("id");
        let isGlobal = next.paramMap.get("scope") == "global" ? true : false;
        return this.getFromStoreOrAPI(id, isGlobal).pipe(
            switchMap((x) => {
                if (shouldConsoleLog) { console.log("CAN_ACTIVATE_TRUE", x); }
                return of(true);
            }),
            catchError((x) => {
                if (shouldConsoleLog) { console.log("CAN_ACTIVATE_FALSE", x); }
                return of(false);
            }),
        );
    }
}