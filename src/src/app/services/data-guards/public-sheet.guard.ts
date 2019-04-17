import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from "rxjs/operators";
import { IAppState } from 'src/app/store/reducers';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { GlobalSheetActions } from "../../global/actions/global-sheet.action"; 
import { IQsGlobalIndex } from '../models/question-sheet/qs-global-index';

const shouldConsoleLog = false;

@Injectable({
    providedIn: "root"
})
export class PublicSheetGuard implements CanActivate {
    constructor(
        private store: Store<IAppState>,
    ) { }

    getFromStoreOrAPI(id: number): Observable<any> {
        
        return this.store
            .select(x => x.global.currentGlobalIndex).pipe(
                tap((personalIndex: IQsGlobalIndex) => {
                    if (personalIndex === null) {
                        if (shouldConsoleLog) { console.log("PI_GUARD_FETCHED_NULL");}
                        this.store.dispatch(new GlobalSheetActions.load(Number(id)));
                    } else if (id === -1) {
                        if (shouldConsoleLog) {
                            console.log("PI_GUARD_LOADED_FROM_MEMORY_LAST_ACCESSED_SHEET");
                        }
                    }
                    else // id is not -1 and perInd is not null;
                    {
                        if (personalIndex.id === Number(id)) {
                            if (shouldConsoleLog) { console.log("PI_GUARD_LOADED_FROM_MEMORY");}
                        } else {
                            if (shouldConsoleLog) {console.log("PI_GUARD_FETCHED_NON_MATCHING_IDS");}
                            this.store.dispatch(new GlobalSheetActions.load(id));
                        }
                    }
                }),
                filter((personalIndex: IQsGlobalIndex) => {
                    if (id === -1) {
                        if (personalIndex !== null) {
                            return true;
                        }
                    } else {
                        if (personalIndex && Number(id) === personalIndex.id) {
                            return true; 
                        }
                    }
                    return false;
                }),
                take(1)
            )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = Number(next.paramMap.get("id"))
        return this.getFromStoreOrAPI(id).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false)),
        );
    }
}