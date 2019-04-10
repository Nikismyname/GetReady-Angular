import { Action } from "@ngrx/store";
import { GlobalSheetActionTypes } from "../actions/global-sheet.action"; 
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';
import { IQuestionReorder } from 'src/app/services/models/question/IQuestionReorder';

export function globalSheetReducer(
    state:QsGlobalIndex = initialState,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = (action["payload"] as QsGlobalIndex);
            lsPayload.globalQuestions = lsPayload.globalQuestions.sort((a, b) => a.order - b.order);
            lsPayload.children = lsPayload.children.sort((a, b) => a.order - b.order);
            return lsPayload;
        case GlobalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = (action["payload"] as IQuestionReorder).orderings;
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.globalQuestions.slice(0);
            for (let i = 0; i < reorderings.length; i++) {
                let qId = reorderings[i][0];
                questions.filter(x => x.id === qId)[0].order = i;
            }
            reorderedState.globalQuestions = questions.sort((a, b) => a.order - b.order);
            return reorderedState;
        case GlobalSheetActionTypes.SUBDIRECTORIES_REORDER:
            let dirReorderings = action["payload"].orderings;
            console.log("DIR_REORDERINGS_",dirReorderings );
            let sReorderState = Object.assign({}, state);
            let sheets = sReorderState.children.slice(0);
            for (let i = 0; i < dirReorderings.length; i++) {
                console.log("REORDERING WITH ID: ",dirReorderings[i][0], "TO ORDER", i);
                sheets.filter(x=>x.id === dirReorderings[i][0])[0].order = i;
            }
            let finalSheets = sheets.sort((a, b) => a.order - b.order);
            console.log("FINAL SHEETS: ", finalSheets);
            sReorderState.children = finalSheets; 
            return sReorderState;
        default:
            return state;
    } 
}

let initialState: QsGlobalIndex = {
    id: 0,
    name: "Default",
    description: "Default",
    difficulty: 1,
    importance: 1,
    order: 1,
    questionSheetId: 0,
    children: [],
    globalQuestions: [],
};

export function latestIdReducer(
    state:number = initialStateLatestId,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.SAVE_LATEST_ID:
            return action["payload"]
        default:
            return state;
    } 
}

let initialStateLatestId: number = null;