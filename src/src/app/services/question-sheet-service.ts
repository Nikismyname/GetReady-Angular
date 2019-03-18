import { Injectable } from "@angular/core"
import { Crud } from "./crud";
import QsGlobalIndex from "./models/question-sheet/qsGlobalIndex"

@Injectable()
export class QuestionSheetService {
    constructor(private crud: Crud) {
    }
    
    async getGlobalIndex(id) { //x
        try {
            let result = await this.crud.get("QuestionSheet/GetGlobalIndex", id);
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    async getPersonalIndex(id) { //x
        try {
            let result = await this.crud.get("QuestionSheet/GetPersonalIndex", id)
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    private handleError(err) {
        console.log(err);
    }
}