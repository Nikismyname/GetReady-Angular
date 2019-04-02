import { Action } from "@ngrx/store";
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';
import { GlobalSheetActionTypes } from "../actions/global-sheet.action"; 

export function globalSheetReducer(
    state = "test",
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.LOADED:
            let payload = action["payload"];
            console.log("reducer here");
            console.log(payload);
            return payload;
        default:
            return state;
    } 
}