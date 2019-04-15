export interface IQuestionSheet { 

    id: number; 
    name: string,
    description: string;
    difficulty: number; 
    importance: number;
    order: number;
    questionSheetId: number;
    userId: number;
    isGlobal: boolean;
    
}