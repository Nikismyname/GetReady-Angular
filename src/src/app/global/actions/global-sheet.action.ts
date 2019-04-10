import { Action } from '@ngrx/store';
import { IQuestionReorder } from 'src/app/services/models/question/IQuestionReorder';

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

class SaveLatestIdAction implements Action {
    public type = GlobalSheetActionTypes.SAVE_LATEST_ID;
    public payload: [];

    constructor(
        public latestId: any,
    ) {
        this.payload = latestId;
    }
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

    export const SaveLatestId = SaveLatestIdAction;
};

// export type GlobalSheetAction = GlobalSheetLoadAction /* | otherActionName*/


