import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';

export namespace ReadActionTypes {
    export const QUESTION = "[read] question";
    export const QUESTION_SUCCESS = "[read] question-success";
    export const QUESTION_FAIL = "[read] question-fail";

    export const QUESTION_SHEET = "[read] question-sheet";
    export const QUESTION_SHEET_SUCCESS = "[read] question-sheet-success";
    export const QUESTION_SHEET_FAIL = "[read] question-sheet-fail";

    export const CLEAR_READ_SUCCESSES = "[read] clear successes";
}

/* #region Question */
class QuestionAction implements Action {
    public type = ReadActionTypes.QUESTION;
    public payload: IScopedData;

    constructor(
        public data: IScopedData,
    ) {
        this.payload = data;
    }
}

class QuestionSuccessAction implements Action {
    public type = ReadActionTypes.QUESTION_SUCCESS;
    public payload: any;

    constructor(
        public question: any,
    ) {
        this.payload = question;
    }
}

class QuestionActionFail implements Action {
    public type = ReadActionTypes.QUESTION_FAIL;
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


class ClearReadSuccessesAction implements Action {
    public type = ReadActionTypes.CLEAR_READ_SUCCESSES;
}

export namespace ReadActions {
    export const Question = QuestionAction;
    export const QuestionFail = QuestionActionFail;
    export const QuestionsSuccess = QuestionSuccessAction;

    export const QuestionSheet = QuestionSheetAction;
    export const QuestionSheetSuccess = QuestionSheetSuccessAction;
    export const QuestionSheetFail = QuestionSheetFailAction

    export const ClearReadSuccesses = ClearReadSuccessesAction;
};

