import { globalSheetReducer, latestIdReducer } from "./global-sheets.reducer";
import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';

export interface IGlobalState {
    global: {
        currentGlobalIndex: IQsGlobalIndex,
        latestId: number,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentGlobalIndex: globalSheetReducer,
    latestId: latestIdReducer,
}