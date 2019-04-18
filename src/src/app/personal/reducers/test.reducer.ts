import { PersonalSheetActionTypes } from "../actions/personal-sheet.actions";
import { TestActionType } from "../actions/personal-sheet.actions"; 
//done;

export interface ITestState {
    qIdsForSheet: {
        success: boolean,
        ids: number[],
    },
    currentInd: number;
}

let initialIdsState: ITestState = {
    qIdsForSheet: {
        success: false,
        ids: [],
    },
    currentInd: 0,
}

export function testReducer(
    state: ITestState = initialIdsState,
    action: TestActionType,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_SUCCESS:
            let ids = action.payload
            let successState = Object.assign({}, state);
            successState.qIdsForSheet = { success: true, ids: ids, };
            return successState;

        case PersonalSheetActionTypes.CLEAR_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.qIdsForSheet.success = false;
            return clearState;

        case PersonalSheetActionTypes.INCREMENT_CURRENT_IND:
            let change = action.payload;
            let incState = Object.assign({}, state);
            incState.currentInd += change;
            return incState;

        case PersonalSheetActionTypes.CLEAR_CURRENT_ID_STATE:
            let clearIndState = Object.assign({}, state);
            clearIndState.currentInd = 0;
            return clearIndState;

        default:
            return state;
    }
}