import { Action } from "@ngrx/store";
import { ReadActionTypes } from "../actions/read.actions";
import { IGlobalSheetForAllItems, ISheetForAllFolders } from 'src/app/services/models/contracts/for-get-all';

export function readReducer(
    state: IReadState = initialReadState,
    action: Action,
) {
    switch (action.type) {

        case ReadActionTypes.QUESTION_SUCCESS:
            let gqState = Object.assign({}, state);
            gqState.question = {success: true, question: action["payload"]};
            return gqState;

        case ReadActionTypes.QUESTION_SHEET_SUCCESS:
            let qsState = Object.assign({}, state);
            qsState.questionSheet = {success: true, qSheet: action["payload"]}; 
            return qsState;
        
        case ReadActionTypes.GET_ALL_FOLDERS_SUCCESS:
            let afState = Object.assign({}, state);
            afState.allFolders = { success: true, folders: action["payload"] };
            return afState;
            
        case ReadActionTypes.GET_ALL_ITEMS_SUCCESS:
            let aiState = Object.assign({}, state);
            aiState.allItems = { success: true, items: action["payload"] };
            return aiState;

        case ReadActionTypes.CLEAR_READ_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.question.success = false;
            clearState.questionSheet.success = false;
            clearState.allFolders.success = false;
            clearState.allItems.success = false;
            return clearState;

        default:
            return state;
    }
}

export interface IReadState {
    question: {
        success: boolean,
        question: any,
    },
    questionSheet: {
        success: boolean,
        qSheet: any,
    },
    allItems: {
        success: boolean,
        items: IGlobalSheetForAllItems[],
    }
    allFolders: {
        success: boolean,
        folders: ISheetForAllFolders[],
    }
}

const initialReadState: IReadState = {
    question: {
        success: false,
        question: null,
    },
    questionSheet: {
        success: false,
        qSheet: null,
    },
    allItems: {
        success: false,
        items: null,
    },
    allFolders: {
        success: false, 
        folders: null,
    }
}