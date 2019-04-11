import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalSheetActionTypes, GlobalSheetActions } from "../actions/global-sheet.action";
import { QuestionSheetService } from "../../services/question-sheet-service";
import { createEffect } from "../../services/effects.services";
import { QuestionService } from "../../services/question-service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalSheetEffects {

    constructor(
        private actions: Actions,
        private questionSheetService: QuestionSheetService,
        private questionService: QuestionService,
        private toastr: ToastrService,
    ) { }

    @Effect()
    loadGlobalSheet$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.getGlobalIndexObs,
        actionType: GlobalSheetActionTypes.LOAD,
        successActions: [GlobalSheetActions.loadSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: GlobalSheetActions.loadFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });
    
    @Effect()
    reorderQuestions$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.reorderGlobalObs,
        actionType: GlobalSheetActionTypes.QUESTIONS_REORDER,
        successActions: [GlobalSheetActions.globalQuestionReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: GlobalSheetActions.globalQuestionReorderFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

    @Effect()
    reorderSheets$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionSheetService.reorderGlobalSheetsObs,
        actionType: GlobalSheetActionTypes.SUBDIRECTORIES_REORDER,
        successActions: [GlobalSheetActions.sheetReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: GlobalSheetActions.sheetReorderFailed,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });
}