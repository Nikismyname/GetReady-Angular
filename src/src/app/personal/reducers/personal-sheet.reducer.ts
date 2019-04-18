import { PersonalSheetActionTypes, PersonalSheetActionType } from "../actions/personal-sheet.actions";
import { CudActionType } from "../../crud/actions/cud.actions"; 
import { CudActionTypes } from "../../crud/actions/cud.actions";
import { AuthActionType } from "../../authentication/actions/auth.actions";
import { IQsPersonalIndex } from "../../services/models/question-sheet/qs-personal-index";
import { AuthActionTypes } from 'src/app/authentication/actions/auth.actions';
import { IQPersonalIndex } from 'src/app/services/models/question/q-personal-index';
//done
let initialState: IQsPersonalIndex = null;

export function personalIndexReducer(
    state: IQsPersonalIndex = initialState,
    action: PersonalSheetActionType | CudActionType | AuthActionType,
) {
    switch (action.type) {

        case PersonalSheetActionTypes.LOAD_SUCCESS:
            let lsPayload = action.payload;
            lsPayload.personalQuestions = lsPayload.personalQuestions.sort((a, b) => a.order - b.order);
            lsPayload.children = lsPayload.children.sort((a, b) => a.order - b.order);
            return lsPayload;
        
        case PersonalSheetActionTypes.QUESTIONS_REORDER:
            let reorderings = action.payload.orderings;
            let reorderedState = Object.assign({}, state);
            let questions = reorderedState.personalQuestions.slice(0);
            for (let i = 0; i < reorderings.length; i++) {
                let qId = reorderings[i][0];
                questions.filter(x => x.id === qId)[0].order = i;
            }
            reorderedState.personalQuestions = questions.sort((a, b) => a.order - b.order);
            return reorderedState;

        case PersonalSheetActionTypes.SUBDIRECTORIES_REORDER:
            let dirReorderings = action.payload.orderings;
            let sReorderState = Object.assign({}, state);
            let sheets = sReorderState.children.slice(0);
            for (let i = 0; i < dirReorderings.length; i++) {
                sheets.filter(x => x.id === dirReorderings[i][0])[0].order = i;
            }
            let finalSheets = sheets.sort((a, b) => a.order - b.order);
            sReorderState.children = finalSheets;
            return sReorderState;

        case CudActionTypes.CREATE_QUESTION_SUCCESS:
            let cqPayload = action.payload;
            if (cqPayload.isGlobal === true) { return state; }
            let cqQuestions = state.personalQuestions.slice();
            cqQuestions.push(<IQPersonalIndex>cqPayload.data);
            let cqState = Object.assign({}, state);
            cqState.personalQuestions = cqQuestions;
            return cqState;
        case CudActionTypes.EDIT_QUESTION_SUCCESS:
            let payload = action.payload;
            if (payload.isGlobal) { return state; }
            let allQuest = state.personalQuestions.slice(0);
            let question = allQuest.filter(x => x.id === payload.data.id);
            if (question.length !== 1) { return state; }
            question[0].name = payload.data.name;
            let eqState = Object.assign({}, state);
            eqState.personalQuestions = allQuest;
            return eqState;
        case CudActionTypes.DELETE_QUESTION_SUCCESS:
            let qid = action.payload;
            let delQuestions = state.personalQuestions.slice(0).filter(x => x.id !== qid);
            if (delQuestions.length < state.personalQuestions.length) {
                let delState = Object.assign({}, state);
                delState.personalQuestions = delQuestions;
                return delState;
            } else {
                return state;
            }

        case CudActionTypes.CREATE_Q_SHEET_SUCCESS:
            let csPayload = action.payload;
            if (csPayload.isGlobal) { return state; }
            let csState = Object.assign({}, state);
            let csSheets = csState.children.slice(0);
            csSheets.push(csPayload.data);
            csState.children = csSheets;
            return csState;
        case CudActionTypes.EDIT_Q_SHEET_SUCCESS:
            let esPayload = action.payload;
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
            let dsId = action.payload;
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