import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IScopedData } from './models/contracts/scoped-data';
import { httpFactory } from '@angular/http/src/http_module';
import { IQuestionReorder } from './models/question/question-reorder';
import { INewScoreData } from './models/question/new-score-data';
import { ICopyQuestionData } from './models/question/copy-questions-data';
import { IPQForUserReview } from './models/contracts/pq-for_user-review';

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

    // reorderObs = (d: IScopedData) => { 
    //     let path = d.global ? "Question/ReorderGlobal" : "Question/ReorderPersonal";
    //     return this.http.post(path, JSON.stringify(d.data));
    // }

    reorderGlobalObs = (d: IQuestionReorder) => { 
        return this.http.post("Question/ReorderGlobal", JSON.stringify(d));
    }

    reorderPersonalObs = (d: IQuestionReorder) => { 
        return this.http.post("Question/ReorderPersonal", JSON.stringify(d));
    }

    addNewScoreObs = (data: INewScoreData) => { 
        return this.http.post("Question/AddNewScore", JSON.stringify(data));
    } 

    copyQuestions = (data: ICopyQuestionData) => { 
        return this.http.post("Question/CopyQuestions", JSON.stringify(data));
    } 

    suggestForPublishingObs = (id: number) => { 
        return this.http.post("Question/SuggestForPublishing", JSON.stringify(id));
    } 

    getQuestionIdsForApprovalObs = () => { 
        return this.http.get("Question/GetQuestionIdsForApproval");
    }

    getAnsweredQuestionsObs = () => { 
        return this.http.get<IPQForUserReview[]>("Question/GetAnsweredQuestions");
    }
}