import { globalSheetReducer } from "./global-sheets.reducer";
import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
} from '@ngrx/store';
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';

export interface GlobalState {
    global: {
        currentGlobalIndex: QsGlobalIndex,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentGlobalIndex: globalSheetReducer,
}