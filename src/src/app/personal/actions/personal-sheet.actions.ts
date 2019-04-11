import { Action } from '@ngrx/store';
import { IQuestionReorder } from 'src/app/services/models/question/question-reorder';

export namespace PersonalSheetActionTypes {
    export const LOAD = "[PersonalSheet] load";
    export const LOAD_SUCCESS = "[PersonalSheet] loaded";
    export const LOAD_FAILED = "[PersonalSheet] failed";

    export const QUESTIONS_REORDER = "[PersonalSheet] reorder questions";
    export const QUESTIONS_REORDER_FAILED = "[PersonalSheet] reorder questions failed";
    export const QUESTIONS_REORDER_SUCCESS = "[PersonalSheet] reorder questions success";

    export const SUBDIRECTORIES_REORDER = "[PersonalSheet] reorder subdirectories";
    export const SUBDIRECTORIES_REORDER_FAILED = "[PersonalSheet] reorder subdirectories failed";
    export const SUBDIRECTORIES_REORDER_SUCCESS = "[PersonalSheet] reorder subdirectories success";

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

class SaveLatestIdAction implements Action {
    public type = PersonalSheetActionTypes.SAVE_LATEST_ID;
    public payload: [];

    constructor(
        public latestId: any,
    ) {
        this.payload = latestId;
    }
}


export namespace PersonalSheetActions {
    export const load = LoadAction;
    export const loadSuccess = LoadSuccessAction;
    export const loadFail = LoadFailedAction;

    export const questionReorder = QuestionsReorderAction;
    export const questionReorderSuccess = QuestionsReorderSuccessAction;
    export const questionReorderFail = QuestionsReorderFailAction;

    export const sheetReorder = SheetReorderAction;
    export const sheetReorderSuccess = SheetReorderSuccessAction;
    export const sheetReorderFailed = SheetReorderFailAction;

    export const SaveLatestId = SaveLatestIdAction;
};

// export type GlobalSheetAction = GlobalSheetLoadAction /* | otherActionName*/


