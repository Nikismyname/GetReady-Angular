import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSheetComponent } from './components/personal-sheet/personal-sheet.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./reducers/index"; 
import { EffectsModule } from '@ngrx/effects';
import { PersonalSheetEffects } from "./effects/personal-sheet.effects";
import { TestComponent } from './components/test/test.component'; 
import { RatingModule } from "ngx-rating"; 
import { FormsModule } from '@angular/forms';
import { ReviewQuestionsComponent } from './components/review-questions/review-questions.component';
import { PersonalRoutingModule } from "./personal-routing.module";
import { SharedModule } from '../shared/shared.module';

let components = [
  PersonalSheetComponent,
  TestComponent,
  ReviewQuestionsComponent,
]; 

@NgModule({
  declarations: [...components ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature("personal", reducers),
    EffectsModule.forFeature([PersonalSheetEffects]),
    RatingModule,
    FormsModule,
    PersonalRoutingModule,
  ], 
  exports: [...components],
})
export class PersonalModule { }
