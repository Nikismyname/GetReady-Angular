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
export class AllFoldersGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    fetchStream() {
        return this.store.select(x => x.crud.read.allFolders).pipe(
            filter(x => x.success), 
            switchMap(x => {
                if (shouldConsoleLog) { console.log("ALL_FOLDERS_GUARD_PASSED"); }
                return of(true);
            }),
            take(1),
        )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (shouldConsoleLog) {console.log("question guard 2 activated"); }
        let isGlobal = next.data["folders"] as boolean
        this.store.dispatch(new ReadActions.GetAllFolders(isGlobal));
        return this.fetchStream().pipe(
            timeout(1000),
            catchError(x => { 
                if (shouldConsoleLog) { console.log("timed ::out::", x); }
                return of(false);
            })
        );
    }
}