import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from "@angular/router";

import { CommonModule as MyCommonModule } from "../common/common.module";

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./reducers";
import { GlablEffects } from "./effects/GlobalSheet.effects";

import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component"; 
import { CopyQuestionsComponent } from "./components/copy-questions/copy-questions.component";
import { ViewGlobalQuestionComponent } from "./components/view-global-question/view-global-question.component"; 

const components = [
  CopyQuestionsComponent,
  GlobalSheetComponent,
  ViewGlobalQuestionComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MyCommonModule,
    DragDropModule,
    RouterModule,
    StoreModule.forFeature("global", reducers),
    EffectsModule.forFeature([GlablEffects]),
  ],
  exports: [
    ...components
  ],
})
export class GlobalModule { }
