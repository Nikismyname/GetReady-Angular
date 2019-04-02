import { Injectable } from "@angular/core"
import { Crud, CrudObs } from "./crud";
import { QsGlobalIndex } from "./models/question-sheet/qsGlobalIndex";
//import QsPersonalIndex from "./models/question-sheet/qsPersonalIndex";
 
@Injectable()
export class QuestionSheetService {
    constructor(
        private crud: Crud,
        private crudObs: CrudObs,
    ) {}
    
    async getGlobalIndex(id) { //x
        try {
            let result = await this.crud.get<QsGlobalIndex>("QuestionSheet/GetGlobalIndex", id);
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    getGlobalIndexObs(id) { 
        return this.crudObs.get("QuestionSheet/GetGlobalIndex", id);
    }

    async getPersonalIndex(id) { //x
        try {
            let result = await this.crud.get("QuestionSheet/GetPersonalIndex", id);
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    async getAllFoldersPersonal() { //x
        try {
            let result = await this.crud.get("QuestionSheet/GetAllPersonal");
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    async getAllFoldersGlobal() { //x
        try {
            let result = await this.crud.get<any[]>("QuestionSheet/GetAllFoldersGlobal");
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    private handleError(err) {
        console.log(err);
    }
}