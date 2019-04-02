import { createAction, props, Action } from '@ngrx/store';
import { QsGlobalIndex } from 'src/app/services/models/question-sheet/qsGlobalIndex';

export namespace GlobalSheetActionTypes { 
    export const LOADED = "[GlobalSheet] loaded";
    export const LOAD = "[GlobalSheet] load";
    export const FAILED = "[GlobalSheet] failed";
}

// export const GlobalSheetLoadAction = createAction(
//    GlobalSheetActionTypes.LOAD,
//     props<{ currentGlobalIndex: QsGlobalIndex }>()
// );


class GlobalSheetLoadedAction implements Action{
    public type = GlobalSheetActionTypes.LOADED;
    public payload;
    
    constructor(
        public sheet: any,
    ) {
        this.payload = sheet;
    }
}

class GlobalSheetLoadAction implements Action{
    public type = GlobalSheetActionTypes.LOAD;
    public payload: number;
    
    constructor(
        public sheetId: number,
    ) {
        this.payload = sheetId;
    }
}

class GlobalSheetFailedAction implements Action{
    public type = GlobalSheetActionTypes.FAILED;
    public payload;
    
    constructor(
        public sheet: any,
    ) {
        this.payload = sheet;
    }
}

export namespace GlobalSheetActions { 
    export const Loaded = GlobalSheetLoadedAction;
    export const Load = GlobalSheetLoadAction;
    export const Failed = GlobalSheetFailedAction;
};

// export type GlobalSheetAction = GlobalSheetLoadAction /* | otherActionName*/


