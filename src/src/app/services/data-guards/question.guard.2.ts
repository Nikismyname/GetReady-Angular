import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, tap, filter, take, map, mergeMap } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ReadActions } from "../../crud/actions/read.actions";

const shouldConsoleLog = true;

@Injectable({
    providedIn: "root"
})
export class QuestionGuard2 implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    getFromStoreOrAPI(id: string, isGlobal: boolean): Observable<any> {
        let counter = 0;
        return this.store
            .select(x => x.crud.read.question).pipe(
                tap((questionObj: any) => {
                    if (questionObj.success === false) {
                        this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
                    }
                }),
                filter((questionObj: any) => {
                    if (questionObj.success) { return true; }
                    return false;
                }),
                take(1)
            )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = next.paramMap.get("id");
        let isGlobal = next.paramMap.get("scope") == "global" ? true : false;
        return this.getFromStoreOrAPI(id, isGlobal).pipe(
            switchMap((x) => {
                return of(true);
            }),
            catchError((x) => {
                return of(false);
            }),
        );
    }
}