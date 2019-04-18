import { GlobalSheetActionTypes } from "../actions/global-sheet.action";
import { Action } from '@ngrx/store';
export function copyQuestionReducer(
    state: boolean = false,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.COPY_QUESTIONS_SUCCESS:
            return true;
        case GlobalSheetActionTypes.CLEAR_SUCCESS_STATES:
            return false;
        
        default:
            return state;
    }
}