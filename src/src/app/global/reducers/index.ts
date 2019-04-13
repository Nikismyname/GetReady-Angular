import {
    globalSheetReducer,
    latestIdReducer,
    copyQuestionReducer
} from "./global-sheets.reducer";
import { ActionReducerMap } from '@ngrx/store';
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';

export interface IGlobalState {
    global: {
        currentGlobalIndex: IQsGlobalIndex,
        latestId: number,
        copyQuestionsSuccess: boolean,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentGlobalIndex: globalSheetReducer,
    latestId: latestIdReducer,
    copyQuestionsSuccess: copyQuestionReducer,
}