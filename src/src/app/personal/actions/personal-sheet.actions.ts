import { Action } from '@ngrx/store';
import { IQuestionReorder } from 'src/app/services/models/question/question-reorder';
import { INewScoreData } from 'src/app/services/models/question/new-score-data';

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

    export const CLEAR_SUCCESSES = "[PersonalSheet][test] clear successes";

    export const INCREMENT_CURRENT_IND = "[PersonalSheet][test] increment current ind";

    export const CLEAR_CURRENT_ID_STATE = "[PersonalSheet][test] clear current ind state";

    export const SAVE_LATEST_ID = "[PersonalSheet] save latest id";
}

// export const GlobalSheetLoadAction = createAction(
//    GlobalSheetActionTypes.LOAD,
//     props<{ currentGlobalIndex: QsGlobalIndex }>()
// );


/* #region  Load Actions */
class LoadAction implements Action {
    public type = PersonalSheetActionTypes.LOAD;
    public payload: number;

    constructor(
        public sheetId: number,
    ) {
        this.payload = sheetId;
    }
}

class LoadSuccessAction implements Action {
    public type = PersonalSheetActionTypes.LOAD_SUCCESS;
    public payload;

    constructor(
        public sheet: any,
    ) {
        this.payload = sheet;
    }
}

class LoadFailedAction implements Action {
    public type = PersonalSheetActionTypes.LOAD_FAILED;
    public payload;

    constructor(
        public sheet: any,
    ) {
        this.payload = sheet;
    }
}
/* #endregion */

/* #region GLOBAL_QUESTION_REORDER_ACTIONS */
class QuestionsReorderAction implements Action {
    public type = PersonalSheetActionTypes.QUESTIONS_REORDER;
    public payload: IQuestionReorder;

    constructor(
        public reorderings: IQuestionReorder,
    ) {
        this.payload = reorderings;
    }
}

class QuestionsReorderSuccessAction implements Action {
    public type = PersonalSheetActionTypes.QUESTIONS_REORDER_SUCCESS;
    public payload: any[];

    constructor(
        public reorderings: any[],
    ) {
        this.payload = reorderings;
    }
}

class QuestionsReorderFailAction implements Action {
    public type = PersonalSheetActionTypes.QUESTIONS_REORDER_FAILED;
    public payload: any[];

    constructor(
        public reorderings: any[],
    ) {
        this.payload = reorderings;
    }
}
/* #endregion */

/* #region  CHILD_SHEETS_REORDER_ACTION */
class SheetReorderAction implements Action {
    public type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}

class SheetReorderSuccessAction implements Action {
    public type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER_SUCCESS;
}

class SheetReorderFailAction implements Action {
    public type = PersonalSheetActionTypes.SUBDIRECTORIES_REORDER_FAILED;
}
/* #endregion */

/* #region  SAVE_LATEST_ID */
class SaveLatestIdAction implements Action {
    public type = PersonalSheetActionTypes.SAVE_LATEST_ID;
    public payload: [];

    constructor(
        public latestId: any,
    ) {
        this.payload = latestId;
    }
}
/* #endregion */

/* #region  GET_QUESTION_IDS_FOR_SHEET */
class GetQIdsForSheetAction implements Action {
    public type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET;
    public payload: number;

    constructor(
        public data: number,
    ) {
        this.payload = data;
    }
}

class GetQIdsForSheetSuccessAction implements Action {
    public type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_SUCCESS;
    public payload: number[];

    constructor(
        public data: number[],
    ) {
        this.payload = data;
    }
}

class GetQIdsForSheetFailedAction implements Action {
    public type = PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET_FAILED;
}

class ClearSuccessesAction implements Action {
    public type = PersonalSheetActionTypes.CLEAR_SUCCESSES;
}
/* #endregion */

/* #region  ADD_NEW_SCORE */
class AddNewScoreAction implements Action {
    public type = PersonalSheetActionTypes.ADD_NEW_SCORE;
    public payload: INewScoreData;

    constructor(
        public data: INewScoreData,
    ) {
        this.payload = data;
    }
}

class AddNewScoreSuccessAction implements Action {
    public type = PersonalSheetActionTypes.ADD_NEW_SCORE_SUCCESS;
    public payload: any = null;
}

class AddNewScoreFailedAction implements Action {
    public type = PersonalSheetActionTypes.ADD_NEW_SCORE_FALIED;
    public payload: any = null;
}
/* #endregion */


class IncrementCurrentIndexAction implements Action {
    public type = PersonalSheetActionTypes.INCREMENT_CURRENT_IND;
    public payload: number;

    constructor(
        public data: number,
    ) {
        this.payload = data;
    }
}

class ClearCurrentIndexStateAction implements Action {
    public type = PersonalSheetActionTypes.CLEAR_CURRENT_ID_STATE;
    public payload: number;

    constructor(
        public data = null,
    ) {
        this.payload = data;
    }
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

    export const clearSuccesses = ClearSuccessesAction;

    export const incrementCurrentIndex = IncrementCurrentIndexAction;

    export const saveLatestId = SaveLatestIdAction;

    export const clearCurrentIndState = ClearCurrentIndexStateAction;
};

