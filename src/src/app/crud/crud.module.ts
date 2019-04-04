import { NgModule } from '@angular/core';
import { CommonModule as stockCommonModule } from '@angular/common';

import { CreateQuestionComponent } from "./components/create-question/create-question.component";
import { CreateQuestionSheetComponent } from "./components/create-question-sheet/create-question-sheet.component"; 
import { EditQuestionComponent } from "./components/edit-question/edit-question.component";
import { EditQuestionSheetComponent } from "./components/edit-question-sheet/edit-question-sheet.component";
import { DeleteQuestionSheetComponent } from './components/delete-question-sheet/delete-question-sheet.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';

import { CommonModule } from "../common/common.module"; 

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from "./reducers";
import { CudEffects } from "./effects/cud.effects";
import { ReadEffects } from "./effects/read.effects";

let components = [
  CreateQuestionComponent,
  CreateQuestionSheetComponent,
  EditQuestionComponent,
  EditQuestionSheetComponent,
  DeleteQuestionSheetComponent,
  DeleteQuestionComponent,
];

@NgModule({
  declarations: [...components], 
  imports: [
    CommonModule,
    stockCommonModule,
    StoreModule.forFeature("crud", reducers),
    EffectsModule.forFeature([
      CudEffects,
      ReadEffects,
    ]),
  ],
  exports: [...components],
})
export class CrudModule { }
