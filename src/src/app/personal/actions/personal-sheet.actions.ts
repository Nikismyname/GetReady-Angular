import { Action } from '@ngrx/store';
import { IReorderData } from 'src/app/services/models/question/question-reorder';
import { INewScoreData } from 'src/app/services/models/question/new-score-data';
import { IPQForUserReview } from 'src/app/services/models/others/pq-for-user-review';
import { IQsPersonalIndex } from 'src/app/services/models/question-sheet/qs-personal-index';
//done
export namespace PersonalSheetActionTypes {
    export const LOAD = "[PersonalSheet] load";
    export const LOAD_SUCCESS = "[PersonalSheet] loaded";
    export const LOAD_FAILED = "[PersonalSheet] failed";

    export const QUESTIONS_REORDER = "[PersonalSheet] reorder questions";
    /*nu*/export const QUESTIONS_REORDER_SUCCESS = "[PersonalSheet] reorder questions success";
    /*nu*/export const QUESTIONS_REORDER_FAILED = "[PersonalSheet] reorder questions failed";

    export const SUBDIRECTORIES_REORDER = "[PersonalSheet] reorder subdirectories";
    /*nu*/export const SUBDIRECTORIES_REORDER_SUCCESS = "[PersonalSheet] reorder subdirectories success";
    /*nu*/export const SUBDIRECTORIES_REORDER_FAILED = "[PersonalSheet] reorder subdirectories failed";

    export const GET_Q_IDS_FOR_SHEET = "[PersonalSheet][test] get question ids for sheet";
    export const GET_Q_IDS_FOR_SHEET_SUCCESS = "[PersonalSheet][test] get question ids for sheet success";
    export const GET_Q_IDS_FOR_SHEET_FAILED = "[PersonalSheet][test] get question ids for sheet failed";

    export const ADD_NEW_SCORE = "[PersonalSheet][test] add new score";
    export const ADD_NEW_SCORE_SUCCESS = "[PersonalSheet][test] add new score success";
    export const ADD_NEW_SCORE_FALIED = "[PersonalSheet][test] add new score failed";

    export const SUGGEST_FOR_PUBLISHING = "[PersonalSheet] suggest for publishing";
    export const SUGGEST_FOR_PUBLISHING_SUCCESS = "[PersonalSheet] suggest for publishing success";
    export const SUGGEST_FOR_PUBLISHING_FAILED = "[PersonalSheet] suggest for publishing failed";

    export const GET_ANSWERED_QUESTIONS = "[PersonalSheet] get answered questions";
    export const GET_ANSWERED_QUESTIONS_SUCCESS = "[PersonalSheet] get answered questions success";
    export const GET_ANSWERED_QUESTIONS_FAILED = "[PersonalSheet] get answered questions failed";

    export const CLEAR_SUCCESSES = "[PersonalSheet][test] clear successes";

    export const INCREMENT_CURRENT_IND = "[PersonalSheet][test] increment current ind";

    export const CLEAR_CURRENT_ID_STATE = "[PersonalSheet][test] clear current ind state";
}

// export const GlobalSheetLoadAction = createAction(
//    GlobalSheetActionTypes.LOAD,
//     props<{ currentGlobalIndex: QsGlobalIndex }>()
// );


/* #region  Load Actions */
class LoadAction implements Action {//x
    public readonly type = PersonalSheetActionTypes.LOAD;
    constructor(/**sheet id */public readonly payload: number) { }
}

class LoadSuccessAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.LOAD_SUCCESS;
    constructor(/**sheet */public readonly payload: IQsPersonalIndex) { }
}

class LoadFailedAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.LOAD_FAILED;
    constructor(/**error any */public readonly payload: any) { }
}
/* #endregion */

/* #region GLOBAL_QUESTION_REORDER_ACTIONS */
class QuestionsReorderAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.QUESTIONS_REORDER;
    constructor(/**reorderings*/public readonly payload: IReorderData) { }
}

class QuestionsReorderSuccessAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.QUESTIONS_REORDER_SUCCESS;
    constructor(/**void */public readonly payload: null = null) { }
}

class QuestionsReorderFailAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.QUESTIONS_REORDER_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}
/* #endregion */

/* #region  CHILD_SHEETS_REORDER_ACTION */
class SheetReorderAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER;
    constructor(/**reorderings */public readonly payload: IReorderData) { }
}

class SheetReorderSuccessAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER_SUCCESS;
    constructor(/**void */public readonly payload: null = null) { }
}

class SheetReorderFailAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER_FAILED;
    constructor(/**error any*/public readonly payload: any) { }
}
/* #endregion */

/* #region  GET_QUESTION_IDS_FOR_SHEET */
class GetQIdsForSheetAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET;
    constructor(/**sheet id*/public readonly payload: number) { }
}

class GetQIdsForSheetSuccessAction implements Action {//x 
    public readonly  type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_SUCCESS;
    constructor(/**qIds*/public readonly payload: number[]) { }
}

class GetQIdsForSheetFailedAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_FAILED;
    constructor(/**void */public readonly payload: null = null) { }
}
/* #endregion */

/* #region  ADD_NEW_SCORE */
class AddNewScoreAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.ADD_NEW_SCORE;
    constructor(public readonly payload: INewScoreData) { }
}

class AddNewScoreSuccessAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.ADD_NEW_SCORE_SUCCESS;
    constructor(/**void */public readonly payload: null = null) { }
}

class AddNewScoreFailedAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.ADD_NEW_SCORE_FALIED;
    constructor(/**void */public readonly payload: null = null) { }
}
/* #endregion */

/* #region  SUGGEST_FOR_PUBLISHING */
class SuggestForPublishingAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.SUGGEST_FOR_PUBLISHING;
    constructor(/**question id*/public readonly payload: number) { }
}

class SuggestForPublishingSuccessAction implements Action {//x 
    public readonly  type = PersonalSheetActionTypes.SUGGEST_FOR_PUBLISHING_SUCCESS;
    constructor(/**void */public readonly payload: null = null) { }
}

class SuggestForPublishingFailedAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.SUGGEST_FOR_PUBLISHING_FAILED;
    constructor(/**error any */public readonly payload: any ) { }
}
/* #endregion */

/* #region  GET_ANSWERED_QUESTIONS */
class GetAnsweredQuestionsAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS;
    constructor(public readonly payload: null = null) { }
}

class GetAnsweredQuestionsSuccessAction implements Action {//x 
    public readonly  type = PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS_SUCCESS;
    constructor(public readonly payload: IPQForUserReview[]) { }
}

class GetAnsweredQuestionsFailedAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS_FAILED;
    constructor(public readonly payload: any) { }
}
/* #endregion */

class IncrementCurrentIndexAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.INCREMENT_CURRENT_IND;
    constructor(/**amount can be neg */public readonly payload: number) { }
}

class ClearCurrentIndexStateAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.CLEAR_CURRENT_ID_STATE;
    constructor(public readonly payload: null = null) { }
}

class ClearSuccessesAction implements Action {//x
    public readonly  type = PersonalSheetActionTypes.CLEAR_SUCCESSES;
    constructor(/**void */public readonly payload: null = null) { }
}

export namespace PersonalSheetActions {
    export const load = LoadAction;
    export const loadSuccess = LoadSuccessAction;
    export const loadFailed = LoadFailedAction;

    export const questionReorder = QuestionsReorderAction;
    export const questionReorderSuccess = QuestionsReorderSuccessAction;
    export const questionReorderFailed = QuestionsReorderFailAction;

    export const sheetReorder = SheetReorderAction;
    export const sheetReorderSuccess = SheetReorderSuccessAction;
    export const sheetReorderFailed = SheetReorderFailAction;

    export const getQIdsForSheet = GetQIdsForSheetAction;
    export const getQIdsForSheetSuccess = GetQIdsForSheetSuccessAction;
    export const getQIdsForSheetFailed = GetQIdsForSheetFailedAction;

    export const addNewScore = AddNewScoreAction;
    export const addNewScoreSuccess = AddNewScoreSuccessAction;
    export const addNewScoreFailed = AddNewScoreFailedAction;

    export const suggestForPublishing = SuggestForPublishingAction;
    export const suggestForPublishingSuccess = SuggestForPublishingSuccessAction;
    export const suggestForPublishingFailed = SuggestForPublishingFailedAction;

    export const getAnsweredQuestions = GetAnsweredQuestionsAction;
    export const getAnsweredQuestionsSuccess = GetAnsweredQuestionsSuccessAction;
    export const getAnsweredQuestionFailed = GetAnsweredQuestionsFailedAction;

    export const clearSuccesses = ClearSuccessesAction;

    export const incrementCurrentIndex = IncrementCurrentIndexAction;

    export const clearCurrentIndState = ClearCurrentIndexStateAction;
};

export type PersonalSheetActionType
    = LoadAction
    | LoadSuccessAction
    | LoadFailedAction

    | QuestionsReorderAction
    | QuestionsReorderSuccessAction
    | QuestionsReorderFailAction
    
    | SheetReorderAction
    | SheetReorderSuccessAction
    | SheetReorderFailAction;

export type QuestionRevoewActionType
    = ClearSuccessesAction
    | GetAnsweredQuestionsSuccessAction;
    
export type TestActionType
    = GetQIdsForSheetSuccessAction
    | ClearSuccessesAction
    | IncrementCurrentIndexAction
    | ClearCurrentIndexStateAction;

