import { Action } from "@ngrx/store";
import { CudActionTypes } from "../actions/cud.actions";

export function cudReducer(
    state: IReducerState = Object.assign({}, initialCrudState),
    action: Action,
) {
    switch (action.type) {
        case CudActionTypes.EDIT_QUESTION_SUCCESS:
            let editQState = Object.assign({}, state);
            editQState.editQuestion.success = true;
            return editQState;
        case CudActionTypes.EDIT_Q_SHEET_SUCCESS:
            let editQSState = Object.assign({}, state);
            editQSState.editQSheet.success = true;
            return editQSState;
        
        case CudActionTypes.CREATE_QUESTION_SUCCESS:
            let createQState = Object.assign({}, state);
            createQState.createQuestion.success = true;
            return createQState;
        case CudActionTypes.CREATE_Q_SHEET_SUCCESS:
            let createQSState = Object.assign({}, state);
            // createQSState.createQSheet.success = true;
            // createQSState.createQSheet.createdId = Number(action["payload"]);
            // createQSState.createQSheet.errors = ["test"];
            createQSState.createQSheet = {
                success: true,
                createdId: Number(action["payload"]),
                errors: ["test"],
            };
            return createQSState;
        
        case CudActionTypes.DELETE_QUESTION_SUCCESS:
            let delQState = Object.assign({}, state);
            delQState.deleteQuestion.success = true;
            return delQState;
        case CudActionTypes.DELETE_Q_SHEET_SUCCESS:
            let delQSState = Object.assign({}, state);
            delQSState.deleteQSheet.success = true;
            return delQSState;
        
        case CudActionTypes.CLEAR_CRUD_STATE:
            console.log("CLEEEEEEEEEEAR");
            console.log(initialCrudState);
            let newClearState = Object.assign({}, state);
            newClearState.createQSheet.success = false;
            newClearState.createQSheet.errors = [];
            newClearState.createQSheet.createdId= null,
            newClearState.createQuestion.success = false;
            newClearState.createQuestion.errors = [];

            newClearState.editQSheet.success = false;
            newClearState.editQSheet.errors = [];
            newClearState.editQuestion.success = false;
            newClearState.editQuestion.errors = [];

            newClearState.deleteQSheet.success = false;
            newClearState.deleteQuestion.success = false;
            return newClearState;
             
        default:
            return state;
    }
}

interface IReducerState {
    editQuestion: {
        success: boolean,
        errors: any[],
    },
    editQSheet: {
        success: boolean,
        errors: any[],
    },
    createQuestion: {
        success: boolean,
        errors: any[],
    },
    createQSheet: {
        success: boolean,
        createdId: number,
        errors: any[],
    },
    deleteQuestion: {
        success: boolean,
    },
    deleteQSheet: {
        success: boolean,
    },
}

const initialCrudState: IReducerState = {
    editQuestion: {
        success: false,
        errors: [],
    },
    editQSheet: {
        success: false,
        errors: [],
    },
    createQuestion: {
        success: false,
        errors: [],
    },
    createQSheet: {
        success: false,
        createdId: null,
        errors: [],
    },
    deleteQuestion: {
        success: false,
    },
    deleteQSheet: {
        success: false,
    },
}