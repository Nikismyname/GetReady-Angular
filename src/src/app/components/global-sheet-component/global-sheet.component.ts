import { Component } from "@angular/core";
import { QuestionSheetService } from "../../services/question-sheet-service";
import QsGlobalIndex from 'src/app/services/models/question-sheet/qsGlobalIndex';

@Component({
    selector: "global-sheet",
    templateUrl: "./global-sheet.component.html",
 })
export class GlobalSheet {
    constructor(private questionSheetService: QuestionSheetService) {
    }
 
    currentSheet: QsGlobalIndex;
    loaded: boolean = false;
    isAdmin: boolean = true;
    isUser: boolean = true;

    async ngOnInit() {
        this.fetchSheet(-1);
    }

    async fetchSheet(id) {
        if (id === null || id === undefined) {
            return;
        }

        let qsResult = await this.questionSheetService.getGlobalIndex(id);
        if (qsResult.status === 200) {
            this.currentSheet = qsResult.data;
            this.loaded = true;
            console.log(this.currentSheet);
        } else {
            alert(qsResult.message);
        }
    } 

    onClickChild(e, id) {
        this.fetchSheet(id);
    }

    onClickQuestion(e, id) {
        alert(id);
    }

    onClickCurrentSheet(e, id){
        this.fetchSheet(id);
    }

    public title: string = "Test String";
 }