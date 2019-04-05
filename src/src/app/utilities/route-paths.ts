export const secondaryColor = "#32383e";
export const primaryColor = "#272b30";

export const loginPath = "login";
export const registerPath = "register";
export const createQuestionPath = "question/create";
export const globalQuestionSheetsPath = "question-sheet/global";
export const personalQuestionSheetsPath = "question-sheet/personal";
export const createSheetPath = "question-sheet/create";
export const viewGlobalQuestion = "question/global/view";
export const copyQuestionsPath = "question/copy";
export const editQuestionPath = "question/edit";
export const editQuestionSheetPath = "question-sheet/edit";
export const testPath = "test";
export const filterQuestionsPath = "questions/filter";
export const reviewQuestionsPath = "questions/review";
import { Injectable } from "@angular/core";

export const textFormattingMappings = [
    "<<c>> (A) -> Code Block",
    "<<e>> (F) -> Emphasis Block",
    "<<s>> (S) -> Code Inline",
    "<<em>> (G) -> Emphasis Inline",
    "<<p>> (D) -> Paragraph <T> Block",
    "Ctrl+(key) -> puts the coresponding tags around the current selection!",
    "<T> () -> Transperant, meaning inline formating can be done inside!",
];


@Injectable()
export class RoutePaths {
    public loginPath = "/" + loginPath;
    public registerPath = "/" + registerPath;
    public createQuestionPath = "/" + createQuestionPath;
    public globalQuestionSheetsPath = "/" + globalQuestionSheetsPath;
    public personalQuestionSheetsPath = "/" + personalQuestionSheetsPath;
    public createSheetPath = "/" + createSheetPath;
    public viewGlobalQuestion = "/" + viewGlobalQuestion;
    public copyQuestionsPath = "/" + copyQuestionsPath;
    public editQuestionPath = "/" + editQuestionPath;
    public editQuestionSheetPath = "/" + editQuestionSheetPath;
    public testPath = "/" + testPath;
    public filterQuestionsPath = "/" + filterQuestionsPath;
    public reviewQuestionsPath = "/" + reviewQuestionsPath;
}  