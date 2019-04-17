import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/scoped-data';
import { IGlobalQuestion } from 'src/app/services/models/question/global-question';
import { IPersonalQuestion } from 'src/app/services/models/question/personal-question';
import { IQuestionSheet } from 'src/app/services/models/question-sheet/question-sheet';
import { ISheetForAllItems } from 'src/app/services/models/contracts/sheet-for-all-items';
import { ISheetForAllFolders } from 'src/app/services/models/contracts/sheet-for-all-folders';
//12
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
/** data: question id */
class QuestionAction implements Action {
    public type = ReadActionTypes.QUESTION;
    constructor(public payload: IScopedData<number>) { }
}

/** question */
class QuestionSuccessAction implements Action {
    public type = ReadActionTypes.QUESTION_SUCCESS;
    constructor(public payload: IGlobalQuestion|IPersonalQuestion) { }
}

/**error*/
class QuestionActionFail implements Action {
    public type = ReadActionTypes.QUESTION_FAILED;
    constructor(public payload: any) { }
}
/* #endregion */

/* #region  Q Sheet */
/** data: sheet id */
class QuestionSheetAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET;
    constructor(public payload: IScopedData<number>) { }
}

/** question sheet */
class QuestionSheetSuccessAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET_SUCCESS;
    constructor(public payload: IQuestionSheet) { }
}

/**error */
class QuestionSheetFailAction implements Action {
    public type = ReadActionTypes.QUESTION_SHEET_FAILED;
    constructor(public payload: any) { }
}
/* #endregion */

/* #region  GET ALL  */

//ITEMS 

/** isGlobal */
class GetAllItemsAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS;
    constructor(public payload: boolean) { }
}

/** array of for all items */
class GetAllItemsSuccessAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS_SUCCESS;
    constructor(public payload: ISheetForAllItems[]) { }
}

/** error */
class GetAllItemsFailedAction implements Action {
    public type = ReadActionTypes.GET_ALL_ITEMS_FAILED;
    constructor(public payload: any) { }
}

//FOLDERS

/** isGlobal */
class GetAllFoldersAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS;
    constructor(public payload: boolean) { }

}

/** array of for all folders */
class GetAllFoldersSuccessAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS_SUCCESS;
    constructor(public payload: ISheetForAllFolders[]) { }
}

/** errors */
class GetAllFoldersFailedAction implements Action {
    public type = ReadActionTypes.GET_ALL_FOLDERS_FAILED;
    constructor(public payload: any) { }
}

/* #endregion */

class ClearReadSuccessesAction implements Action {
    public type = ReadActionTypes.CLEAR_READ_SUCCESSES;
    constructor(public payload: null = null) { }
}

export namespace ReadActions {
    /** data: question id */
    export const Question = QuestionAction;
    /** question */
    export const QuestionsSuccess = QuestionSuccessAction;
    /**error*/
    export const QuestionFail = QuestionActionFail;

    /** data: sheet id */
    export const QuestionSheet = QuestionSheetAction;
    /** question sheet */
    export const QuestionSheetSuccess = QuestionSheetSuccessAction;
    /**error */
    export const QuestionSheetFail = QuestionSheetFailAction

    /** isGlobal */
    export const GetAllFolders = GetAllFoldersAction; 
    /** array of for all items */
    export const GetAllFoldersSuccess = GetAllFoldersSuccessAction; 
    /** error */
    export const GetAllFoldersFailed = GetAllFoldersFailedAction;
    
    /** isGlobal */
    export const GetAllItems = GetAllItemsAction;
    /** array of for all folders */
    export const GetAllItemsSuccess = GetAllItemsSuccessAction; 
    /** errors */
    export const GetAllItemsFailed = GetAllItemsFailedAction;

    export const ClearReadSuccesses = ClearReadSuccessesAction;
};

