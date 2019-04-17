import { Action } from "@ngrx/store";
import { CudActionTypes } from "../actions/cud.actions";

export function cudReducer(
    state: ICudState = Object.assign({}, initialCrudState),
    action: Action,
) {
    switch (action.type) {
        //EDIT
        case CudActionTypes.EDIT_QUESTION_SUCCESS:
            let editQState = Object.assign({}, state);
            editQState.editQuestion = Object.assign({}, editQState.editQuestion, {success: true});
            return editQState;
        case CudActionTypes.EDIT_Q_SHEET_SUCCESS:
            let editQSState = Object.assign({}, state);
            editQSState.editQSheet = Object.assign({}, editQSState.editQSheet, {success: true});
            return editQSState;
        //CREATE
        case CudActionTypes.CREATE_QUESTION_SUCCESS:
            let createQState = Object.assign({}, state);
            createQState.createQuestion = Object.assign({}, createQState.createQuestion, {success: true});
            return createQState;
        case CudActionTypes.CREATE_Q_SHEET_SUCCESS:
            let createQSState = Object.assign({}, state);
            createQSState.createQSheet = Object.assign({}, createQSState.createQSheet, {
                success: true,
                createdId: Number(action["payload"]),
            });
            return createQSState;
        //DELETE
        case CudActionTypes.DELETE_QUESTION_SUCCESS:
            let delQState = Object.assign({}, state);
            delQState.deleteQuestion = Object.assign({}, delQState.deleteQuestion, {success: true});
            return delQState;
        case CudActionTypes.DELETE_Q_SHEET_SUCCESS:
            let delQSState = Object.assign({}, state);
            delQSState.deleteQSheet = Object.assign({}, delQSState.deleteQSheet, {success: true} );
            return delQSState;
        //ERRORS
        case CudActionTypes.VALIDATION_ERRORS:
            console.log("VALIDATION_ERRORS_REDUCED");
            let valErrorState = Object.assign({}, state);
            valErrorState.validationErrors = action["payload"];
            return valErrorState;
        //CLEAR Just The Success States.
        case CudActionTypes.CLEAR_CUD_SUCCESSES:
            let newClearState = Object.assign({}, state);
            newClearState.createQSheet.success = false;
            newClearState.createQSheet.createdId = null;
            newClearState.createQuestion.success = false;

            newClearState.editQSheet.success = false;
            newClearState.editQuestion.success = false;

            newClearState.deleteQSheet.success = false;
            newClearState.deleteQuestion.success = false;

            return newClearState;
        case CudActionTypes.CLEAR_VALIDATION_ERRORS:
            let clearVEState = Object.assign({}, state);
            clearVEState.validationErrors = {};
            return clearVEState;
        default:
            return state;
    }
}

export interface ICudState {
    editQuestion: {
        success: boolean,
    },
    editQSheet: {
        success: boolean,
    },
    createQuestion: {
        success: boolean,
    },
    createQSheet: {
        success: boolean,
        createdId: number,
    },
    deleteQuestion: {
        success: boolean,
    },
    deleteQSheet: {
        success: boolean,
    },
    validationErrors: object,
}

const initialCrudState: ICudState = {
    editQuestion: {
        success: false,
    },
    editQSheet: {
        success: false,
    },
    createQuestion: {
        success: false,
    },
    createQSheet: {
        success: false,
        createdId: null,
    },
    deleteQuestion: {
        success: false,
    },
    deleteQSheet: {
        success: false,
    },
    validationErrors: {},
}