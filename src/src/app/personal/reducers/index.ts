import { personalIndexReducer } from "./personal-sheet.reducer";
import { testReducer, ITestState } from "./test.reducer";
import {  IQuestionReviewState, reviewReducer } from "./question-review.reducer";
import { ActionReducerMap } from '@ngrx/store';
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";

export interface IPersonalState {
    personal: {
        currentPersonalIndex: IQsPersonalIndex,
        test: ITestState,
        questionReview: IQuestionReviewState,
    }
}

export const reducers: ActionReducerMap<any, any> = {
    currentPersonalIndex: personalIndexReducer,
    test: testReducer,
    questionReview: reviewReducer,
}