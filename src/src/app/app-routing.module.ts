import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalSheetComponent } from "./global/components/global-sheet/global-sheet.component";
import { LoginComponent } from "./authentication/components/login/login.component";
import { RegisterComponent } from "./authentication/components/register/register.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { ViewGlobalQuestionComponent } from "./global/components/view-global-question/view-global-question.component";
import { EditQuestionComponent } from "./crud/components/edit-question/edit-question.component";
import { EditQuestionSheetComponent } from "./crud/components/edit-question-sheet/edit-question-sheet.component";
import { CreateQuestionSheetComponent } from "./crud/components/create-question-sheet/create-question-sheet.component";
import { DeleteQuestionSheetComponent } from "./crud/components/delete-question-sheet/delete-question-sheet.component"; 
import { DeleteQuestionComponent } from "./crud/components/delete-question/delete-question.component";
import { CreateQuestionComponent } from "./crud/components/create-question/create-question.component";
import { PersonalSheetComponent } from "./personal/components/personal-sheet/personal-sheet.component";
import { TestComponent } from './personal/components/test/test.component';
import { QuestionApprovalComponent } from "./admin/components/question-approval/question-approval.component";
import { CopyQuestionsComponent } from './global/components/copy-questions/copy-questions.component';
import * as c from "./utilities/route-paths";

const routes: Routes = [
  {
    path: c.filterQuestionsPath,
    component:QuestionApprovalComponent
  },
  {
    path: c.copyQuestionsPath + "/:id",
    component:CopyQuestionsComponent
  },
  {
    path: c.globalQuestionSheetsPath + "/:id",
    component: GlobalSheetComponent,
  },
  {
    path: c.personalQuestionSheetsPath + "/:id",
    component: PersonalSheetComponent,
  },
  {
    path: c.testPath + "/:id/:mode", //single or multiple
    component: TestComponent,
  },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: c.viewGlobalQuestion + "/:id",
    component: ViewGlobalQuestionComponent,
  },
  {
    path: c.loginPath,
    component: LoginComponent,
  },
  {
    path: c.registerPath,
    component: RegisterComponent,
  },
  {
    path: c.editQuestionPath + "/:id/:scope",
    component: EditQuestionComponent,
  },
  {
    path: c.deleteQuestionPath + "/:id/:scope",
    component: DeleteQuestionComponent,
  },
  {
    path: c.editQuestionSheetPath + "/:id/:scope",
    component: EditQuestionSheetComponent,
  },
  {
    path: c.deleteSheetPath + "/:id/:scope",
    component: DeleteQuestionSheetComponent,
  },
  {
    path: c.createSheetPath + "/:parentId/:scope",
    component: CreateQuestionSheetComponent,
  },
  {
    path: c.createQuestionPath + "/:parentId/:scope",
    component: CreateQuestionComponent,
  },
  {
    path: "tests",
    component: NotFoundComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
