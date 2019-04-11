import { IQsChildIndex } from './qs-child-index';
import { IQGlobalIndex } from '../question/q-global-index';

export interface IQsGlobalIndex {

    id: number;

    name: string;

    description: string;

    difficulty: number;

    importance: number;

    order: number;

    questionSheetId: number;

    children: IQsChildIndex[];

    globalQuestions: IQGlobalIndex[];

}