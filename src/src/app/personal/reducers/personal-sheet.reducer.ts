import { Action } from "@ngrx/store";
import { PersonalSheetActionTypes } from "../actions/personal-sheet.actions";
import { IQuestionReorder } from "../../services/models/question/question-reorder"
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";

export function personalIndexReducer(
    state: IQsPersonalIndex = initialState,
    action: Action,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = (action["payload"] as IQsPersonalIndex);
            lsPayload.personalQuestions = lsPayload.personalQuestions.sort((a, b) => a.order - b.order);
            lsPayload.children = lsPayload.children.sort((a, b) => a.order - b.order);
            return lsPayload;
        case PersonalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = (action["payload"] as IQuestionReorder).orderings;
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.personalQuestions.slice(0);
            for (let i = 0; i < reorderings.length; i++) {
                let qId = reorderings[i][0];
                questions.filter(x => x.id === qId)[0].order = i;
            }
            reorderedState.personalQuestions = questions.sort((a, b) => a.order - b.order);
            return reorderedState;
        case PersonalSheetActionTypes.SUBDIRECTORIES_REORDER:
            let dirReorderings = action["payload"].orderings;
            let sReorderState = Object.assign({}, state);
            let sheets = sReorderState.children.slice(0);
            for (let i = 0; i < dirReorderings.length; i++) {
                sheets.filter(x => x.id === dirReorderings[i][0])[0].order = i;
            }
            let finalSheets = sheets.sort((a, b) => a.order - b.order);
            sReorderState.children = finalSheets;
            return sReorderState;
        default:
            return state;
    }
}

let initialState: IQsPersonalIndex = {
    id: 0,
    name: "Default",
    description: "Default",
    difficulty: 1,
    importance: 1,
    order: 1,
    questionSheetId: 0,
    children: [],
    personalQuestions: [],
};

export function latestIdReducer(
    state: number = initialStateLatestId,
    action: Action,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.SAVE_LATEST_ID:
            return action["payload"]
        default:
            return state;
    }
}

let initialStateLatestId: number = null;

export function testReducer(
    state: testState = initialIdsState,
    action: Action,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_SUCCESS:
            let ids = action["payload"]
            let successState = Object.assign({}, state);
            successState.qIdsForSheet =  { success: true, ids: ids, };
            return successState;
        case PersonalSheetActionTypes.CLEAR_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.qIdsForSheet.success = false;
            return clearState;
        default:
            return state;
    }
}

export interface testState {
    qIdsForSheet: {
        success: boolean,
        ids: number[],
    },
    currentInd: number;
}

let initialIdsState: testState = {
    qIdsForSheet: {
        success: false,
        ids: [],
    },
    currentInd: 0,
} 