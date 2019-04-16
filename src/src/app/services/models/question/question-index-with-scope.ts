import { IQGlobalIndex } from './q-global-index';

export interface IQuestionIndexWithScope { 
    isGlobal: boolean; 
    data: IQGlobalIndex;
}