import { Component } from "@angular/core";
import { IQsGlobalIndex } from "src/app/services/models/question-sheet/qs-global-index";
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { GlobalSheetActions } from "../../actions/global-sheet.action";

import { ReorderService } from 'src/app/services/reorder-service';
import * as c from "../../../services/route-paths";
import { IQuestionReorder } from 'src/app/services/models/question/question-reorder';
import { IAppState } from 'src/app/store/reducers';
import { IUserStatus, IReorderQuestion } from 'src/app/services/models/other';
 
@Component({
    selector: "getready-global-sheet",
    templateUrl: "./global-sheet.component.html",
})
export class GlobalSheetComponent {

    questionSheet$: Observable<IQsGlobalIndex>;
    private latestIdSub: Subscription;
    private userSub: Subscription;
    currentSheetId: number = 3;
    loaded: boolean = false;
    isAdmin: boolean = false;
    isUser: boolean = false;

    constructor(
        private store: Store<IAppState>,
        public reorderService: ReorderService,
        private route: ActivatedRoute,
        private router: Router,
        public routePaths: c.RoutePaths,
    ) {
        this.questionSheet$ = store.select(state => state.global.currentGlobalIndex);

        this.userSub = this.store.select(x => x.auth.user).subscribe(user => {
            this.isUser = user ? true : false;
            this.isAdmin = user ? user.role === "Admin" ? true : false : false;
        });

        let id = this.route.snapshot.paramMap.get("id");
        let initialSavedId = null;
        this.latestIdSub = store.select(state => state.global.latestId).subscribe(x => {
            initialSavedId = x;
        });
 
        if (id === "-1" && initialSavedId !== null) {
            this.fetchSheet(initialSavedId);
        } else {
            this.fetchSheet(id);
        }
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
        this.store.dispatch(new GlobalSheetActions.saveLatestId(id));
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
        this.latestIdSub.unsubscribe();
        this.userSub.unsubscribe();
    }
}