import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component"; 
import { CopyQuestionsComponent } from "./components/copy-questions/copy-questions.component";
import { ViewGlobalQuestionComponent } from "./components/view-global-question/view-global-question.component"; 

const components = [
  CopyQuestionsComponent,
  GlobalSheetComponent,
  ViewGlobalQuestionComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports:[...components],
})
export class GlobalModule { }
