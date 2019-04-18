import { PersonalSheetActionTypes } from "../actions/personal-sheet.actions";
import { IPQForUserReview } from 'src/app/services/models/others/pq-for-user-review';
import { QuestionRevoewActionType } from "../actions/personal-sheet.actions";
//done
export interface IQuestionReviewState {
    success: boolean,
    questions: IPQForUserReview[],
}

let initialReviewState: IQuestionReviewState = {
    success: false,
    questions: [],
}

export function reviewReducer(
    state: IQuestionReviewState = initialReviewState,
    action: QuestionRevoewActionType,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS_SUCCESS:
            return  { success: true, questions: action.payload }

        case PersonalSheetActionTypes.CLEAR_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.success = false;
            return clearState;

        default:
            return state;
    }
}