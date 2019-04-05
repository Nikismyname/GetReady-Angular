import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';

export namespace ReadActionTypes {
    export const GLOBAL_QUESTION = "[read] global-question";
    export const GLOBAL_QUESTION_SUCCESS = "[read] global-question-success";
    export const GLOBAL_QUESTION_FAIL = "[read] global-question-fail";

    export const QUESTION_SHEET = "[read] question-sheet";
    export const QUESTION_SHEET_SUCCESS = "[read] question-sheet-success";
    export const QUESTION_SHEET_FAIL = "[read] question-sheet-fail";

    export const CLEAR_READ_STATE = "[read] clear";
}

/* #region  Global Question */
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
/* #endregion */

/* #region  Q Sheet */
class QuestionSheetAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET;
    public payload: IScopedData;

    constructor(
        public data: IScopedData,
    ) {
        this.payload = data;
    }
}

class QuestionSheetSuccessAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET_SUCCESS;
    public payload: any;

    constructor(
        public questionSheet: any,
    ) {
        this.payload = questionSheet;
    }
}

class QuestionSheetFailAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET_FAIL;
    public payload: any;

    constructor(
        public error: any,
    ) {
        this.payload = error;
    }
}
/* #endregion */


class ClearReadStateAction implements Action {
    public type = ReadActionTypes.CLEAR_READ_STATE;
}

export namespace ReadActions {
    export const GlobalQuestion = GlobalQuestionAction;
    export const GlobalQuestionFail = GlobalQuestionActionFail;
    export const GlobalQuestionsSuccess = GlobalQuestionSuccessAction;

    export const QuestionSheet = QuestionSheetAction;
    export const QuestionSheetSuccess = QuestionSheetSuccessAction;
    export const QuestionSheetFail = QuestionSheetFailAction

    export const ClearReadState = ClearReadStateAction;
};

