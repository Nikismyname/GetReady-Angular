import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IScopedData } from './models/contracts/ScopedData';
import { httpFactory } from '@angular/http/src/http_module';

@Injectable()
export class QuestionService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getGlobalQuestionObs = (id) => {
        return this.http.post("Question/GetGlobal", JSON.stringify(id));
    }

    getPersonalQuestionObs = (id) => {
        return this.http.post("Question/GetPersonal", JSON.stringify(id));
    }

    getQuestionObs = (d: IScopedData) => {
        let global = d.global;
        let id = d.data;
        let path = global ? "Question/GetGlobal" : "Question/GetPersonal";
        return this.http.post(path, JSON.stringify(id));
    }

    createQuestionObs = (d: IScopedData) => {
        let data = d.data;
        let global = d.global;
        let path = global ? "Question/CreateGlobal" : "Question/CreatePersonal";
        return this.http.post(path, JSON.stringify(data));
    }

    editQuestionObs = (d: IScopedData) => {
        let data = d.data;
        let global = d.global;
        let path = global ? "Question/EditGlobal" : "Question/EditPersonal";
        return this.http.post(path, JSON.stringify(data));
    }

    deleteQuestionObs = (d: IScopedData) => {
        let path = d.global ? "Question/DeleteGlobal" : "Question/DeletePersonal";
        return this.http.post(path, JSON.stringify(d.data));
    }
}