import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";
import { EditQuestionSheetComponent } from './components/edit-question-sheet/edit-question-sheet.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { DeleteQuestionSheetComponent } from './components/delete-question-sheet/delete-question-sheet.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';
import { CreateQuestionSheetComponent } from './components/create-question-sheet/create-question-sheet.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionGuard3 } from '../services/data-guards/question.guard.3';
import { SheetGuard3 } from '../services/data-guards/sheet.guard.3';

const routes: Routes = [
    {
        path: c.forFeatureRouting(c.createSheetPath) + "/:parentId/:scope",
        component: CreateQuestionSheetComponent,
    },
    {
        path: c.forFeatureRouting(c.editSheetPath) + "/:id/:scope",
        component: EditQuestionSheetComponent,
        canActivate: [SheetGuard3], 
    },
    {
        path: c.forFeatureRouting(c.deleteSheetPath) + "/:id/:scope",
        component: DeleteQuestionSheetComponent,
        canActivate: [SheetGuard3],
    },

    {
        path: c.forFeatureRouting(c.createQuestionPath) + "/:parentId/:scope",
        component: CreateQuestionComponent,
    },
    {
        path: c.forFeatureRouting(c.editQuestionPath) + "/:id/:scope",
        component: EditQuestionComponent,
        canActivate:[QuestionGuard3]
    },
    {
        path: c.forFeatureRouting(c.deleteQuestionPath) + "/:id/:scope",
        component: DeleteQuestionComponent,
        canActivate: [QuestionGuard3]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CrudRoutingModule { }