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
export const loginPath      = "auth/login";
export const registerPath   = "auth/register";
///---
///CRUD 
export const createSheetPath    = "crud/question-sheet/create";
export const editSheetPath      = "crud/question-sheet/edit";
export const deleteSheetPath    = "crud/question-sheet/delete";

export const createQuestionPath = "crud/question/create";
export const editQuestionPath   = "crud/question/edit";
export const deleteQuestionPath = "crud/question/delete";
///...
///PERSONAL
export const personalQuestionSheetsPath = "personal/question-sheet";
export const testPath                   = "personal/test";
export const reviewQuestionsPath        = "personal/questions/review";
///...
///GLOBAL
export const globalQuestionSheetsPath    = "global/question-sheet";
export const viewGlobalQuestion          = "global/question/global/view";
export const copyQuestionsPath           = "global/question/copy";
///...
///ADMIN
export const filterQuestionsPath = "admin/questions/filter";
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