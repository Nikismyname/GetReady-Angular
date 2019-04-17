import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";
import { GlobalSheetComponent } from './components/global-sheet/global-sheet.component';
import { ViewGlobalQuestionComponent } from './components/view-global-question/view-global-question.component';
import { CopyQuestionsComponent } from './components/copy-questions/copy-questions.component';
import { PublicSheetGuard } from '../services/data-guards/public-sheet.guard';
import { AllFoldersGuard } from '../services/data-guards/all-folders.guard';
import { AllItemsGuard } from '../services/data-guards/all-items.guard';
import { QuestionGuard3 } from '../services/data-guards/question.guard.3';
//guarded
const routes: Routes = [
    {
        path: c.forFeatureRouting(c.globalQuestionSheetsPath) + "/:id",
        component: GlobalSheetComponent,
        canActivate: [PublicSheetGuard],
    },
    {
        path: c.forFeatureRouting(c.viewGlobalQuestion) + "/:id",
        component: ViewGlobalQuestionComponent,
        canActivate: [QuestionGuard3],
        data: {isGlobal: true}
    },
    {
        path: c.forFeatureRouting(c.copyQuestionsPath) + "/:id",
        component: CopyQuestionsComponent,
        canActivate: [AllFoldersGuard, AllItemsGuard], 
        data: {folders: false, items: true}
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GlobalRoutingModule { }