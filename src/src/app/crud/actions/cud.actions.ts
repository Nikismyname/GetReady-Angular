import { Action } from '@ngrx/store';
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';

export namespace CudActionTypes {
    export const EDIT_QUESTION = "[crud] edit-question";
    export const EDIT_QUESTION_SUCCESS = "[crud] edit-sheet-question";
    export const EDIT_QUESTION_FAILED = "[crud] edit-question-failed-validation";

    export const EDIT_Q_SHEET = "[crud] edit-q-sheet";
    export const EDIT_Q_SHEET_SUCCESS = "[crud] edit-q-sheet-success";
    export const EDIT_Q_SHEET_FAILED = "[crud] edit-q-sheet-failed-validation";

    export const CREATE_QUESTION = "[crud] create-question";
    export const CREATE_QUESTION_SUCCESS = "[crud] create-question-success";
    export const CREATE_QUESTION_FAILED = "[crud] create-question-failed-validation";

    export const CREATE_Q_SHEET = "[crud] create-q-sheet";
    export const CREATE_Q_SHEET_SUCCESS = "[crud] create-q-sheet-success";
    export const CREATE_Q_SHEET_FAILED = "[crud] create-q-sheet-failed-validation";

    export const DELETE_QUESTION = "[crud] delete-question";
    export const DELETE_QUESTION_SUCCESS = "[crud] delete-question-success";
    export const DELETE_QUESTION_FAILED = "[crud] delete-question-failed";

    export const DELETE_Q_SHEET = "[crud] delete-q-sheet";
    export const DELETE_Q_SHEET_SUCCESS = "[crud] delete-q-sheet-success";
    export const DELETE_Q_SHEET_FAILED = "[crud] delete-q-sheet-failed";

    export const VALIDATION_ERRORS = "[crud] validation errors";

    export const CLEAR_CRUD_STATE = "[crud] clear";
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
    public payload: any;

    constructor(
        public createdId: any,
    ) {
        this.payload = createdId;
    }
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
}

class DeleteQSheetFailedAction implements Action {
    public type = CudActionTypes.DELETE_Q_SHEET_FAILED;
}
/* #endregion */

class ClearCrudStateAction implements Action { 
    public type = CudActionTypes.CLEAR_CRUD_STATE;
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

export namespace CudActions {

    export const clearState = ClearCrudStateAction;

    export const validationErrors = ValidationErrorsAction;

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

