import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, filter, take, timeout } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { PersonalSheetActions } from 'src/app/personal/actions/personal-sheet.actions';

const shouldConsoleLog = false;

@Injectable({
    providedIn: "root"
})
export class ReviewQuestionsGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    fetchStream() {
        return this.store.select(x => x.personal.questionReview).pipe(
            filter(x => x.success), 
            switchMap(x => {
                if (shouldConsoleLog) { console.log("ALL_ITEMS_GUARD_PASSED"); }
                return of(true);
            }),
            take(1),
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (shouldConsoleLog) {console.log("question guard 2 activated"); }

        this.store.dispatch(new PersonalSheetActions.getAnsweredQuestions());

        return this.fetchStream().pipe(
            timeout(1000),
            catchError(x => { 
                if (shouldConsoleLog) { console.log("timed ::out::", x); }
                return of(false);
            })
        );
    }
}