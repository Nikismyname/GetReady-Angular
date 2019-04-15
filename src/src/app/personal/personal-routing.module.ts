import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";

import { PersonalSheetComponent } from './components/personal-sheet/personal-sheet.component';
import { TestComponent } from './components/test/test.component';
import { ReviewQuestionsComponent } from './components/review-questions/review-questions.component';
import { PersonalSheetGuard } from '../services/data-guards/personal-sheet.guard';

const routes: Routes =
    [
        {
            path: c.forFeatureRouting(c.personalQuestionSheetsPath)+ "/:id",
            component: PersonalSheetComponent,
            canActivate: [PersonalSheetGuard]
        }, 
        {
            path: c.forFeatureRouting(c.testPath)+ "/:id/:mode",
            component: TestComponent,
        },
        {
            path: c.forFeatureRouting(c.reviewQuestionsPath),
            component: ReviewQuestionsComponent,
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule { }