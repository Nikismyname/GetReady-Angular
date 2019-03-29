import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalSheetComponent } from "./components/personal-sheet/personal-sheet.component";
import { GlobalSheetComponent } from "./global/components/global-sheet/global-sheet.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { FolderSelectorComponent } from "./common/components/folder-selector-dir/folder-selector/folder-selector.component";
import { CopyQuestionsComponent } from "./global/components/copy-questions/copy-questions.component";
import { BindingFormComponent } from "./common/components/binding-form/binding-form.component";
import { ViewGlobalQuestionComponent } from "./global/components/view-global-question/view-global-question.component";
import { EditQuestionComponent } from "./components/common/crud/edit-question/edit-question.component";

import * as c from "./utilities/route-paths";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path: c.personalQuestionSheetsPath +"/:id",
    component: PersonalSheetComponent
  },{
    path: c.viewGlobalQuestion +"/:id",
    component: ViewGlobalQuestionComponent
  }, {
    path: c.globalQuestionSheetsPath + "/:id",
    component: GlobalSheetComponent
  },{
    path: c.loginPath,
    component: LoginComponent
  },{
    path: c.registerPath,
    component: RegisterComponent
  },{
    path: c.editQuestionPath+"/:id/:scope",
    component: EditQuestionComponent
  },{
    path: "tests",
    component: BindingFormComponent
  }, {
    path: "**",
    component: NotFoundComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
