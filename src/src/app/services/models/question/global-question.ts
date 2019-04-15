export interface IGlobalQuestion { 
    id: number;
    name: string;
    question: string;
    answer: string;
    comment: string;
    difficulty: number;
    order: number;
    approved: boolean;
    derivedFromId: number;
    questionSheetId: number;
}