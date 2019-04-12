import { Component } from "@angular/core";
import { IQsPersonalIndex } from '../../../services/models/question-sheet/qs-personal-index';
import { ActivatedRoute, Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { PersonalSheetActions } from "../../actions/personal-sheet.actions";

import * as c from "../../../utilities/route-paths";
import { IAppState } from 'src/app/store/reducers';
import { IUserStatus } from 'src/app/services/models/other';

@Component({
  selector: 'getready-personal-sheet',
  templateUrl: './personal-sheet.component.html',
  styleUrls: ['./personal-sheet.component.css']
})
export class PersonalSheetComponent {

    questionSheet$: Observable<IQsPersonalIndex>;
    private latestIdSub: Subscription;
    private userSub: Subscription;
    currentSheetId: number = -1;
    loaded: boolean = false;
    isAdmin: boolean = false;
    isUser: boolean = false;

    constructor(
        private store: Store<IAppState>,
        private route: ActivatedRoute,
        private router: Router,
        public routePaths: c.RoutePaths,
    ) {
        this.questionSheet$ = store.select(state => state.personal.currentPersonalIndex);

        this.userSub = this.store.select(x => x.auth.user).subscribe(user => {
            this.isUser = user ? true : false;
            this.isAdmin = user ? user.role === "Admin" ? true : false : false;
        });

        let id = this.route.snapshot.paramMap.get("id");
        let initialSavedId = null;
        this.latestIdSub = store.select(state => state.personal.latestId).subscribe(x => {
            initialSavedId = x;
        });
 
        if (id === "-1" && initialSavedId !== null) {
            this.fetchSheet(initialSavedId);
        } else {
            this.fetchSheet(id);
        }
    }

    get user () {
        let data: IUserStatus = { isAdmin: this.isAdmin, isUser: this.isUser }
        return data;
    }

    async ngOnInit() {
    }

    async fetchSheet(id) {
        if (id === null || id === undefined) {
            return;
        }
        this.currentSheetId = id;

        this.store.dispatch(new PersonalSheetActions.load(id));
        this.store.dispatch(new PersonalSheetActions.saveLatestId(id));
        let newPath = c.personalQuestionSheetsPath + "/" + id;
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
        // console.log("::QUESTION::", questionReorder);
        this.store.dispatch(new PersonalSheetActions.questionReorder(questionReorder));
    }

    onDroppedSheets(sheetReorder) {
        console.log("::SHEET::", sheetReorder);
        this.store.dispatch(new PersonalSheetActions.sheetReorder(sheetReorder));
    }

    ngOnDestroy() {
        this.store.dispatch(new PersonalSheetActions.clearCurrentIndState());
        this.latestIdSub.unsubscribe();
        this.userSub.unsubscribe();
    }
}