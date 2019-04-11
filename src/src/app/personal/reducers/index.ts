import { personalSheetReducer, latestIdReducer } from "./personal-sheet.reducer";
import { ActionReducerMap } from '@ngrx/store';
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";

export interface IPersonalState {
    personal: {
        currentPersonalIndex: IQsPersonalIndex,
        latestId: number,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentPersonalIndex: personalSheetReducer,
    latestId: latestIdReducer,
}