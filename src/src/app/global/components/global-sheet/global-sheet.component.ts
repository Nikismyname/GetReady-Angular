import { Component } from "@angular/core";
import { QsGlobalIndex } from "src/app/services/models/question-sheet/qsGlobalIndex";
import { ActivatedRoute, Router } from "@angular/router";
 
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { GlobalState } from "../../reducers"
import { GlobalSheetActions } from "../../actions/global-sheet.action";

import { ReorderService } from 'src/app/services/reorder-service';
import * as c from "../../../utilities/route-paths";
import { QGlobalIndex } from 'src/app/services/models/question/qGlobalIndex';
import { map } from 'rxjs/operators';
import { IQuestionReorder } from 'src/app/services/models/question/IQuestionReorder';


@Component({
    selector: "getready-global-sheet",
    templateUrl: "./global-sheet.component.html",
})
export class GlobalSheetComponent {

    public questionSheet$: Observable<QsGlobalIndex>;
    public questions$: Observable<QGlobalIndex[]>;
    private latestIdSub: Subscription;
    currentSheetId: number = 3;

    constructor(
        private store: Store<GlobalState>,
        public reorderService: ReorderService,
        private route: ActivatedRoute,
        private router: Router,
        public routePaths: c.RoutePaths,
    ) {
        this.questionSheet$ = store.select(state => state.global.currentGlobalIndex);
        this.questions$ = this.questionSheet$.pipe(map(x => x.globalQuestions.sort((a, b) => a.order - b.order)));

        let id = this.route.snapshot.paramMap.get("id");
        let initialSavedId = null;
        this.latestIdSub = store.select(state => state.global.latestId).subscribe(x => { 
            initialSavedId = x;
        });

        if(id  === "-1" && initialSavedId !== null){
            this.fetchSheet(initialSavedId);
        } else {
            this.fetchSheet(id);
        }
    }

    loaded: boolean = false;
    isAdmin: boolean = true;
    isUser: boolean = true;

    async ngOnInit() {
    }

    async fetchSheet(id) {
        if (id === null || id === undefined) {
            return;
        }
        this.currentSheetId = id;

        this.store.dispatch(new GlobalSheetActions.load(id));
        this.store.dispatch(new GlobalSheetActions.SaveLatestId(id));
        let newPath = c.globalQuestionSheetsPath + "/" + id;
        window.history.pushState(null, null, newPath);
    }

    onClickChild(e, id) {
        this.fetchSheet(id);
    }

    onClickQuestion(e, id) {
        alert(id);
    }

    onClickCurrentSheet(e, id) {
        this.fetchSheet(id);
    }

    onDropped(e) {
        let container = e.container;
        let qc = container.data.qc;
        let currColumn = container.data.ind;
        let prevContainer = e.previousContainer;
        let precColumn = prevContainer.data.ind;
        let currentIndex = e.currentIndex;
        let prevIndex = e.previousIndex;

        let orderings = this.reorderService.generateOrdering(qc, currentIndex, prevIndex, currColumn, precColumn);
        
        let data: IQuestionReorder = {orderings:orderings, sheetId: this.currentSheetId };
        this.store.dispatch(new GlobalSheetActions.globalQuestionReorder(data));
    }

    onClickGlobalQuestion(id) { 
        this.router.navigate([`/${c.viewGlobalQuestion}/${id}`]);
    }

    ngOnDestroy() {
        this.latestIdSub.unsubscribe();
    }
}