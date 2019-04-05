import { Action } from "@ngrx/store";
import { ReadActionTypes } from "../actions/read.actions";

export function readReducer(
    state: IReadState = initialReadState,
    action: Action,
) {
    switch (action.type) {

        case ReadActionTypes.GLOBAL_QUESTION_SUCCESS:
            let gqState = Object.assign({}, state);
            gqState.globalQuestion.success = true;
            gqState.globalQuestion.question = Object.assign({}, action["payload"]);
            return gqState;

        case ReadActionTypes.QUESTION_SHEET_SUCCESS:
            let qsState = Object.assign({}, state);
            qsState.questionSheet.success = true;
            qsState.questionSheet.qSheet = Object.assign({}, action["payload"]);
            return qsState;

        case ReadActionTypes.CLEAR_READ_STATE:
            let clearState = Object.assign({}, state);
            clearState.globalQuestion.success = false;
            clearState.questionSheet.success = false;
            return clearState;

        default:
            return state;
    }
}

interface IReadState {
    globalQuestion: {
        success: boolean,
        question: any,
    },
    questionSheet: {
        success: boolean,
        qSheet: any,
    },
}

const initialReadState: IReadState = {
    globalQuestion: {
        success: false,
        question: null,
    },
    questionSheet: {
        success: false,
        qSheet: null,
    }
}