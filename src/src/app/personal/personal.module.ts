import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSheetComponent } from './components/personal-sheet/personal-sheet.component';
import { CommonModule as MyCommonModule } from "../common/common.module"; 
import { StoreModule } from '@ngrx/store';
import { reducers } from "./reducers/index"; 
import { EffectsModule } from '@ngrx/effects';
import { PersonalSheetEffects } from "./effects/personal-sheet.effects";
import { PersonalQuestionViewComponent } from './components/personal-question-view/personal-question-view.component';
import { TestComponent } from './components/test/test.component'; 
import { RatingModule } from "ngx-rating"; 
import { FormsModule } from '@angular/forms';
import { ReviewQuestionsComponent } from './components/review-questions/review-questions.component';

let components = [
  PersonalSheetComponent,
]; 

@NgModule({
  declarations: [...components, PersonalQuestionViewComponent, TestComponent, ReviewQuestionsComponent],
  imports: [
    CommonModule,
    MyCommonModule,
    StoreModule.forFeature("personal", reducers),
    EffectsModule.forFeature([PersonalSheetEffects]),
    RatingModule,
    FormsModule,
  ], 
  exports: [...components],
})
export class PersonalModule { }
