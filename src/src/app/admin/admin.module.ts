import { NgModule } from '@angular/core';
import { CommonModule as StockCommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from "./effects/admin.effects"; 
import { adminReducer } from "./reducers/admin.reducers";
import { CommonModule } from "../common/common.module";
import { QuestionApprovalComponent } from './components/question-approval/question-approval.component'; 

@NgModule({
  declarations:[
    QuestionApprovalComponent,
  ],
  imports: [
    StockCommonModule,
    StoreModule.forFeature("admin", adminReducer),
    EffectsModule.forFeature([AdminEffects]),
    CommonModule,
  ],
  exports: [
    QuestionApprovalComponent
  ]
})
export class AdminModule { }
