import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { IApproveQuestionData } from './models/others/approve-question-data';
//typed
@Injectable({
    providedIn: "root",
})
export class AdminService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getQuestionIdsForApprovalObs = () => { 
        return this.http.get<number[]>("Question/GetQuestionIdsForApproval");
    }

    approveQuestionObs = (data: IApproveQuestionData) => { 
        return this.http.post<void>("Question/ApproveQuestion", JSON.stringify(data));
    }

    rejectQuestionObs = (id: number) => { 
        return this.http.post<void>("Question/RejectQuestion", JSON.stringify(id));
    }
}