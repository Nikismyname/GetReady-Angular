import { Action } from '@ngrx/store';
import { IReorderData } from 'src/app/services/models/question/question-reorder';
import { ICopyQuestionData } from 'src/app/services/models/question/copy-questions-data';
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';
//done
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
}

/* #region  Load Actions */
class GlobalSheetLoadAction implements Action {
    public readonly type = GlobalSheetActionTypes.LOAD;
    constructor(/**sheet id*/public readonly payload: number){}
}

class GlobalSheetLoadSuccessAction implements Action {
    public readonly type = GlobalSheetActionTypes.LOAD_SUCCESS;
    constructor(/**sheet id*/public readonly payload: IQsGlobalIndex){}
}

class GlobalSheetLoadFailedAction implements Action {
    public readonly type = GlobalSheetActionTypes.LOAD_FAILED;
    constructor(/**error any*/public readonly payload: any){}
}
/* #endregion */

/* #region GLOBAL_QUESTION_REORDER_ACTIONS */
class QuestionsReorderAction implements Action {
    public readonly type = GlobalSheetActionTypes.QUESTIONS_REORDER;
    constructor(/**questions reorder data*/public readonly payload: IReorderData){}
}

class QuestionsReorderSuccessAction implements Action {
    public readonly type = GlobalSheetActionTypes.QUESTIONS_REORDER_SUCCESS;
    constructor(/**void*/public readonly payload: null = null){}
}

class QuestionsReorderFailAction implements Action {
    public readonly type = GlobalSheetActionTypes.QUESTIONS_REORDER_FAILED;
    constructor(/**error any*/public readonly payload: any){}
}
/* #endregion */

/* #region  CHILD_SHEETS_REORDER_ACTION */
class SheetReorderAction implements Action {
    public readonly type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER;
    constructor(public readonly payload: IReorderData ){}
}

class SheetReorderSuccessAction implements Action {
    public readonly type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER_SUCCESS;
    constructor(/** void */public readonly payload: null = null ){}
}

class SheetReorderFailAction implements Action {
    public readonly type = GlobalSheetActionTypes.SUBDIRECTORIES_REORDER_FAILED;
    constructor(/** error any */public readonly payload: any ){}
}
/* #endregion */

/* #region  COPY QUESTIONS */
class CopyQuestionsAction implements Action {
    public readonly type = GlobalSheetActionTypes.COPY_QUESTIONS;
    constructor(public readonly payload: ICopyQuestionData){}
}

class CopyQuestionsSuccessAction implements Action {
    public readonly type = GlobalSheetActionTypes.COPY_QUESTIONS_SUCCESS;
    constructor(/** void */public readonly payload: null = null ){}
}

class CopyQuestionsFailedAction implements Action {
    public readonly type = GlobalSheetActionTypes.COPY_QUESTIONS_FAILED;
    constructor(/**error any*/public readonly payload: any){}
}
/* #endregion */

class ClearSuccessesAction implements Action {
    public readonly type = GlobalSheetActionTypes.CLEAR_SUCCESS_STATES;
    constructor(public readonly payload: null = null){}
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

    export const clearSuccesses = ClearSuccessesAction;
};

export type GlobalSheetActionType 
    =GlobalSheetLoadAction
    |GlobalSheetLoadSuccessAction
    |GlobalSheetLoadFailedAction

    |QuestionsReorderAction
    |QuestionsReorderSuccessAction
    |QuestionsReorderFailAction

    |SheetReorderAction
    |SheetReorderSuccessAction
    |SheetReorderFailAction

    |CopyQuestionsAction
    |CopyQuestionsSuccessAction
    |CopyQuestionsFailedAction

    |ClearSuccessesAction

