import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IScopedData } from './models/others/scoped-data';
import { IReorderData } from './models/question/question-reorder';
import { INewScoreData } from './models/question/new-score-data';
import { ICopyQuestionData } from './models/question/copy-questions-data';
import { IPQForUserReview } from './models/others/pq-for-user-review';
import { IGlobalQuestion } from './models/question/global-question';
import { IPersonalQuestion } from './models/question/personal-question';
import { IQuestionIndexWithScope } from './models/question/question-index-with-scope';
import { ICreateQuestion } from './models/question/create-question';
import { IEditQuestion } from './models/question/edit-question';
//typed
@Injectable({
    providedIn: "root",
})
export class QuestionService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getQuestionObs = (d: IScopedData<number>) => {
        let path = d.global ? "Question/GetGlobal" : "Question/GetPersonal";
        return this.http.post<IGlobalQuestion|IPersonalQuestion>(path, JSON.stringify(d.data));
    }

    createQuestionObs = (d: IScopedData<ICreateQuestion>) => {
        let path = d.global ? "Question/CreateGlobal" : "Question/CreatePersonal";
        return this.http.post<IQuestionIndexWithScope>(path, JSON.stringify(d.data));
    }

    editQuestionObs = (d: IScopedData<IEditQuestion>) => {
        let path = d.global ? "Question/EditGlobal" : "Question/EditPersonal";
        return this.http.post<IQuestionIndexWithScope>(path, JSON.stringify(d.data));
    }

    deleteQuestionObs = (d: IScopedData<number>) => {
        let path = d.global ? "Question/DeleteGlobal" : "Question/DeletePersonal";
        return this.http.post<number>(path, JSON.stringify(d.data));
    }

    reorderGlobalObs = (d: IReorderData) => { 
        return this.http.post<void>("Question/ReorderGlobal", JSON.stringify(d));
    }

    reorderPersonalObs = (d: IReorderData) => { 
        return this.http.post<void>("Question/ReorderPersonal", JSON.stringify(d));
    }

    addNewScoreObs = (data: INewScoreData) => { 
        return this.http.post<void>("Question/AddNewScore", JSON.stringify(data));
    } 

    copyQuestions = (data: ICopyQuestionData) => { 
        return this.http.post<void>("Question/CopyQuestions", JSON.stringify(data));
    } 

    suggestForPublishingObs = (id: number) => { 
        return this.http.post<void>("Question/SuggestForPublishing", JSON.stringify(id));
    } 

    getAnsweredQuestionsObs = () => { 
        return this.http.get<IPQForUserReview[]>("Question/GetAnsweredQuestions");
    }
}