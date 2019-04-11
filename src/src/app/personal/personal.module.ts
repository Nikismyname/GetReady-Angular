import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalSheetComponent } from './components/personal-sheet/personal-sheet.component';
import { CommonModule as MyCommonModule } from "../common/common.module"; 
import { StoreModule } from '@ngrx/store';
import { reducers } from "./reducers/index"; 
import { EffectsModule } from '@ngrx/effects';
import { PersonalSheetEffects } from "./effects/personal-sheet.effects"; 

let components = [
  PersonalSheetComponent,
]; 

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MyCommonModule,
    StoreModule.forFeature("personal", reducers),
    EffectsModule.forFeature([PersonalSheetEffects]),
  ], 
  exports: [...components],
})
export class PersonalModule { }
