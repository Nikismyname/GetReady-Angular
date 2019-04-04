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
        case ReadActionTypes.CLEAR_READ_STATE:
            let clearState = Object.assign({}, state);
            clearState.globalQuestion.success = false;
            return clearState;
        default:
            return state;
    }
}

interface IReadState {
    globalQuestion: {
        success: boolean,
        question: any,
    }
}

const initialReadState: IReadState = {
    globalQuestion: {
        success: false,
        question: null,
    }
}