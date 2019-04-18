import { IQGlobalIndex } from '../question/q-global-index';

export interface ISheetForAllItems {

    id: number;

    name: string;

    questionSheetId: number;

    globalQuestions: IQGlobalIndex[];

}
