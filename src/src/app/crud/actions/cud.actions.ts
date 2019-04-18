import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/others/scoped-data';
import { ICreateQuestion } from 'src/app/services/models/question/create-question';
import { IQuestionIndexWithScope } from 'src/app/services/models/question/question-index-with-scope';
import { ICreateSheet } from 'src/app/services/models/question-sheet/create-sheet';
import { ISheetIndexWithScope } from 'src/app/services/models/question-sheet/sheet-index-with-scope';
import { IEditQuestion } from 'src/app/services/models/question/edit-question';
import { IEditSheet } from 'src/app/services/models/question-sheet/edit-sheet';
//1 //done
export namespace CudActionTypes {
    export const EDIT_QUESTION = "[cud] edit-question";
    export const EDIT_QUESTION_SUCCESS = "[cud] edit-question-success";//x
    export const EDIT_QUESTION_FAILED = "[cud] edit-question-failed-validation";

    export const EDIT_Q_SHEET = "[cud] edit-q-sheet";
    export const EDIT_Q_SHEET_SUCCESS = "[cud] edit-q-sheet-success";//x
    export const EDIT_Q_SHEET_FAILED = "[cud] edit-q-sheet-failed-validation";

    export const CREATE_QUESTION = "[cud] create-question";
    export const CREATE_QUESTION_SUCCESS = "[cud] create-question-success";//x
    export const CREATE_QUESTION_FAILED = "[cud] create-question-failed-validation";

    export const CREATE_Q_SHEET = "[cud] create-q-sheet";
    export const CREATE_Q_SHEET_SUCCESS = "[cud] create-q-sheet-success"; //x
    export const CREATE_Q_SHEET_FAILED = "[cud] create-q-sheet-failed-validation";

    export const DELETE_QUESTION = "[cud] delete-question";
    export const DELETE_QUESTION_SUCCESS = "[cud] delete-question-success"; //x
    export const DELETE_QUESTION_FAILED = "[cud] delete-question-failed";

    export const DELETE_Q_SHEET = "[cud] delete-q-sheet"; 
    export const DELETE_Q_SHEET_SUCCESS = "[cud] delete-q-sheet-success";//x
    export const DELETE_Q_SHEET_FAILED = "[cud] delete-q-sheet-failed";

    export const VALIDATION_ERRORS = "[cud] validation errors";

    export const CLEAR_CUD_SUCCESSES = "[cud] clear successes";

    export const CLEAR_VALIDATION_ERRORS = "[cud] clear valdation errors";
}

/* #region CREATE*/

//QUESTION ACTIONS
class CreateQuestionAction implements Action {
    public readonly type = CudActionTypes.CREATE_QUESTION;
    constructor(public readonly payload: IScopedData<ICreateQuestion>) { }
}

class CreateQuestionSuccessAction implements Action {
    public readonly type = CudActionTypes.CREATE_QUESTION_SUCCESS;
    constructor(public readonly payload: IQuestionIndexWithScope){}
}

class CreateQuestionValidationFailedAction implements Action {
    public readonly type = CudActionTypes.CREATE_QUESTION_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}

//QUESTION SHEET ACTIONS
class CreateQSheetAction implements Action {
    public readonly type = CudActionTypes.CREATE_Q_SHEET;
    constructor(public readonly payload: IScopedData<ICreateSheet>) { }
}

class CreateQSheetSuccessAction implements Action {
    public readonly type = CudActionTypes.CREATE_Q_SHEET_SUCCESS;
    constructor(public readonly payload: ISheetIndexWithScope){}
}

class CreateQSheetValidationFailedAction implements Action {
    public readonly type = CudActionTypes.CREATE_Q_SHEET_FAILED;
    constructor(/**errors any*/public readonly payload: any) { }
}

/* #endregion */

/* #region  Edit */
//QUESTION ACTIONS
class EditQuestionAction implements Action {
    public readonly type = CudActionTypes.EDIT_QUESTION;
    constructor(public readonly payload:IScopedData<IEditQuestion>) { }
}
class EditQuestionSuccessAction implements Action {
    public readonly type = CudActionTypes.EDIT_QUESTION_SUCCESS;
    constructor(public readonly payload: IQuestionIndexWithScope){}
}

class EditQuestionFailedValidationAction implements Action {
    public readonly type = CudActionTypes.EDIT_QUESTION_FAILED;
    constructor(/** error any */public readonly payload: any) { }
}

//QUESTION SHEET ACTIONS
class EditQSheetAction implements Action {
    public readonly type = CudActionTypes.EDIT_Q_SHEET;
    constructor(public readonly payload: IScopedData<IEditSheet>) { }
}

