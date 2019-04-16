import { Action } from "@ngrx/store";
import { GlobalSheetActionTypes } from "../actions/global-sheet.action";
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';
import { IQuestionReorder } from 'src/app/services/models/question/question-reorder';
import { AuthActionTypes } from 'src/app/authentication/actions/auth.actions';
import { CudActionTypes } from "../../crud/actions/cud.actions";
import { IQuestionIndexWithScope } from 'src/app/services/models/question/question-index-with-scope';
import { ISheetIndexWithScope } from 'src/app/services/models/question-sheet/sheet-index-with-scope';

export function globalSheetReducer(
    state: IQsGlobalIndex = initialState,
    action: Action,
) {
    switch (action.type) {
        //LOAD INDEX
        case GlobalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = (action["payload"] as IQsGlobalIndex);
            lsPayload.globalQuestions = lsPayload.globalQuestions.sort((a, b) => a.order - b.order);
            lsPayload.children = lsPayload.children.sort((a, b) => a.order - b.order);
            return lsPayload;
        
        //REORDER
        case GlobalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = (action["payload"] as IQuestionReorder).orderings;
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.globalQuestions.slice(0);
            for (let i = 0; i < reorderings.length; i++) {
                let qId = reorderings[i][0];
                questions.filter(x => x.id === qId)[0].order = i;
            }
            reorderedState.globalQuestions = questions.sort((a, b) => a.order - b.order);
            return reorderedState;
        case GlobalSheetActionTypes.SUBDIRECTORIES_REORDER:
            let dirReorderings = action["payload"].orderings;
            console.log("DIR_REORDERINGS_", dirReorderings);
            let sReorderState = Object.assign({}, state);
            let sheets = sReorderState.children.slice(0);
            for (let i = 0; i < dirReorderings.length; i++) {
                console.log("REORDERING WITH ID: ", dirReorderings[i][0], "TO ORDER", i);
                sheets.filter(x => x.id === dirReorderings[i][0])[0].order = i;
            }
            let finalSheets = sheets.sort((a, b) => a.order - b.order);
            console.log("FINAL SHEETS: ", finalSheets);
            sReorderState.children = finalSheets;
            return sReorderState;
        
        //QUESTION_UPDATE
        case CudActionTypes.CREATE_QUESTION_SUCCESS:
            let cqPayload = <IQuestionIndexWithScope>action["payload"];
            if (cqPayload.isGlobal === false) { return state; }
            let cqQuestions = state.globalQuestions.slice();
            cqQuestions.push(cqPayload.data);
            let cqState = Object.assign({}, state);
            cqState.globalQuestions = cqQuestions;
            return cqState;
        case CudActionTypes.EDIT_QUESTION_SUCCESS:
            let payload = <IQuestionIndexWithScope>action["payload"];
            if (payload.isGlobal === false) { return state; }
            let allQuest = state.globalQuestions.slice(0);
            let question = allQuest.filter(x => x.id === payload.data.id);
            if (question.length !== 1) { return state; }
            question[0].name = payload.data.name;
            let eqstate = Object.assign({}, state);
            eqstate.globalQuestions = allQuest;
            return eqstate;
        case CudActionTypes.DELETE_QUESTION_SUCCESS:
            let qid = <Number>action["payload"];
            let delQuestions = state.globalQuestions.slice(0).filter(x => x.id !== qid);
            if (delQuestions.length < state.globalQuestions.length) {
                let delState = Object.assign({}, state);
                delState.globalQuestions = delQuestions; 
                return delState;
            } else {
                return state;
            }

        //SHEET_UPDATE
        case CudActionTypes.CREATE_Q_SHEET_SUCCESS:
            let csPayload = <ISheetIndexWithScope>action["payload"];
            if (!csPayload.isGlobal) { return state; }
            let csState = Object.assign({}, state);
            let csSheets = csState.children.slice(0);
            csSheets.push(csPayload.data);
            csState.children = csSheets;
            return csState;
        case CudActionTypes.EDIT_Q_SHEET_SUCCESS:
            let esPayload = <ISheetIndexWithScope>action["payload"];
            if (!esPayload.isGlobal) { return state; }
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

        default:
            return state;
    }
}

let initialState: IQsGlobalIndex = null;

export function latestIdReducer(
    state: number = initialStateLatestId,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.LOAD_SUCCESS:
            let payload = (action["payload"] as IQsGlobalIndex);
            return payload.id;
        case AuthActionTypes.LOGOUT:
            return null;
        default:
            return state;
    }
}

let initialStateLatestId: number = null;

export function copyQuestionReducer(
    state: boolean = false,
    action: Action,
) {
    switch (action.type) {
        case GlobalSheetActionTypes.COPY_QUESTIONS_SUCCESS:
            return true;
        case GlobalSheetActionTypes.CLEAR_SUCCESS_STATES:
            return false;
    }
}