export interface IPersonalQuestion { 
    id: number;
    name: string;
    question: string;
    answer: string;
    comment: string;
    difficulty: number;
    order: number;
    answerRate: number;
    timesBeingAnswered: number; 
    yourBestAnswer: string;
    latestScores: string;
    derivedFromId: number;
    questionSheetId: number;
}