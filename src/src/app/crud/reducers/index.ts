import { cudReducer } from "./cud.reducer";
import { readReducer } from './read.reducer';
import {
    ActionReducerMap,
} from '@ngrx/store';

export interface CrudState {
    crud:
    {
        cud:
        {
            editQuestion: {
                success: boolean,
                errors: any,
            },
            editQSheet: {
                success: boolean,
                errors: any,
            },
            createQuestion: {
                success: boolean,
                errors: any,
            },
            createQSheet: {
                success: boolean,
                errors: any,
            },
            deleteQuestion: {
                success: boolean,
            },
            deleteQSheet: {
                success: boolean,
            },
        }

        read: {
            globalQuestion: {
                success: boolean,
                question: any,
            }
        }
    }
}

//use here if you want to add sub fields with their own reducers.
export const reducers: ActionReducerMap<any, any> = {
    cud: cudReducer,
    read: readReducer,
}