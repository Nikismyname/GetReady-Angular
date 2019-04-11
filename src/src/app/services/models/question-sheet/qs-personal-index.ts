import { IQPersonalIndex } from '../question/q-personal-index';
import { IQsChildIndex } from './qs-child-index';

export interface IQsPersonalIndex {

    id: number;

    name: string;

    description: string;

    difficulty: number;

    importance: number;

    order: number;

    questionSheetId: number;

    children: IQsChildIndex[];

    personalQuestions: IQPersonalIndex[];

}