import { Component } from "@angular/core";
import { QsGlobalIndex } from "src/app/services/models/question-sheet/qsGlobalIndex";
import { QGlobalIndex } from "src/app/services/models/question/qGlobalIndex";
import { ReorderService } from 'src/app/services/reorder-service';
import { ActivatedRoute, Router } from "@angular/router";

import { QuestionSheetService } from "../../../services/question-sheet-service";
import * as c from "../../../utilities/route-paths";
import { TrackingService } from "../../../services/tracking.service";

import { Store, select } from "@ngrx/store";
import { GlobalState } from "../../reducers"
import { Observable } from "rxjs";

import { GlobalSheetActions } from "../../actions/global-sheet.action";
import { globalSheetReducer } from '../../reducers/global-sheets.reducer';

@Component({
    selector: "getready-global-sheet",
    templateUrl: "./global-sheet.component.html",
})
export class GlobalSheetComponent {

    public questionSheet$: Observable<QsGlobalIndex>;

    constructor(
        private store: Store<GlobalState>,

        private questionSheetService: QuestionSheetService,
        private reorderService: ReorderService,
        private route: ActivatedRoute,
        private router: Router,
        public routePaths: c.RoutePaths,
        private trackingService: TrackingService,
    ) {
        let testValue: QsGlobalIndex = {
            id: 15,
            name: "bob",
            description: "",
            difficulty: 5,
            importance: 5,
            order: 1,
            questionSheetId: 1,
            children: [],
            globalQuestions: [],
        }

        store.dispatch(new GlobalSheetActions.Loaded(testValue));
        store.dispatch(new GlobalSheetActions.Load(3));

        this.questionSheet$ = store.select(state => state.global.currentGlobalIndex);

        console.log(this.questionSheet$);

        this.questionSheet$.subscribe(v => { 
            console.log(v);
        });

        let id = this.route.snapshot.paramMap.get("id");
        if (id === "-1") {
            id = trackingService.getPublicSheetId().toString(); 
        }
        this.fetchSheet(id);
    }

    currentSheet: QsGlobalIndex;
    loaded: boolean = false;
    isAdmin: boolean = true;
    isUser: boolean = true;
    col1: QGlobalIndex[];
    col2: QGlobalIndex[];
    col3: QGlobalIndex[];

    async ngOnInit() {
    }

    async fetchSheet(id) {
        if (id === null || id === undefined) {
            return;
        }

        this.trackingService.setPublicSheetId(Number(id));

        let qsResult = await this.questionSheetService.getGlobalIndex(id);
        if (qsResult.status === 200) {

            let newPath = c.globalQuestionSheetsPath + "/" + id;
            window.history.pushState(null, null, newPath);

            let col1: QGlobalIndex[] = [];
            let col2: QGlobalIndex[] = [];
            let col3: QGlobalIndex[] = [];

            this.currentSheet = qsResult.data;
            let questions = qsResult.data.globalQuestions;
            let unassigned: QGlobalIndex[] = [];
            for (let i = 0; i < questions.length; i++) {
                const question = questions[i];
                switch (question.column) {
                    case 1:
                        col1.push(question);
                        break;
                    case 2:
                        col2.push(question);
                        break;
                    case 3:
                        col3.push(question);
                        break;
                    default:
                        unassigned.push(question);
                        break;
                }
            }

            this.setColumns(this.reorderService.reorderColumns([col1, col2, col3],unassigned,true));
            this.loaded = true;
        } else {
            alert(qsResult.json);
        }
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
        console.dir(e);
        let container = e.container;
        let prevContainer = e.previousContainer;
        let currentIndex = e.currentIndex;
        let prevIndex = e.previousIndex;

        if (container.data == prevContainer.data) {
            let containerIndex = container.data;
            let colName = "col" + containerIndex;
            this[colName] = this.reorderService.reorderSameContainer(this[colName], prevIndex, currentIndex);
        } else {
            let oldColName = "col" + prevContainer.data;
            let newColName = "col" + container.data;
            let reorderData = this.reorderService.reorderTwoContainers(
                this[oldColName], this[newColName], prevIndex, currentIndex);
            this[oldColName] = reorderData.old;
            this[newColName] = reorderData.new;
        }

        this.setColumns(this.reorderService.reorderColumns(this.getColumns(), []));
    }

    onClickGlobalQuestion(id) { 
        this.router.navigate([`/${c.viewGlobalQuestion}/${id}`]);
    }

    setColumns(array) {
        this.col1 = array[0];
        this.col2 = array[1];
        this.col3 = array[2];
    }

    getColumns() {
        return [this.col1, this.col2, this.col3];
    }
}