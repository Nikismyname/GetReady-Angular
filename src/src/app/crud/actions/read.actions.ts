import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/others/scoped-data';
import { IGlobalQuestion } from 'src/app/services/models/question/global-question';
import { IPersonalQuestion } from 'src/app/services/models/question/personal-question';
import { IQuestionSheet } from 'src/app/services/models/question-sheet/question-sheet';
import { ISheetForAllItems } from 'src/app/services/models/others/sheet-for-all-items';
import { ISheetForAllFolders } from 'src/app/services/models/others/sheet-for-all-folders';
//12 // done
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
    public readonly type = ReadActionTypes.QUESTION;
    constructor(/** data: question id */public readonly payload: IScopedData<number>) { }
}

class QuestionSuccessAction implements Action {
    public readonly type = ReadActionTypes.QUESTION_SUCCESS;
    constructor(/** question */public readonly payload: IGlobalQuestion|IPersonalQuestion) { }
}

class QuestionActionFail implements Action {
    public readonly type = ReadActionTypes.QUESTION_FAILED;
    constructor(/**error any */public readonly payload: any) { }
}
/* #endregion */

/* #region  Q Sheet */
class QuestionSheetAction implements Action {
    public readonly type = ReadActionTypes.QUESTION_SHEET;
    constructor(/** data: sheet id */public readonly payload: IScopedData<number>) { }
}

class QuestionSheetSuccessAction implements Action {
    public readonly type = ReadActionTypes.QUESTION_SHEET_SUCCESS;
    constructor(/** question sheet */public readonly payload: IQuestionSheet) { }
}

class QuestionSheetFailedAction implements Action {
    public readonly type = ReadActionTypes.QUESTION_SHEET_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}
/* #endregion */

/* #region  GET ALL  */

//ITEMS 

class GetAllItemsAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_ITEMS;
    constructor(/** isGlobal */public readonly payload: boolean) { }
}

class GetAllItemsSuccessAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_ITEMS_SUCCESS;
    constructor(/**all sheets with items*/public readonly payload: ISheetForAllItems[]) { }
}

class GetAllItemsFailedAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_ITEMS_FAILED;
    constructor(/** error any*/ public readonly payload: any) { }
}

//FOLDERS

class GetAllFoldersAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_FOLDERS;
    constructor(/** isGlobal */public readonly payload: boolean) { }
}

class GetAllFoldersSuccessAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_FOLDERS_SUCCESS;
    constructor(/** array of for all folders */public readonly payload: ISheetForAllFolders[]) { }
}

class GetAllFoldersFailedAction implements Action {
    public readonly type = ReadActionTypes.GET_ALL_FOLDERS_FAILED;
    constructor(/** errors any */ public readonly payload: any) { }
}

/* #endregion */

class ClearReadSuccessesAction implements Action {
    public readonly type = ReadActionTypes.CLEAR_READ_SUCCESSES;
    constructor(public readonly payload: null = null) { }
}

export namespace ReadActions {
    export const Question = QuestionAction;
    export const QuestionsSuccess = QuestionSuccessAction;
    export const QuestionFail = QuestionActionFail;

    export const QuestionSheet = QuestionSheetAction;
    export const QuestionSheetSuccess = QuestionSheetSuccessAction;
    export const QuestionSheetFail = QuestionSheetFailedAction

    export const GetAllFolders = GetAllFoldersAction; 
    export const GetAllFoldersSuccess = GetAllFoldersSuccessAction; 
    export const GetAllFoldersFailed = GetAllFoldersFailedAction;
    
    export const GetAllItems = GetAllItemsAction;
    export const GetAllItemsSuccess = GetAllItemsSuccessAction; 
    export const GetAllItemsFailed = GetAllItemsFailedAction;

    export const ClearReadSuccesses = ClearReadSuccessesAction;
};

export type ReadActionType
    =QuestionAction
    |QuestionSuccessAction
    | QuestionActionFail
    
    |QuestionSheetAction
    |QuestionSheetSuccessAction
    |QuestionSheetFailedAction

    |GetAllFoldersAction
    |GetAllFoldersSuccessAction
    |GetAllFoldersFailedAction

    |GetAllItemsAction
    |GetAllItemsSuccessAction
    |GetAllItemsFailedAction

    |ClearReadSuccessesAction

