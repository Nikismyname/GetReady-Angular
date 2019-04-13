import { Action } from '@ngrx/store';
import { IQuestionReorder } from 'src/app/services/models/question/question-reorder';
import { ICopyQuestionData } from 'src/app/services/models/question/copy-questions-data';

export namespace GlobalSheetActionTypes {
    export const LOAD = "[GlobalSheet] load";
    export const LOAD_SUCCESS = "[GlobalSheet] loaded";
    export const LOAD_FAILED = "[GlobalSheet] failed";

    export const QUESTIONS_REORDER = "[GlobalSheet] reorder questions";
    export const QUESTIONS_REORDER_FAILED = "[GlobalSheet] reorder questions failed";
    export const QUESTIONS_REORDER_SUCCESS = "[GlobalSheet] reorder questions success";

    export const SUBDIRECTORIES_REORDER = "[GlobalSheet] reorder subdirectories";
    export const SUBDIRECTORIES_REORDER_FAILED = "[GlobalSheet] reorder subdirectories failed";
    export const SUBDIRECTORIES_REORDER_SUCCESS = "[GlobalSheet] reorder subdirectories success";

    export const COPY_QUESTIONS = "[GlobalShet] copy questions";
    export const COPY_QUESTIONS_SUCCESS = "[GlobalShet] copy questions success";
    export const COPY_QUESTIONS_FAILED = "[GlobalShet] copy questions failed";

    export const CLEAR_SUCCESS_STATES = "[GlobalShet] clear success states";

    export const SAVE_LATEST_ID = "[GlobalSheet] save latest id";
}

// export const GlobalSheetLoadAction = createAction(
//    GlobalSheetActionTypes.LOAD,
//     props<{ currentGlobalIndex: QsGlobalIndex }>()
// );


/* #region  Load Actions */
class GlobalSheetLoadAction implements Action {
    public type = GlobalSheetActionTypes.LOAD;
    public payload: number;

    constructor(
        public sheetId: number,
    ) {
        this.payload = sheetId;
    }
}

class GlobalSheetLoadSuccessAction implements Action {
    public type = GlobalSheetActionTypes.LOAD_SUCCESS;
    public payload;

    constructor(
        public sheet: any,
    ) {
        this.payload = sheet;
    }
}

class GlobalSheetLoadFailedAction implements Action {
    public type = GlobalSheetActionTypes.LOAD_FAILED;
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
    public type = GlobalSheetActionTypes.QUESTIONS_REORDER;
    public payload: IQuestionReorder;

    constructor(
        public reorderings: IQuestionReorder,
    ) {
        this.payload = reorderings;
    }
}

class QuestionsReorderSuccessAction implements Action {
    public type = GlobalSheetActionTypes.QUESTIONS_REORDER_SUCCESS;
    public payload: any[];

    constructor(
        public reorderings: any[],
    ) {
        this.payload = reorderings;
    }
}

class QuestionsReorderFailAction implements Action {
    public type = GlobalSheetActionTypes.QUESTIONS_REORDER_FAILED;
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
    public type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER;
    public payload: any;

    constructor(
        public data: any,
    ) {
        this.payload = data;
    }
}

class SheetReorderSuccessAction implements Action {
    public type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER_SUCCESS;
}

class SheetReorderFailAction implements Action {
    public type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER_FAILED;
}
/* #endregion */

/* #region  COPY QUESTIONS */
class CopyQuestionsAction implements Action {
    public type = GlobalSheetActionTypes.COPY_QUESTIONS;
    public payload: ICopyQuestionData;

    constructor(
        public latestId: ICopyQuestionData,
    ) {
        this.payload = latestId;
    }
}

class CopyQuestionsSuccessAction implements Action {
    public type = GlobalSheetActionTypes.COPY_QUESTIONS_SUCCESS;
    public payload = null;
}

class CopyQuestionsFailedAction implements Action {
    public type = GlobalSheetActionTypes.COPY_QUESTIONS_FAILED;
    public payload: any;

    constructor(
        public error: any,
    ) {
        this.payload = error;
    }
}
/* #endregion */

class SaveLatestIdAction implements Action {
    public type = GlobalSheetActionTypes.SAVE_LATEST_ID;
    public payload: [];

    constructor(
        public latestId: any,
    ) {
        this.payload = latestId;
    }
}

class ClearSuccessesAction implements Action {
    public type = GlobalSheetActionTypes.CLEAR_SUCCESS_STATES;
    public payload = null;
}

export namespace GlobalSheetActions {
    export const load = GlobalSheetLoadAction;
    export const loadSuccess = GlobalSheetLoadSuccessAction;
    export const loadFail = GlobalSheetLoadFailedAction;

    export const globalQuestionReorder = QuestionsReorderAction;
    export const globalQuestionReorderSuccess = QuestionsReorderSuccessAction;
    export const globalQuestionReorderFail = QuestionsReorderFailAction;

    export const sheetReorder = SheetReorderAction;
    export const sheetReorderSuccess = SheetReorderSuccessAction;
    export const sheetReorderFailed = SheetReorderFailAction;

    export const copyQuestions = CopyQuestionsAction;
    export const copyQuestionsSuccess = CopyQuestionsSuccessAction;
    export const copyQuestionsFailed = CopyQuestionsFailedAction;

    export const saveLatestId = SaveLatestIdAction;

    export const clearSuccesses = ClearSuccessesAction;
};

// export type GlobalSheetAction = GlobalSheetLoadAction /* | otherActionName*/


