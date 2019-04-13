import { Action } from '@ngrx/store';

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
    public type = AdminActionTypes.GET_IDS_FOR_APPROVAL;
    public payload = null;
}

class GetIdsForApprovalSuccessAction implements Action {
    public type = AdminActionTypes.GET_IDS_FOR_APPROVAL_SUCCESS;
    public payload: number[];

    constructor(
        public data: number[],
    ) {
        this.payload = data;
    }
}

class GetIdsForApprovalFailedAction implements Action {
    public type = AdminActionTypes.GET_IDS_FOR_APPROVAL_FAILED;
    public payload: any;

    constructor(
        public error: any,
    ) {
        this.payload = error;
    }
}
/* #endregion */

/* #region APPROVE_/_REJECT_QUESTION */
class ApproveQuestionAction implements Action {
    public type = AdminActionTypes.APPROVE_QUESTION;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}

class ApproveQuestionSuccessAction implements Action {
    public type = AdminActionTypes.APPROVE_QUESTION_SUCCESS;
    public payload = null;
}

class ApproveQuestionFailedAction implements Action {
    public type = AdminActionTypes.APPROVE_QUESTION_FAILED;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}

//REJECT
class RejectQuestionAction implements Action {
    public type = AdminActionTypes.REJECT_QUESTION;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}

class RejectQuestionSuccessAction implements Action {
    public type = AdminActionTypes.REJECT_QUESTION_SUCCESS;
    public payload = null;
}

class RejectQuestionFailedAction implements Action {
    public type = AdminActionTypes.REJECT_QUESTION_FAILED;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}
/* #endregion */

class ClearSuccessesAction implements Action {
    public type = AdminActionTypes.CLEAR_SUCCESSES;
    public payload = null;
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

