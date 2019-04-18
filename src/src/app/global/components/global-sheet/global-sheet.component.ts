import { Component } from "@angular/core";
import { IQsGlobalIndex } from "src/app/services/models/question-sheet/qs-global-index";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { GlobalSheetActions } from "../../actions/global-sheet.action";

import { ReorderService } from 'src/app/services/reorder-service';
import * as c from "../../../services/route-paths";
import { IAppState } from 'src/app/store/reducers';
import { IUserStatus } from "src/app/services/models/others/user-status";
import { take } from 'rxjs/operators';
 //typed
@Component({
    selector: "getready-global-sheet",
    templateUrl: "./global-sheet.component.html",
})
export class GlobalSheetComponent {

    questionSheet$: Observable<IQsGlobalIndex>;
    private userSub: Subscription;
    currentSheetId: number = 3;
    loaded: boolean = false;
    isAdmin: boolean = false;
    isUser: boolean = false;

    constructor(
        private store: Store<IAppState>,
        public reorderService: ReorderService,
        private router: Router,
        public routePaths: c.RoutePaths,
    ) {
        this.questionSheet$ = store.select(state => state.global.currentGlobalIndex);

        this.userSub = this.store.select(x => x.auth.user).subscribe(user => {
            this.isUser = user ? true : false;
            this.isAdmin = user ? user.role === "Admin" ? true : false : false;
        });

        store.select(state => state.global.currentGlobalIndex.id).pipe(take(1)).subscribe(x => {
            let newPath = c.globalQuestionSheetsPath + "/" + x;
            window.history.pushState(null, null, newPath);
        });
    }

    get user() {
        let data: IUserStatus = { isAdmin: this.isAdmin, isUser: this.isUser }
        return data;
    }

    async fetchSheet(id) {
        if (id === null || id === undefined) {
            return;
        }
        this.currentSheetId = id;

        this.store.dispatch(new GlobalSheetActions.load(id));
        let newPath = c.globalQuestionSheetsPath + "/" + id;
        window.history.pushState(null, null, newPath);
    }

    onClickChild(id) {
        this.fetchSheet(id);
    }

    onClickQuestion(e, id) {
        this.router.navigate([`/${c.viewGlobalQuestion}/${id}`]);
    }

    onClickCurrentSheet(id) {
        this.fetchSheet(id);
    }

    onDroppedQuestions(questionReorder) {
        this.store.dispatch(new GlobalSheetActions.globalQuestionReorder(questionReorder));
    }

    onDroppedSheets(sheetReorder) {
        console.log("::G_SHEET_REORDER::", sheetReorder);
        this.store.dispatch(new GlobalSheetActions.sheetReorder(sheetReorder));
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}