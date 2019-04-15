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

    getFromStoreOrAPI(id: string): Observable<any> {

        // return this.store
        // .pipe(
        //     select(x=> x.global.currentGlobalIndex),
        //     tap((x) => {
        //         console.log("::T::A::P::",x);
        //         this.store.dispatch(new GlobalSheetActions.load(Number(id)))
        //     }),
        //     filter(x => false),
        //     take(1)
        // )
        
        return this.store
            .select(x => x.global.currentGlobalIndex).pipe(
                tap((personalIndex: IQsGlobalIndex) => {
                    if (personalIndex === null) {
                        if (shouldConsoleLog) {
                            console.log("PI_GUARD_FETCHED_NULL");
                        }
                        this.store.dispatch(new GlobalSheetActions.load(Number(id)));
                    } else if (id === "-1") {
                        if (shouldConsoleLog) {
                            console.log("PI_GUARD_LOADED_FROM_MEMORY_LAST_ACCESSED_SHEET");
                        }
                    }
                    else // id is not -1 and perInd is not null;
                    {
                        if (personalIndex.id === Number(id)) {
                            if (shouldConsoleLog) {
                                console.log("PI_GUARD_LOADED_FROM_MEMORY");
                            }
                        } else {
                            if (shouldConsoleLog) {
                                console.log("PI_GUARD_FETCHED_NON_MATCHING_IDS");
                            }
                            this.store.dispatch(new GlobalSheetActions.load(Number(id)));
                        }
                    }
                }),
                filter((personalIndex: IQsGlobalIndex) => {
                    if (id === "-1") {
                        if (personalIndex !== null) {
                            //console.log("FILTER: ID -1 Ind NON NULL");
                            return true;
                        }
                    } else {
                        if (personalIndex && Number(id) === personalIndex.id) {
                            //console.log("FILTER: IDS MATCH");
                            return true; 
                        }
                    }
                    return false;
                }),
                take(1)
            )
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let id = next.paramMap.get("id")
        return this.getFromStoreOrAPI(id).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false)),
        );
    }
}