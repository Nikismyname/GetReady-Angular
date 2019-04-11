import { personalIndexReducer, latestIdReducer, testReducer, testState } from "./personal-sheet.reducer";
import { ActionReducerMap } from '@ngrx/store';
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";



export interface IPersonalState {
    personal: {
        currentPersonalIndex: IQsPersonalIndex,
        latestId: number,
        test: testState,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentPersonalIndex: personalIndexReducer,
    latestId: latestIdReducer,
    test: testReducer,
}