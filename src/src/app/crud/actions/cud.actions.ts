import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/scoped-data';

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

/* #region  Edit */
//QUESTION ACTIONS
class EditQuestionAction implements Action {
    public type = CudActionTypes.EDIT_QUESTION;
    public payload: any;

    constructor(
        public editDaya: any,
    ) {
        this.payload = editDaya;
    }
}

class EditQuestionSuccessAction implements Action {
    public type = CudActionTypes.EDIT_QUESTION_SUCCESS;
    constructor(public payload: any){}
}

class EditQuestionFailedValidationAction implements Action {
    public type = CudActionTypes.EDIT_QUESTION_FAILED;
    public payload: any;

    constructor(
        public errors: any,
    ) {
        this.payload = errors;
    }
}

//QUESTION SHEET ACTIONS
class EditQSheetAction implements Action {
    public type = CudActionTypes.EDIT_Q_SHEET;
    public payload: IScopedData;

    constructor(
        public editDaya: IScopedData,
    ) {
        this.payload = editDaya;
    }
}

class EditQSheetSuccessAction implements Action {
    public type = CudActionTypes.EDIT_Q_SHEET_SUCCESS;
    constructor(public payload: any){}
}

class EditQSheetFailedValidationAction implements Action {
    public type = CudActionTypes.EDIT_Q_SHEET_FAILED;
    public payload: any;

    constructor(
        public errors: any,
    ) {
        this.payload = errors;
    }
}
/* #endregion */

/* #region CREATE*/

//QUESTION ACTIONS
class CreateQuestionAction implements Action {
    public type = CudActionTypes.CREATE_QUESTION;
    public payload: any;

    constructor(
        public createData: any,
    ) {
        this.payload = createData;
    }
}

class CreateQuestionSuccessAction implements Action {
    public type = CudActionTypes.CREATE_QUESTION_SUCCESS;
    constructor(public payload: any){}
}

class CreateQuestionValidationFailedAction implements Action {
    public type = CudActionTypes.CREATE_QUESTION_FAILED;
    public payload: any;

    constructor(
        public errors: any,
    ) {
        this.payload = errors;
    }
}

//QUESTION SHEET ACTIONS
class CreateQSheetAction implements Action {
    public type = CudActionTypes.CREATE_Q_SHEET;
    public payload: IScopedData;

    constructor(
        public createData: IScopedData,
    ) {
        this.payload = createData;
    }
}

class CreateQSheetSuccessAction implements Action {
    public type = CudActionTypes.CREATE_Q_SHEET_SUCCESS;
    constructor(public payload: any){}
}

class CreateQSheetValidationFailedAction implements Action {
    public type = CudActionTypes.CREATE_Q_SHEET_FAILED;
    public payload: any;

    constructor(
        public errors: any,
    ) {
        this.payload = errors;
    }
}

/* #endregion */


/* #region  DELETE */

//QUESTION ACTIONS
class DeleteQuestionAction implements Action {
    public type = CudActionTypes.DELETE_QUESTION;
    public payload: any;

    constructor(
        public deleteData: any,
    ) {
        this.payload = deleteData;
    }
}

class DeleteQuestionSuccessAction implements Action {
    public type = CudActionTypes.DELETE_QUESTION_SUCCESS;
    constructor(public payload: any){}
}

class DeleteQuestionFailedAction implements Action {
    public type = CudActionTypes.DELETE_QUESTION_FAILED;
}

//QUESTION SHEET ACTIONS
class DeleteQSheetAction implements Action {
    public type = CudActionTypes.DELETE_Q_SHEET;
    public payload: any;

    constructor(
        public deleteData: any,
    ) {
        this.payload = deleteData;
    }
}

class DeleteQSheetSuccessAction implements Action {
    public type = CudActionTypes.DELETE_Q_SHEET_SUCCESS;
    constructor(private payload: any){}
}

class DeleteQSheetFailedAction implements Action {
    public type = CudActionTypes.DELETE_Q_SHEET_FAILED;
}
/* #endregion */

class ClearCudSuccessesAction implements Action { 
    public type = CudActionTypes.CLEAR_CUD_SUCCESSES;
}

class ValidationErrorsAction implements Action { 
    public type = CudActionTypes.VALIDATION_ERRORS;
    public payload: object;

    constructor(
        public errors: object,
    ) {
        this.payload = errors;
    }
}

class ClearValidationErrorsAction implements Action { 
    public type = CudActionTypes.CLEAR_VALIDATION_ERRORS;
}

export namespace CudActions {

    export const clearCudSuccesses = ClearCudSuccessesAction;

    export const validationErrors = ValidationErrorsAction;
    export const clearValidationErrors = ClearValidationErrorsAction;

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
};

