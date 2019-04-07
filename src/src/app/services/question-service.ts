import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuestionService {
    constructor(
        private http: HttpClient,
    ) {
    }

    // async getGlobalQuestion(id) {
    //     try {
    //         let result = await this.crud.post("Question/GetGlobal", id);
    //         return result;
    //     } catch (err) {
    //         this.handleError(err);
    //     }
    // }

    getGlobalQuestionObs(id) {
        return this.http.post("Question/GetGlobal", JSON.stringify(id));
    }

    getPersonalQuestionObs(id) {
        return this.http.post("Question/GetPersonal", JSON.stringify(id));
    }

    getQuestionObs(id: number, global: boolean) {
        let path = global ? "Question/GetGlobal" : "Question/GetPersonal";
        return this.http.post(path, JSON.stringify(id));
    }

    /* #region Create */
    // async createQuestion(data, scope) {
    //     try {
    //         let path = scope === "global" ? "Question/CreateGlobal" : "Question/CreatePersonal";
    //         let result = await this.crud.post(path, data);
    //         return result;
    //     } catch (err) {
    //     }
    // }
    async createQuestionObs(data, global) {
        let path = global ? "Question/CreateGlobal" : "Question/CreatePersonal";
        return this.http.post(path, JSON.stringify(data));
    }
    /* #endregion */

    /* #region Edit */
    // async editQuestion(data, scope) {//x
    //     try {
    //         let path = scope === "global" ? "Question/EditGlobal" : "Question/EditPersonal";
    //         let result = await this.crud.post(path, data);
    //         return result;
    //     }
    //     catch (err) {
    //         this.handleError(err);
    //     }
    // }

    editQuestionObs(data, global: boolean) {
        let path = global ? "Question/EditGlobal" : "Question/EditPersonal";
        return this.http.post(path, JSON.stringify(data));
    }

    // editPersonalQuestionObs(data) {
    //     return this.http.post("Question/EditPersonal", JSON.stringify(data));
    // }
    /* #endregion */
}