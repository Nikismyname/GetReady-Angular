import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, filter, take, timeout } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { PersonalSheetActions } from 'src/app/personal/actions/personal-sheet.actions';

const shouldConsoleLog = true;

@Injectable({
    providedIn: "root"
})
export class QuestionIdsForSheetGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    fetchStream() {
        return this.store.select(x => x.personal.test.qIdsForSheet).pipe(
            filter(x => x.success), 
            switchMap(x => {
                console.log("IDS_FOR_SHEET_GUARD_PASSED");
                return of(true);
            }),
            take(1),
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (shouldConsoleLog) {console.log("idsForSheetGUARD_ACTIVATED"); }
        let id = Number(next.paramMap.get("id"));
        let mode = next.paramMap.get("mode"); 
        let isSingle = mode === "single";     
        if (isSingle) { if (shouldConsoleLog) {console.log("GUARD_PASSED_SINGLE"); } return of(true) }
        
        this.store.dispatch(new PersonalSheetActions.getQIdsForSheet(id));
        
        return this.fetchStream().pipe(
            timeout(1000),
            catchError(x => { 
                console.log("timed ::out::", x);
                return of(false);
            })
        );
    }
}