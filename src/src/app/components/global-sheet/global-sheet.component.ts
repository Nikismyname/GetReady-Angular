import { Component } from "@angular/core";
import { QuestionSheetService } from "../../services/question-sheet-service";
import QsGlobalIndex from "src/app/services/models/question-sheet/qsGlobalIndex";
import QGlobalIndex from "src/app/services/models/question/qGlobalIndex";
import { ReorderService } from 'src/app/services/reorder-service';
import { ActivatedRoute } from "@angular/router";
import * as c from "../../utilities/route-paths";

@Component({
    selector: "getready-global-sheet",
    templateUrl: "./global-sheet.component.html",
})
export class GlobalSheetComponent {
    constructor(
        private questionSheetService: QuestionSheetService,
        private reorderService: ReorderService,
        private route: ActivatedRoute,
    ) { 
        let id = this.route.snapshot.paramMap.get("id");
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

    setColumns(array) {
        this.col1 = array[0];
        this.col2 = array[1];
        this.col3 = array[2];
    }

    getColumns() {
        return [this.col1, this.col2, this.col3];
    }
}