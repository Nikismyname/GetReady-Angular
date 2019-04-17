import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminActionTypes, AdminActions } from "../actions/admin.actions";
import { ToastrService } from 'ngx-toastr';
import { createEffect } from 'src/app/utilities/effects-creators';
import { AdminService } from 'src/app/services/admin-service';
//1
@Injectable()//messagesX
export class AdminEffects {

    constructor(
        private actions: Actions,
        private adminService: AdminService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    getIdsForApproval$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.adminService.getQuestionIdsForApprovalObs,
        actionType: AdminActionTypes.GET_IDS_FOR_APPROVAL,
        successActions: [AdminActions.getIdsForApprovalSuccess, AdminActions.clearSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: AdminActions.getIdsForApprovalFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, "Failed to get Question Ids for approval!");
    
    @Effect()
    rejectQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.adminService.rejectQuestionObs,
        actionType: AdminActionTypes.REJECT_QUESTION,
        successActions: [AdminActions.rejectQuestionSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: AdminActions.rejectQuestionFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully Rejected Question!", "Failed to Reject Question!");
    
    @Effect()
    approveQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.adminService.approveQuestionObs,
        actionType: AdminActionTypes.APPROVE_QUESTION,
        successActions: [AdminActions.approveQuestionSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: AdminActions.approveQuestionFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    },"Successfully Approved Question!", "Failed to Approve Question!");

}