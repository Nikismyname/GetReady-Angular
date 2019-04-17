// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { switchMap, catchError, tap, filter, take } from "rxjs/operators";
// import { IAppState } from 'src/app/store/reducers';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// import { ReadActions } from "../../crud/actions/read.actions";

// const shouldConsoleLog = false;

// @Injectable({
//     providedIn: "root"
// })
// export class SheetGuard2 implements CanActivate {
//     constructor(
//         private store: Store<IAppState>,
//     ) { }

//     getFromStoreOrAPI(id: number, isGlobal: boolean): Observable<any> {
//         return this.store
//             .select(x => x.crud.read.questionSheet).pipe(
//                 tap((sheetObj: any) => {
//                     if (sheetObj.success === false) {
//                         this.store.dispatch(new ReadActions.QuestionSheet({ global: isGlobal, data: id }));
//                     }
//                 }),
//                 filter((sheetObj: any) => {
//                     if (sheetObj.success === true) {
//                         return true;
//                     }
//                     return false;
//                 }),
//                 take(1)
//             )
//     }

//     canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//         let id = Number(next.paramMap.get("id"));
//         let isGlobal = next.paramMap.get("scope") == "global" ? true : false;
//         return this.getFromStoreOrAPI(id, isGlobal).pipe(
//             switchMap((x) => {
//                 if (shouldConsoleLog) { console.log("CAN_ACTIVATE_TRUE", x); }
//                 return of(true);
//             }),
//             catchError((x) => {
//                 if (shouldConsoleLog) { console.log("CAN_ACTIVATE_FALSE", x); }
//                 return of(false);
//             }),
//         );
//     }
// }