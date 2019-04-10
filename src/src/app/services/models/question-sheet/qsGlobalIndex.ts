import { QsChildIndex } from './qsChildIndex';
import { QIndex } from '../question/qGlobalIndex';

export class QsGlobalIndex {
    public id: number;
        
    public name: string;

    public description: string; 

    ///Should be between 1 and 10 // nullable
    public difficulty: number;

    ///Should be between 1 and 10
    public importance: number;

    public order: number;

    public questionSheetId: number;

    public children: Array<QsChildIndex>;
    public globalQuestions: Array<QIndex>;
}