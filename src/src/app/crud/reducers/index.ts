import { cudReducer, ICudState } from "./cud.reducer";
import { readReducer, IReadState } from './read.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { } from "../actions/read.actions";

export interface ICrudState {
    crud:
    {
        cud: ICudState,
        read: IReadState,
    }
}

//use here if you want to add sub fields with their own reducers.
export const reducers: ActionReducerMap<any, any> = {
    cud: cudReducer,
    read: readReducer,
}