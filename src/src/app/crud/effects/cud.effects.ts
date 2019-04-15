import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CudActionTypes, CudActions } from "../actions/cud.actions";
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { QuestionService } from "src/app/services/question-service";
import { createEffect } from 'src/app/utilities/effects-creators';
import { ToastrService } from 'ngx-toastr';

@Injectable()//messagesX
export class CudEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()//EDIT_QUESTION
    editQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.editQuestionObs,
        actionType: CudActionTypes.EDIT_QUESTION,
        successActions: [CudActions.editQuestionSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.editQuestionFailed,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully edited question!", "Edit question failed!");

    @Effect()//EDIT_Q_SHEET
    editQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.editQuestionSheetObs,
        actionType: CudActionTypes.EDIT_Q_SHEET,
        successActions: [CudActions.editQSheetSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.validationErrors,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully edited sheet!", "Edit sheet failed!");
    
    @Effect()//CREATE_QUESTION
    createQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.createQuestionObs,
        actionType: CudActionTypes.CREATE_QUESTION,
        successActions: [CudActions.createQuestionSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.createQuestionFailed,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully created question!", "Creating question failed!");

    @Effect()//CREATE_Q_SHEET
    createQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.createQuestionSheetObs,
        actionType: CudActionTypes.CREATE_Q_SHEET,
        successActions: [CudActions.createQSheetSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: CudActions.validationErrors,
        errorAction: CudActions.createQuestionFailed,
        catchValidationErrors: true,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully created sheet!", "Creating sheet failed!");

    @Effect()//DELETE_QUESTION
    deleteQuestion$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.deleteQuestionObs,
        actionType: CudActionTypes.DELETE_QUESTION,
        successActions: [CudActions.deleteQuestionSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: CudActions.deleteQuestionFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    }, "Successfully deleted question!", "Deleting question failed!");

    @Effect()//DELETE_Q_SHEET
    deleteQuestionSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.deleteQuestionSheetObs,
        actionType: CudActionTypes.DELETE_Q_SHEET,
        successActions: [CudActions.deleteQSheetSuccess, CudActions.clearCudSuccesses],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: CudActions.deleteQSheetFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    },"Successfully deleted sheet!", "Deleting sheet failed!");
}
