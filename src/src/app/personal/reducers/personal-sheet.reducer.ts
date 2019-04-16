import { Action } from "@ngrx/store";
import { PersonalSheetActionTypes } from "../actions/personal-sheet.actions";
import { CudActionTypes } from "../../crud/actions/cud.actions";
import { IQuestionReorder } from "../../services/models/question/question-reorder"
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";
import { IPQForUserReview } from 'src/app/services/models/contracts/pq-for_user-review';
import { AuthActionTypes } from 'src/app/authentication/actions/auth.actions';
import { IQuestionIndexWithScope } from 'src/app/services/models/question/question-index-with-scope';
import { IQPersonalIndex } from 'src/app/services/models/question/q-personal-index';
import { ISheetIndexWithScope } from 'src/app/services/models/question-sheet/sheet-index-with-scope';

export function personalIndexReducer(
    state: IQsPersonalIndex = initialState,
    action: Action,
) {
    switch (action.type) {

        case PersonalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = (action["payload"] as IQsPersonalIndex);
            lsPayload.personalQuestions = lsPayload.personalQuestions.sort((a, b) => a.order - b.order);
            lsPayload.children = lsPayload.children.sort((a, b) => a.order - b.order);
            return lsPayload;

        case PersonalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = (action["payload"] as IQuestionReorder).orderings;
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.personalQuestions.slice(0);
            for (let i = 0; i < reorderings.length; i++) {
                let qId = reorderings[i][0];
                questions.filter(x => x.id === qId)[0].order = i;
            }
            reorderedState.personalQuestions = questions.sort((a, b) => a.order - b.order);
            return reorderedState;

        case PersonalSheetActionTypes.SUBDIRECTORIES_REORDER:
            let dirReorderings = action["payload"].orderings;
            let sReorderState = Object.assign({}, state);
            let sheets = sReorderState.children.slice(0);
            for (let i = 0; i < dirReorderings.length; i++) {
                sheets.filter(x => x.id === dirReorderings[i][0])[0].order = i;
            }
            let finalSheets = sheets.sort((a, b) => a.order - b.order);
            sReorderState.children = finalSheets;
            return sReorderState;

        case CudActionTypes.CREATE_QUESTION_SUCCESS:
            let cqPayload = <IQuestionIndexWithScope>action["payload"];
            if (cqPayload.isGlobal === true) { return state; }
            let cqQuestions = state.personalQuestions.slice();
            cqQuestions.push(<IQPersonalIndex>cqPayload.data);
            let cqState = Object.assign({}, state);
            cqState.personalQuestions = cqQuestions;
            return cqState;
        case CudActionTypes.EDIT_QUESTION_SUCCESS:
            let payload = <IQuestionIndexWithScope>action["payload"];
            if (payload.isGlobal === true) { return state; }
            let allQuest = state.personalQuestions.slice(0);
            let question = allQuest.filter(x => x.id === payload.data.id);
            if (question.length !== 1) { return state; }
            question[0].name = payload.data.name;
            let eqstate = Object.assign({}, state);
            eqstate.personalQuestions = allQuest;
            return eqstate;
        case CudActionTypes.DELETE_QUESTION_SUCCESS:
            let qid = <Number>action["payload"];
            let delQuestions = state.personalQuestions.slice(0).filter(x => x.id !== qid);
            if (delQuestions.length < state.personalQuestions.length) {
                let delState = Object.assign({}, state);
                delState.personalQuestions = delQuestions;
                return delState;
            } else {
                return state;
            }

        case CudActionTypes.CREATE_Q_SHEET_SUCCESS:
            let csPayload = <ISheetIndexWithScope>action["payload"];
            if (csPayload.isGlobal) { return state; }
            let csState = Object.assign({}, state);
            let csSheets = csState.children.slice(0);
            csSheets.push(csPayload.data);
            csState.children = csSheets;
            return csState;
        case CudActionTypes.EDIT_Q_SHEET_SUCCESS:
            let esPayload = <ISheetIndexWithScope>action["payload"];
            if (esPayload.isGlobal) { return state; }
            let esState = Object.assign({}, state);
            let esChildren = esState.children.slice(0);
            let esChild = esChildren.filter(x => x.id === esPayload.data.id);
            if (esChild.length !== 1) { return state; }
            esChild[0].description = esPayload.data.description;
            esChild[0].name = esPayload.data.name;
            esState.children = esChildren;
            return esState;
        case CudActionTypes.DELETE_Q_SHEET_SUCCESS:
            let dsId = <number>action["payload"];
            let dChildren = state.children.slice(0);
            dChildren = dChildren.filter(x => x.id !== dsId);
            if (dChildren.length === state.children.length) {
                return state;
            }
            let dsState = Object.assign({}, state);
            dsState.children = dChildren;
            return dsState;

        case AuthActionTypes.LOGOUT:
            return null;

        default:
            return state;
    }
}

let initialState: IQsPersonalIndex = null;

export function latestIdReducer(
    state: number = initialStateLatestId,
    action: Action,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.LOAD_SUCCESS:
            let payload = (action["payload"] as IQsPersonalIndex);
            return payload.id;
        case AuthActionTypes.LOGOUT:
            return null;
        default:
            return state;
    }
}

let initialStateLatestId: number = null;

export function testReducer(
    state: testState = initialIdsState,
    action: Action,
) {
    switch (action.type) {
        case PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_SUCCESS:
            let ids = action["payload"]
            let successState = Object.assign({}, state);
            successState.qIdsForSheet = { success: true, ids: ids, };
            return successState;

        case PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS_SUCCESS:
            let gqState = Object.assign({}, state);
            gqState.questionsForReview = { success: true, questions: action["payload"] }
            return gqState;

        case PersonalSheetActionTypes.CLEAR_SUCCESSES:
            let clearState = Object.assign({}, state);
            clearState.qIdsForSheet.success = false;
            clearState.questionsForReview.success = false;
            return clearState;

        case PersonalSheetActionTypes.INCREMENT_CURRENT_IND:
            let change = action["payload"];
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

//RENEAME TEST STATE TO SOMETHING
export interface testState {
    qIdsForSheet: {
        success: boolean,
        ids: number[],
    },
    currentInd: number;

    questionsForReview: {
        success: boolean,
        questions: IPQForUserReview[],
    }
}

let initialIdsState: testState = {
    qIdsForSheet: {
        success: false,
        ids: [],
    },
    currentInd: 0,

    questionsForReview: {
        success: false,
        questions: [],
    }
} 