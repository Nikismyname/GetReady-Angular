import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersonalSheetActionTypes, PersonalSheetActions } from "../actions/personal-sheet.actions";
import { QuestionSheetService } from "../../services/question-sheet-service";
import { createEffect } from "../../utilities/effects-creators";
import { QuestionService } from "../../services/question-service";
import { ToastrService } from 'ngx-toastr';

@Injectable()//messagesX
export class PersonalSheetEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    loadPersonalSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getPersonalIndexObs,
        actionType: PersonalSheetActionTypes.LOAD,
        successActions: [PersonalSheetActions.loadSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.loadFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, null);
    
    @Effect()
    reorderQuestions$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.reorderPersonalObs,
        actionType: PersonalSheetActionTypes.QUESTIONS_REORDER,
        successActions: [PersonalSheetActions.questionReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.questionReorderFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, "Reorder questions failed!");

    @Effect()
    reorderSheets$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.reorderPersonalSheetsObs,
        actionType: PersonalSheetActionTypes.SUBDIRECTORIES_REORDER,
        successActions: [PersonalSheetActions.sheetReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.sheetReorderFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, "Reorder sheets failed!");

    @Effect()
    getQIdsForSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getQuestionIdsForPSheetObs,
        actionType: PersonalSheetActionTypes.GET_Q_IDS_FOR_SHEET,
        successActions: [PersonalSheetActions.getQIdsForSheetSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.getQIdsForSheetFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, null)

    @Effect() 
    addNewAnserScore$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.addNewScoreObs,
        actionType: PersonalSheetActionTypes.ADD_NEW_SCORE,
        successActions: [PersonalSheetActions.addNewScoreSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.addNewScoreFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, null)

    @Effect()
    suggestForPublishing$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.suggestForPublishingObs,
        actionType: PersonalSheetActionTypes.SUGGEST_FOR_PUBLISHING,
        successActions: [PersonalSheetActions.suggestForPublishingSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.suggestForPublishingFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Siggest for publishing succeeded!", "Suggest for publishing failed!")

    @Effect()
    getAnsweredQuestions$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.getAnsweredQuestionsObs,
        actionType: PersonalSheetActionTypes.GET_ANSWERED_QUESTIONS,
        successActions: [PersonalSheetActions.getAnsweredQuestionsSuccess, PersonalSheetActions.clearSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.getAnsweredQuestionFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, null, "Get questions for review failed!")
}