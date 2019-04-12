import { IQGlobalIndex } from '../question/q-global-index';

export interface ISheetForAllFolders{

    id: number, 

    name: string,

    questionSheetId: number,

}

export interface IGlobalSheetForAllItems{

    id: number, 

    name: string,

    questionSheetId: number,

    globalQuestions: IQGlobalIndex[],
    
}

