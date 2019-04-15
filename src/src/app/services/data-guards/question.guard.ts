import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take, map } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ReadActions } from "../../crud/actions/read.actions";
import { IPersonalQuestion } from '../models/question/personal-question';
import { IGlobalQuestion } from '../models/question/global-question';

const shouldConsoleLog = true;

@Injectable({
    providedIn: "root"
})
export class QuestionGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    getFromStoreOrAPI(id: string, isGlobal: boolean): Observable<any> {
        return this.store
        .select(x => x.crud.read.question).pipe(
            tap((questionObj: any) => {
                let question = <IPersonalQuestion | IGlobalQuestion>questionObj.question
                console.log("::TAP::", question);
                if (question === null) {
                    if (shouldConsoleLog) {
                        console.log("Q_GUARD_FETCHED_NULL");
                    }
                    this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
                }
                else {
                    if (Number(id) === question.id && this.isPersonal(question) === !isGlobal) {
                        console.log("QUESTION ALREADY THERE");
                    } else {
                        if (shouldConsoleLog) {
                            console.log("Q_GUARD_FETCHED_WRONG_ID");
                        }
                        this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
                    }
                }
                console.log(isGlobal, !this.isPersonal(question));
            }),
            filter((questionObj: any) => {
                let question = <IPersonalQuestion | IGlobalQuestion>questionObj.question
                if (question && Number(id) === question.id && this.isPersonal(question) === !isGlobal) {
                    console.log("::FILTER::true");
                    return true;
                }
                console.log("::FILTER::false");
                return false;
            }),
            take(1)
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = next.paramMap.get("id");
        let isGlobal = next.paramMap.get("scope") == "global" ? true : false;
        return this.getFromStoreOrAPI(id, isGlobal).pipe(
            tap(x => console.log("getFromStoreOrApi", x)),
            switchMap((x) => {
                console.log("CAN_ACTIVATE_TRUE", x);
                return of(true);
            }),
            catchError((x) => {
                console.log("CAN_ACTIVATE_FALSE", x);
                return of(false);
            }),
        );
    }

    isPersonal(question: IPersonalQuestion | IGlobalQuestion): question is IPersonalQuestion {
        if (question === null) {
            return false;
        }
        return typeof (<IPersonalQuestion>question).timesBeingAnswered !== "undefined";
    }
}