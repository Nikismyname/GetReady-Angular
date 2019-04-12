import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/scoped-data';

export namespace ReadActionTypes {
    export const QUESTION = "[read] question";
    export const QUESTION_SUCCESS = "[read] question-success";
    export const QUESTION_FAILED = "[read] question-fail";

    export const QUESTION_SHEET = "[read] question-sheet";
    export const QUESTION_SHEET_SUCCESS = "[read] question-sheet-success";
    export const QUESTION_SHEET_FAILED = "[read] question-sheet-fail";

    export const GET_ALL_ITEMS = "[read] get all items";
    export const GET_ALL_ITEMS_SUCCESS = "[read] get all items success";
    export const GET_ALL_ITEMS_FAILED = "[read] get all items failed";

    export const GET_ALL_FOLDERS = "[read] get all folders";
    export const GET_ALL_FOLDERS_SUCCESS = "[read] get all folders success";
    export const GET_ALL_FOLDERS_FAILED = "[read] get all folders failed";

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
    public type = ReadActionTypes.QUESTION_FAILED;
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
    public type = ReadActionTypes.QUESTION_SHEET_FAILED;
    public payload: any;

    constructor(
        public error: any,
    ) {
        this.payload = error;
    }
}
/* #endregion */

/* #region  GET ALL  */
class GetAllItemsAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS;
    public payload: boolean;
    constructor(global: boolean) {
        this.payload = global;
    }
}

class GetAllItemsSuccessAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS_SUCCESS;
    public payload: any;
    constructor(items: any) {
        this.payload = items;
    }
}

class GetAllItemsFailedAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS_FAILED;
    public payload = null;
}

class GetAllFoldersAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS;
    public payload: boolean;
    constructor(global: boolean) {
        this.payload = global;
    }
}

class GetAllFoldersSuccessAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS_SUCCESS;
    public payload: any;
    constructor(items: any) {
        this.payload = items;
    }
}

class GetAllFoldersFailedAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS_FAILED;
    public payload = null;
}
/* #endregion */


class ClearReadSuccessesAction implements Action {
    public type = ReadActionTypes.CLEAR_READ_SUCCESSES;
}

export namespace ReadActions {
    export const Question = QuestionAction;
    export const QuestionsSuccess = QuestionSuccessAction;
    export const QuestionFail = QuestionActionFail;

    export const QuestionSheet = QuestionSheetAction;
    export const QuestionSheetSuccess = QuestionSheetSuccessAction;
    export const QuestionSheetFail = QuestionSheetFailAction

    export const GetAllFolders = GetAllFoldersAction; 
    export const GetAllFoldersSuccess = GetAllFoldersSuccessAction; 
    export const GetAllFoldersFailed = GetAllFoldersFailedAction;
    
    export const GetAllItems = GetAllItemsAction;
    export const GetAllItemsSuccess = GetAllItemsSuccessAction; 
    export const GetAllItemsFailed = GetAllItemsFailedAction;

    export const ClearReadSuccesses = ClearReadSuccessesAction;
};

