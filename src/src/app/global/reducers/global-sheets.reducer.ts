import { Action } from "@ngrx/store";
import { GlobalSheetActionTypes } from "../actions/global-sheet.action"; 
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';
import { IQuestionReorder } from 'src/app/services/models/question/IQuestionReorder';

export function globalSheetReducer(
    state:QsGlobalIndex = initialState,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = action["payload"];
            return lsPayload;
        case GlobalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = (action["payload"] as IQuestionReorder).orderings;
            console.log("REORDERINGS_",reorderings);
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.globalQuestions;
            let questionsRef = questions.slice(0);

            for (let i = 0; i < questions.length; i++) {
                let refQuestion = questionsRef[i];
                questions[i].order = reorderings.indexOf(refQuestion.order);
            }

            reorderedState.globalQuestions = questions;
            return reorderedState;;
        default:
            return state;
    } 
}

let initialState: QsGlobalIndex = {
    id: 0,
    name: "Default",
    description: "Default",
    difficulty: 1,
    importance: 1,
    order: 1,
    questionSheetId: 0,
    children: [],
    globalQuestions: [],
};

export function latestIdReducer(
    state:number = initialStateLatestId,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.SAVE_LATEST_ID:
            return action["payload"]
        default:
            return state;
    } 
}

let initialStateLatestId: number = null;