// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable, of, throwError } from 'rxjs';
// import { switchMap, catchError, tap, filter, take } from "rxjs/operators";
// import { IAppState } from 'src/app/store/reducers';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// import { ReadActions } from "../../crud/actions/read.actions";
// import { IPersonalQuestion } from '../models/question/personal-question';
// import { IGlobalQuestion } from '../models/question/global-question';

// const shouldConsoleLog = true;

// @Injectable({
//     providedIn: "root"
// })
// export class QuestionGuard implements CanActivate {
//     constructor(
//         private store: Store<IAppState>,
//     ) { }

//     getFromStoreOrAPI(id: number, isGlobal: boolean): Observable<any> {
//         let counter = 0;
//         return this.store
//             .select(x => x.crud.read.question).pipe(
//                 tap((questionObj: any) => {
//                     counter++;
//                     let question = <IPersonalQuestion | IGlobalQuestion>questionObj.question
//                     if (shouldConsoleLog) { console.log("::TAP::", question) };
//                     if (question === null) {
//                         if (shouldConsoleLog) { console.log("Q_GUARD_FETCHED_NULL"); }
//                         this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
//                     }
//                     else {
//                         if (shouldConsoleLog) { console.log("Question Not Null"); }
//                         if (Number(id) === question.id && this.isPersonal(question) === !isGlobal) {
//                             if (shouldConsoleLog) { console.log("QUESTION ALREADY THERE"); }
//                         } else {
//                             if (shouldConsoleLog) { console.log("Q_GUARD_FETCHED_WRONG_ID"); }
//                             this.store.dispatch(new ReadActions.Question({ global: isGlobal, data: id }));
//                         }
//                     }
//                     if (shouldConsoleLog) { console.log("GLOBAL_SITUATION", isGlobal, !this.isPersonal(question)); }
//                 }),
//                 filter((questionObj: any) => {
//                     if (shouldConsoleLog) { console.log("COUTER::", counter); }
//                     if (counter >= 5) {
//                         return true;
//                     };

//                     let question = <IPersonalQuestion | IGlobalQuestion>questionObj.question
//                     if (question && Number(id) === question.id && this.isPersonal(question) === !isGlobal) {
//                         if (shouldConsoleLog) { console.log("::FILTER::true"); }
//                         return true;
//                     }
//                     if (shouldConsoleLog) { console.log("::FILTER::false"); }
//                     return false;
//                 }),
//                 switchMap(x => {
//                     if (counter >= 5) {
//                         return throwError("Too many attemts (five to be exact)!");
//                     } else {
//                         return of(x);
//                     }
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

//     isPersonal(question: IPersonalQuestion | IGlobalQuestion): question is IPersonalQuestion {
//         if (question === null) {
//             return false;
//         }

//         let isPersonal = typeof (<IPersonalQuestion>question).timesBeingAnswered !== "undefined";
//         if (shouldConsoleLog) {
//             console.log(
//                 "::HERE::BE::IsPersonal",
//                 (<IPersonalQuestion>question).timesBeingAnswered,
//                 typeof (<IPersonalQuestion>question).timesBeingAnswered,
//                 isPersonal);
//         };
//         return isPersonal;
//     }
// }