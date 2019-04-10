import { cudReducer } from "./cud.reducer";
import { readReducer } from './read.reducer';
import {
    ActionReducerMap,
} from '@ngrx/store';

export interface ICrudState {
    crud:
    {
        cud:
        {
            editQuestion: {
                success: boolean,
            },
            editQSheet: {
                success: boolean,
            },
            createQuestion: {
                success: boolean,
            },
            createQSheet: {
                success: boolean,
                createdId: number,
            },
            deleteQuestion: {
                success: boolean,
            },
            deleteQSheet: {
                success: boolean,
            },
            validationErrors: {},
        },
 
        read: {
            question: {
                success: boolean,
                question: any,
            },
            questionSheet: {
                success: boolean,
                qSheet: any,
            },
        }
    }
}

//use here if you want to add sub fields with their own reducers.
export const reducers: ActionReducerMap<any, any> = {
    cud: cudReducer,
    read: readReducer,
}