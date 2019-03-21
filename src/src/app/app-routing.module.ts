import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalSheetComponent } from "./components/personal-sheet/personal-sheet.component";
import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { FolderSelectorComponent } from "./components/folder-selector/folder-selector.component";
import { CopyQuestionsComponent } from "./components/copy-questions/copy-questions.component";
import { EditQuestionComponent } from "./components/edit-question/edit-question.component";

import * as c from "./utilities/route-paths";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path: c.personalQuestionSheetsPath +"/:id",
    component: PersonalSheetComponent
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
    path: "tests",
    component: EditQuestionComponent
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
