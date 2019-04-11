import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IScopedData } from './models/contracts/scoped-data';
import { IReorderQuestion } from './models/other';
//import QsPersonalIndex from "./models/question-sheet/qsPersonalIndex";
 
@Injectable()
export class QuestionSheetService {
    constructor(
        private http: HttpClient,
    ) {}

    getGlobalIndexObs = (id) => { 
        return this.http.get(`QuestionSheet/GetGlobalIndex/${id}`);
    }

    getPersonalIndexObs = (id) => { 
        return this.http.get(`QuestionSheet/GetPersonalIndex/${id}`);
    }

    getQuestionSheetObs = (d: IScopedData) => {
        let id = d.data;
        let global = d.global;
        let path = global ? "QuestionSheet/GetOnePublic/"+id : "QuestionSheet/GetOnePersonal/"+id;
        return this.http.get(path);
    }

    editQuestionSheetObs = (d: IScopedData) => {
        let data = d.data;
        let global = d.global;
        let path = global ? "QuestionSheet/EditGlobal": "QuestionSheet/EditPersonal";
        return this.http.post(path, JSON.stringify(data));
    }

    deleteQuestionSheetObs = (d: IScopedData) => { 
        let path = d.global ? "QuestionSheet/DeleteGlobal" : "QuestionSheet/DeletePersonal";
        return this.http.post(path, JSON.stringify(d.data));
    }

    createQuestionSheetObs = (d: IScopedData) => {
        let global = d.global;
        let data = d.data;
        let path = global ? "QuestionSheet/CreateGlobalSheet": "QuestionSheet/CreatePersonalSheet";
        return this.http.post(path, JSON.stringify(data));
    }

    reorderGlobalSheetsObs = (d: IReorderQuestion) => { 
        return this.http.post("QuestionSheet/ReorderGlobal", JSON.stringify(d)); 
    }

    reorderPersonalSheetsObs = (d: IReorderQuestion) => { 
        return this.http.post("QuestionSheet/ReorderPersonal", JSON.stringify(d)); 
    }
    
}