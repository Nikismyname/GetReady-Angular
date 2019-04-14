import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { StoreModule } from "@ngrx/store"
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./reducers";
import { GlobalSheetEffects } from "./effects/global-sheet.effects";

import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component"; 
import { CopyQuestionsComponent } from "./components/copy-questions/copy-questions.component";
import { ViewGlobalQuestionComponent } from "./components/view-global-question/view-global-question.component"; 
import { GlobalRoutingModule } from './global-routing.module';

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
    SharedModule,
    GlobalRoutingModule,
    RouterModule,
    StoreModule.forFeature("global", reducers),
    EffectsModule.forFeature([GlobalSheetEffects]),
  ],
  exports: [
    ...components
  ],
})
export class GlobalModule { }
