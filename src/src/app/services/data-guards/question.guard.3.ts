import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, filter, take, timeout } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ReadActions } from "../../crud/actions/read.actions";

const shouldConsoleLog = false;

@Injectable({
    providedIn: "root"
})
export class QuestionGuard3 implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    fetchStream() {
        return this.store.select(x => x.crud.read.question).pipe(
            filter(x => x.success), 
            switchMap(x => {
                console.log("QUESTION GUARD PASSED");
                return of(true);
            }),
            take(1),
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (shouldConsoleLog) {console.log("question guard 2 activated"); }
        let id = Number(next.paramMap.get("id"));
        let pathScope = next.paramMap.get("scope"); 
        let isGlobal: boolean;
        if (pathScope) {
            isGlobal = pathScope === "global"; 
        } else {
            isGlobal = next.data["isGlobal"];
        }
        this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
        return this.fetchStream().pipe(
            timeout(1000),
            catchError(x => { 
                console.log("timed ::out::", x);
                return of(false);
            })
        );
    }
}