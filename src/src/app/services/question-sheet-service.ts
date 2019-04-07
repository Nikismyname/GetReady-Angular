import { Injectable } from "@angular/core"
import { QsGlobalIndex } from "./models/question-sheet/qsGlobalIndex";
import { HttpClient } from '@angular/common/http';
//import QsPersonalIndex from "./models/question-sheet/qsPersonalIndex";
 
@Injectable()
export class QuestionSheetService {
    constructor(
        private http: HttpClient,
    ) {}
    
    // async getGlobalIndex(id) { //x
    //     try {
    //         let result = await this.crud.get<QsGlobalIndex>("QuestionSheet/GetGlobalIndex", id);
    //         return result;
    //     } catch (err) {
    //         this.handleError(err);
    //     }
    // }

    getGlobalIndexObs(id) { 
        return this.http.get(`QuestionSheet/GetGlobalIndex/${id}`);
    }

    // async getPersonalIndex(id) { //x
    //     try {
    //         let result = await this.crud.get("QuestionSheet/GetPersonalIndex", id);
    //         return result;
    //     } catch (err) {
    //         this.handleError(err);
    //     }
    // }

    // async getAllFoldersPersonal() { //x
    //     try {
    //         let result = await this.crud.get("QuestionSheet/GetAllPersonal");
    //         return result;
    //     } catch (err) {
    //         this.handleError(err);
    //     }
    // }

    // async getAllFoldersGlobal() { //x
    //     try {
    //         let result = await this.crud.get<any[]>("QuestionSheet/GetAllFoldersGlobal");
    //         return result;
    //     } catch (err) {
    //         this.handleError(err);
    //     }
    // }

    getQuestionSheetObs(id: number, global: boolean) {
        let path = global ? "QuestionSheet/GetOnePublic/"+id : "QuestionSheet/GetOnePersonal/"+id;
        return this.http.get(path);
    }

    editQuestionSheetObs(data: any, global: boolean) {
        let path = global ? "QuestionSheet/EditGlobal": "QuestionSheet/EditPersonal";
        return this.http.post(path, JSON.stringify(data));
    }

    createQuestionSheetObs(data: any, global: boolean) {
        let path = global ? "QuestionSheet/CreateGlobalSheet": "QuestionSheet/CreatePersonalSheet";
        return this.http.post(path, JSON.stringify(data));
    }

    private handleError(err) {
        console.log(err);
    }
}