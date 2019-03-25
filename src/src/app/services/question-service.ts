import { Injectable } from "@angular/core"
import { Crud } from "./crud";

@Injectable()
export class QuestionService {
    constructor(private crud: Crud) {
    }

    async getGlobalQuestion(id) {
        try {
            let result = await this.crud.post("Question/GetGlobal", id);
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }

    /* #region Create */
    async createQuestion(data, scope) {
        try {
            let path = scope === "global" ? "Question/CreateGlobal" : "Question/CreatePersonal";
            let result = await this.crud.post(path, data);
            return result;
        } catch (err) {
            this.handleError(err);
        }
    }
    /* #endregion */

    /* #region Edit */
    async editQuestion(data, scope) {//x
        try {
            let path = scope === "global" ? "Question/EditGlobal" : "Question/EditPersonal";
            let result = await this.crud.post(path, data);
            return result;
        }
        catch (err) {
            this.handleError(err);
        }
    }
    /* #endregion */

    handleError(err) {
        console.log(err);
    }
}