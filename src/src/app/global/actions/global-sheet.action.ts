import { Action } from '@ngrx/store';

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

class GlobalSheetQuestionsReorderedAction implements Action {
    public type = GlobalSheetActionTypes.QUESTIONS_REORDER;
    public payload:[];

    constructor(
        public reorderings: [],
    ) {
        this.payload = reorderings;
    }
}

export namespace GlobalSheetActions {
    export const Load = GlobalSheetLoadAction;
    export const loadSuccess = GlobalSheetLoadSuccessAction;
    export const loadFail = GlobalSheetLoadFailedAction;

    export const questionsReorder = GlobalSheetQuestionsReorderedAction;
};

// export type GlobalSheetAction = GlobalSheetLoadAction /* | otherActionName*/


