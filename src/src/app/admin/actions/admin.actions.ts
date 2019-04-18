import { Action } from '@ngrx/store';
import { IApproveQuestionData } from 'src/app/services/models/others/approve-question-data';
//1 union typed doced
export namespace AdminActionTypes {
    export const GET_IDS_FOR_APPROVAL = "[Admin] get ids for approval";
    export const GET_IDS_FOR_APPROVAL_SUCCESS = "[Admin] get ids for approval success";
    export const GET_IDS_FOR_APPROVAL_FAILED = "[Admin] get ids for approval failed";

    export const APPROVE_QUESTION = "[Admin] approve question";
    export const APPROVE_QUESTION_SUCCESS = "[Admin] approve question success";
    export const APPROVE_QUESTION_FAILED = "[Admin] approve question failed";

    export const REJECT_QUESTION = "[Admin] reject question";
    export const REJECT_QUESTION_SUCCESS = "[Admin] reject question success";
    export const REJECT_QUESTION_FAILED = "[Admin] reject question failed";

    export const CLEAR_SUCCESSES = "[Admin] clear successes";
}

/* #region  GET_IDS_FOR_APPROVAL */
class GetIdsForApprovalAction implements Action {
    public readonly type = AdminActionTypes.GET_IDS_FOR_APPROVAL;
    constructor(public readonly payload: null = null){}
}

class GetIdsForApprovalSuccessAction implements Action {
    public readonly type = AdminActionTypes.GET_IDS_FOR_APPROVAL_SUCCESS;
    constructor(/** question ids */public readonly payload: number[]){}
}

class GetIdsForApprovalFailedAction implements Action {
    public readonly type = AdminActionTypes.GET_IDS_FOR_APPROVAL_FAILED;
    constructor(/** error any */ public readonly payload: any){}
}
/* #endregion */

/* #region APPROVE_/_REJECT_QUESTION */
class ApproveQuestionAction implements Action {
    public readonly type = AdminActionTypes.APPROVE_QUESTION;
    constructor(public readonly payload: IApproveQuestionData){}
}

class ApproveQuestionSuccessAction implements Action {
    public readonly type = AdminActionTypes.APPROVE_QUESTION_SUCCESS;
    constructor(public readonly payload: null = null){}
}

class ApproveQuestionFailedAction implements Action {
    public readonly type = AdminActionTypes.APPROVE_QUESTION_FAILED;
    constructor(/** error any */public readonly payload: any){}
}

//REJECT
class RejectQuestionAction implements Action {
    public readonly type = AdminActionTypes.REJECT_QUESTION;
    constructor(/** question id */ public readonly payload: number){}
}

class RejectQuestionSuccessAction implements Action {
    public readonly type = AdminActionTypes.REJECT_QUESTION_SUCCESS;
    constructor(public readonly payload: null = null){}
}

class RejectQuestionFailedAction implements Action {
    public readonly type = AdminActionTypes.REJECT_QUESTION_FAILED;
    constructor(/** error any */ public readonly payload: any){}
}
/* #endregion */

class ClearSuccessesAction implements Action {
    public readonly type = AdminActionTypes.CLEAR_SUCCESSES;
    constructor(public readonly payload:null = null){}
}

export namespace AdminActions {
    export const getIdsForApproval = GetIdsForApprovalAction;
    export const getIdsForApprovalSuccess = GetIdsForApprovalSuccessAction;
    export const getIdsForApprovalFailed = GetIdsForApprovalFailedAction;

    export const approveQuestion = ApproveQuestionAction;
    export const approveQuestionSuccess = ApproveQuestionSuccessAction; 
    export const approveQuestionFailed = ApproveQuestionFailedAction; 

    export const rejectQuestion = RejectQuestionAction; 
    export const rejectQuestionSuccess = RejectQuestionSuccessAction;
    export const rejectQuestionFailed = RejectQuestionFailedAction;

    export const clearSuccesses = ClearSuccessesAction;
}

export type AdminActionType
    =GetIdsForApprovalAction 
    |GetIdsForApprovalSuccessAction 
    |GetIdsForApprovalFailedAction 

    |ApproveQuestionAction 
    |ApproveQuestionSuccessAction 
    |ApproveQuestionFailedAction 

    |RejectQuestionAction 
    |RejectQuestionSuccessAction 
    |RejectQuestionFailedAction 

    |ClearSuccessesAction;

    

