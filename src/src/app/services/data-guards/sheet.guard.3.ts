import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, filter, take, timeout } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ReadActions } from "../../crud/actions/read.actions";

const shouldConsoleLog = true;

@Injectable({
    providedIn: "root"
})
export class SheetGuard3 implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

  
    fetchStream() {
        return this.store.select(x => x.crud.read.questionSheet).pipe(
            filter(x => x.success), 
            switchMap(x => {
                if (shouldConsoleLog) { console.log("SHEET GUARD PASSED"); }
                return of(true);
            }),
            take(1),
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = Number(next.paramMap.get("id"));
        let isGlobal = next.paramMap.get("scope") == "global" ? true : false;
        
        this.store.dispatch(new ReadActions.QuestionSheet({ global: isGlobal, data: id }));
        return this.fetchStream().pipe(
            timeout(1000),
            catchError(x => { 
                if (shouldConsoleLog) { console.log("timed ::out::", x); }
                return of(false);
            })
        );
    }
}