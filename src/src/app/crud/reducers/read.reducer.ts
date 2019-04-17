import { Action } from "@ngrx/store";
import { ReadActionTypes } from "../actions/read.actions";
import { ISheetForAllFolders } from 'src/app/services/models/contracts/sheet-for-all-folders';
import { ISheetForAllItems } from "src/app/services/models/contracts/sheet-for-all-items";
import { IGlobalQuestion } from 'src/app/services/models/question/global-question';
import { IPersonalQuestion } from 'src/app/services/models/question/personal-question';
import { IQuestionSheet } from 'src/app/services/models/question-sheet/question-sheet';

export function readReducer(
    state: IReadState = initialReadState,
    action: Action,
) {
    switch (action.type) {

        case ReadActionTypes.QUESTION_SUCCESS:
            let gqState = Object.assign({}, state);
            gqState.question = {
                success: true,
                question: JSON.parse(JSON.stringify(action["payload"]))
            }
            // gqState.question.question = JSON.parse(JSON.stringify(action["payload"]));
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
        question: IGlobalQuestion | IPersonalQuestion,
    },
    questionSheet: {
        success: boolean,
        qSheet: IQuestionSheet,
    },
    allItems: {
        success: boolean,
        items: ISheetForAllItems[],
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