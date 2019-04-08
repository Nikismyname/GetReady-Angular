import { Action } from "@ngrx/store";
import { GlobalSheetActionTypes } from "../actions/global-sheet.action"; 
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';

export function globalSheetReducer(
    state:QsGlobalIndex = initialState,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = action["payload"];
            console.log("reducer here");
            console.log(lsPayload);
            return lsPayload;
        case GlobalSheetActionTypes.QUESTIONS_REORDER:
            let qrPayload = action["payload"];
            console.log(qrPayload);
            return state;
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