class EditQSheetSuccessAction implements Action {
    public readonly type = CudActionTypes.EDIT_Q_SHEET_SUCCESS;
    constructor(public readonly payload: ISheetIndexWithScope){}
}

class EditQSheetFailedValidationAction implements Action {
    public readonly type = CudActionTypes.EDIT_Q_SHEET_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}
/* #endregion */

/* #region  DELETE */

//QUESTION ACTIONS
class DeleteQuestionAction implements Action {
    public readonly type = CudActionTypes.DELETE_QUESTION;
    constructor(/**question id*/public readonly payload: IScopedData<number>) { }
}

class DeleteQuestionSuccessAction implements Action {
    public readonly type = CudActionTypes.DELETE_QUESTION_SUCCESS;
    constructor(/**deleted id*/public readonly payload: number){}
}

class DeleteQuestionFailedAction implements Action {
    public readonly type = CudActionTypes.DELETE_QUESTION_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}

//QUESTION SHEET ACTIONS
class DeleteQSheetAction implements Action {
    public readonly type = CudActionTypes.DELETE_Q_SHEET;
    constructor(/**sheet id*/public readonly payload: IScopedData<number>) { }
}

class DeleteQSheetSuccessAction implements Action {
    public readonly type = CudActionTypes.DELETE_Q_SHEET_SUCCESS;
    constructor(/**deleted sheet id*/public readonly payload: number){}
}

class DeleteQSheetFailedAction implements Action {
    public readonly type = CudActionTypes.DELETE_Q_SHEET_FAILED;
    constructor(/** error any */public readonly payload: any) { }
}

/* #endregion */

class ClearCudSuccessesAction implements Action { 
    public readonly type = CudActionTypes.CLEAR_CUD_SUCCESSES;
    constructor(public readonly payload: null = null) { }
}

class ValidationErrorsAction implements Action { 
    public readonly type = CudActionTypes.VALIDATION_ERRORS;
    constructor(/** validation errors */public readonly payload: object) { }
}

class ClearValidationErrorsAction implements Action { 
    public readonly type = CudActionTypes.CLEAR_VALIDATION_ERRORS;
    constructor(public readonly payload: null = null) { }
}

export namespace CudActions {
    export const createQuestion = CreateQuestionAction;
    export const createQuestionSuccess = CreateQuestionSuccessAction;
    export const createQuestionFailed = CreateQuestionValidationFailedAction;

    export const createQSheet = CreateQSheetAction;
    export const createQSheetSuccess = CreateQSheetSuccessAction;
    export const createQSheetFailed = CreateQSheetValidationFailedAction;

    export const editQuestion = EditQuestionAction; 
    export const editQuestionSuccess = EditQuestionSuccessAction;
    export const editQuestionFailed = EditQuestionFailedValidationAction;

    export const editQSheet = EditQSheetAction; 
    export const editQSheetSuccess = EditQSheetSuccessAction;
    export const editQSheetFailed = EditQSheetFailedValidationAction;

    export const deleteQuestion = DeleteQuestionAction;
    export const deleteQuestionSuccess = DeleteQuestionSuccessAction;
    export const deleteQuestionFailed = DeleteQuestionFailedAction;

    export const deleteQSheet = DeleteQSheetAction;
    export const deleteQSheetSuccess = DeleteQSheetSuccessAction;
    export const deleteQSheetFailed = DeleteQSheetFailedAction;

    export const validationErrors = ValidationErrorsAction;
    export const clearValidationErrors = ClearValidationErrorsAction;

    export const clearCudSuccesses = ClearCudSuccessesAction;
};

export type CudActionType
    = CreateQuestionAction
    | CreateQuestionSuccessAction
    | CreateQuestionValidationFailedAction
    
    | CreateQSheetAction
    | CreateQSheetSuccessAction
    | CreateQSheetValidationFailedAction
    
    | EditQuestionAction
    | EditQuestionSuccessAction
    | EditQuestionFailedValidationAction
    
    | EditQSheetAction
    | EditQSheetSuccessAction
    | EditQSheetFailedValidationAction
    
    | DeleteQuestionAction
    | DeleteQuestionSuccessAction
    | DeleteQuestionFailedAction
    
    | DeleteQSheetAction
    | DeleteQSheetSuccessAction
    | DeleteQSheetFailedAction
    
    | ValidationErrorsAction
    | ClearValidationErrorsAction
    | ClearCudSuccessesAction;

