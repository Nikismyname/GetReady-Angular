import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";
import { GlobalSheetComponent } from './components/global-sheet/global-sheet.component';
import { ViewGlobalQuestionComponent } from './components/view-global-question/view-global-question.component';
import { CopyQuestionsComponent } from './components/copy-questions/copy-questions.component';

const routes: Routes = [
    {
        path: c.forFeatureRouting(c.globalQuestionSheetsPath) + "/:id",
        component: GlobalSheetComponent,
    },
    {
        path: c.forFeatureRouting(c.viewGlobalQuestion) + "/:id",
        component: ViewGlobalQuestionComponent,
    },
    {
        path: c.forFeatureRouting(c.copyQuestionsPath) + "/:id",
        component:CopyQuestionsComponent
      },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GlobalRoutingModule { }