import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ReadActionTypes, ReadActions } from "../actions/read.actions";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from 'src/app/services/question-service'; 
import { ToastrService } from 'ngx-toastr';
import { createEffect } from 'src/app/utilities/effects-creators';

@Injectable() 
export class ReadEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    loadQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.getQuestionObs,
        actionType: ReadActionTypes.QUESTION,
        successActions: [ReadActions.QuestionsSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.QuestionFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()
    loadQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getQuestionSheetObs,
        actionType: ReadActionTypes.QUESTION_SHEET,
        successActions: [ReadActions.QuestionSheetSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.QuestionSheetFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()
    loadAllItems$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getAllItemsObs,
        actionType: ReadActionTypes.GET_ALL_ITEMS,
        successActions: [ReadActions.GetAllItemsSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.GetAllItemsFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()
    getAllFolders$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getAllFoldersObs,
        actionType: ReadActionTypes.GET_ALL_FOLDERS,
        successActions: [ReadActions.GetAllFoldersSuccess, ReadActions.ClearReadSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: ReadActions.GetAllFoldersFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

}