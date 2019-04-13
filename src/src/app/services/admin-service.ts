import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getQuestionIdsForApprovalObs = () => { 
        return this.http.get("Question/GetQuestionIdsForApproval");
    }

    approveQuestionObs = (data: any) => { 
        return this.http.post("Question/ApproveQuestion", JSON.stringify(data));
    }

    rejectQuestionObs = (id: number) => { 
        return this.http.post("Question/RejectQuestion", JSON.stringify(id));
    }
}