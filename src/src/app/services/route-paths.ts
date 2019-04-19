import { Injectable } from "@angular/core";

export const secondaryColor = "#32383e";
export const primaryColor = "#272b30";
export const textFormattingMappings = [
    "<<c>> (A) -> Code Block",
    "<<e>> (F) -> Emphasis Block",
    "<<s>> (S) -> Code Inline",
    "<<em>> (G) -> Emphasis Inline",
    "<<p>> (D) -> Paragraph <T> Block",
    "Ctrl+(key) -> puts the coresponding tags around the current selection!",
    "<T> () -> Transperant, meaning inline formating can be done inside!",
];

//modules: [
// Crud maybe "crud/"
// Authentication - "auth/" not LL maybe
// Personal: "personal/"
// Global: "global/";
// Admin: "admin/"

//]

///AUTH
export const loginPath      = "auth/login"; //X
export const registerPath   = "auth/register"; //X
///---
///CRUD 
export const createSheetPath    = "crud/question-sheet/create"; //x
export const editSheetPath      = "crud/question-sheet/edit";//x
export const deleteSheetPath    = "crud/question-sheet/delete";//x

export const createQuestionPath = "crud/question/create";//x
export const editQuestionPath   = "crud/question/edit";//x
export const deleteQuestionPath = "crud/question/delete";//x
///...
///PERSONAL
export const personalQuestionSheetsPath = "personal/question-sheet";//x
export const testPath                   = "personal/test";//x
export const reviewQuestionsPath        = "personal/questions/review";//x
///...
///GLOBAL
export const globalQuestionSheetsPath    = "global/question-sheet";//x
export const viewGlobalQuestion          = "global/question/global/view";//x
export const copyQuestionsPath           = "global/question/copy";//x
///...
///ADMIN
export const filterQuestionsPath = "admin/questions/filter";//x
///...


@Injectable({
    providedIn: "root",
})
export class RoutePaths {
    ///AUTH
    public loginPath = "/" + loginPath;
    public registerPath = "/" + registerPath;
    ///...
    ///CRUD 
    public createSheetPath = "/" + createSheetPath;
    public editQuestionSheetPath = "/" + editSheetPath;
    public deleteSheetPath = "/" + deleteSheetPath;

    public createQuestionPath = "/" + createQuestionPath;
    public editQuestionPath = "/" + editQuestionPath;
    public deleteQuestionPath = "/" + deleteQuestionPath;
    ///...
    ///PERSONAL 
    public personalQuestionSheetsPath = "/" + personalQuestionSheetsPath;
    public testPath = "/" + testPath;
    public reviewQuestionsPath = "/" + reviewQuestionsPath;
    ///...
    ///GLOBAL
    public globalQuestionSheetsPath = "/" + globalQuestionSheetsPath;
    public viewGlobalQuestion = "/" + viewGlobalQuestion;
    public copyQuestionsPath = "/" + copyQuestionsPath;
    ///...
    ///ADMIN
    public filterQuestionsPath = "/" + filterQuestionsPath;
    ///...
}  

export function forFeatureRouting(path: string) {
    return path.split("/").slice(1).join("/");
}