import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IScopedData } from './models/others/scoped-data';
import { IQsGlobalIndex } from './models/question-sheet/qs-global-index';
import { IQsPersonalIndex } from './models/question-sheet/qs-personal-index';
import { IQuestionSheet } from './models/question-sheet/question-sheet';
import { ISheetIndexWithScope } from './models/question-sheet/sheet-index-with-scope';
import { IEditSheet } from './models/question-sheet/edit-sheet';
import { ICreateSheet } from './models/question-sheet/create-sheet';
import { IReorderData } from './models/question/question-reorder';
import { ISheetForAllItems } from './models/others/sheet-for-all-items';
import { ISheetForAllFolders } from './models/others/sheet-for-all-folders';
//typed
@Injectable({
    providedIn: "root",
})
export class QuestionSheetService {

    constructor(
        private http: HttpClient,
    ) { }

    getGlobalIndexObs = (id: number) => {
        return this.http.get<IQsGlobalIndex>(`QuestionSheet/GetGlobalIndex/${id}`);
    }

    getPersonalIndexObs = (id: number) => {
        return this.http.get<IQsPersonalIndex>(`QuestionSheet/GetPersonalIndex/${id}`);
    }

    getQuestionSheetObs = (d: IScopedData<number>) => {
        let path = d.global ? "QuestionSheet/GetOnePublic/" + d.data : "QuestionSheet/GetOnePersonal/" + d.data;
        return this.http.get<IQuestionSheet>(path);
    }

    editQuestionSheetObs = (d: IScopedData<IEditSheet>) => {
        let path = d.global ? "QuestionSheet/EditGlobal" : "QuestionSheet/EditPersonal";
        return this.http.post<ISheetIndexWithScope>(path, JSON.stringify(d.data));
    }

    deleteQuestionSheetObs = (d: IScopedData<number>) => {
        let path = d.global ? "QuestionSheet/DeleteGlobal" : "QuestionSheet/DeletePersonal";
        return this.http.post<number>(path, JSON.stringify(d.data));
    }

    createQuestionSheetObs = (d: IScopedData<ICreateSheet>) => {
        let path = d.global ? "QuestionSheet/CreateGlobalSheet" : "QuestionSheet/CreatePersonalSheet";
        return this.http.post<ISheetIndexWithScope>(path, JSON.stringify(d.data));
    }

    reorderGlobalSheetsObs = (d: IReorderData) => {
        return this.http.post<void>("QuestionSheet/ReorderGlobal", JSON.stringify(d));
    }

    reorderPersonalSheetsObs = (d: IReorderData) => {
        return this.http.post<void>("QuestionSheet/ReorderPersonal", JSON.stringify(d));
    }

    getQuestionIdsForPSheetObs = (id: number) => {
        return this.http.get<number[]>("QuestionSheet/GetQuestionIdsForSheet/" + id);
    }

    getAllItemsObs = (global: boolean) => {
        return this.http.get<ISheetForAllItems[]>("QuestionSheet/GetAllGlobal");
    }

    getAllFoldersObs = (global: boolean) => {
        let path = global ? "GetAllFoldersGlobal" : "GetAllPersonal";
        return this.http.get<ISheetForAllFolders[]>("QuestionSheet/" + path);
    };

}