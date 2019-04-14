import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";
import { QuestionApprovalComponent } from './components/question-approval/question-approval.component';

const routes: Routes =
    [
        {
            path: c.forFeatureRouting(c.filterQuestionsPath),
            component: QuestionApprovalComponent
        },
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }