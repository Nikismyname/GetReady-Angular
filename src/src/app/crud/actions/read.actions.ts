import { Action } from '@ngrx/store';

export namespace ReadActionTypes {
    export const GLOBAL_QUESTION = "[read] global-question";
    export const GLOBAL_QUESTION_SUCCESS = "[read] global-question-success";
    export const GLOBAL_QUESTION_FAIL = "[read] global-question-fail";

    export const CLEAR_READ_STATE = "[read] clear";
}

class GlobalQuestionAction implements Action {
    public type = ReadActionTypes.GLOBAL_QUESTION;
    public payload: number;

    constructor(
        public questionId: number,
    ) {
        this.payload = questionId;
    }
}

class GlobalQuestionSuccessAction implements Action {
    public type = ReadActionTypes.GLOBAL_QUESTION_SUCCESS;
    public payload: any;

    constructor(
        public question: any,
    ) {
        this.payload = question;
    }
}

class GlobalQuestionActionFail implements Action {
    public type = ReadActionTypes.GLOBAL_QUESTION_FAIL;
    public payload: any;

    constructor(
        public error: any,
    ) {
        this.payload = error;
    }
}

class ClearReadStateAction implements Action { 
    public type = ReadActionTypes.CLEAR_READ_STATE;
}

export namespace ReadActions {
    export const GlobalQuestion = GlobalQuestionAction;
    export const GlobalQuestionFail = GlobalQuestionActionFail;
    export const GlobalQuestionsSuccess = GlobalQuestionSuccessAction;

    export const ClearReadState = ClearReadStateAction;
};

