import { globalSheetReducer } from "./global-sheets.reducer";
import { copyQuestionReducer } from "./copy-question.reducer";
import { ActionReducerMap } from '@ngrx/store';
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';

export interface IGlobalState {
    global: {
        currentGlobalIndex: IQsGlobalIndex,
        copyQuestionsSuccess: boolean,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentGlobalIndex: globalSheetReducer,
    copyQuestionsSuccess: copyQuestionReducer,
}