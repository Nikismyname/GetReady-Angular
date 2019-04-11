import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PersonalSheetActionTypes, PersonalSheetActions } from "../actions/personal-sheet.actions";
import { QuestionSheetService } from "../../services/question-sheet-service";
import { createEffect } from "../../services/effects.services";
import { QuestionService } from "../../services/question-service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
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
        errorAction: PersonalSheetActions.loadFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });
    
    @Effect()
    reorderQuestions$: Observable<any> = createEffect({
        actions: this.actions,
        serviceMethod: this.questionService.reorderPersonalObs,
        actionType: PersonalSheetActionTypes.QUESTIONS_REORDER,
        successActions: [PersonalSheetActions.questionReorderSuccess],
        toastr: this.toastr,
        validationErrorAction: null,
        errorAction: PersonalSheetActions.questionReorderFail,
        catchValidationErrors: false,
        catchGeneralErrors: true,
        useToastrForGErr: true,
    });

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
    });
}