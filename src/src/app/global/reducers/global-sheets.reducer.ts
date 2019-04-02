import { Action } from "@ngrx/store";
import { GlobalSheetActionTypes } from "../actions/global-sheet.action"; 

export function globalSheetReducer(
    state = "test",
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