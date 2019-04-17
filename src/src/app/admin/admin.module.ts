import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from "./effects/admin.effects"; 
import { adminReducer } from "./reducers/admin.reducers";
import { SharedModule } from "../shared/shared.module";
import { QuestionApprovalComponent } from './components/question-approval/question-approval.component'; 
import { AdminRoutingModule } from './admin-routing.module';
//1
const components = [QuestionApprovalComponent];

@NgModule({
  declarations:[...components],
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature("admin", adminReducer),
    EffectsModule.forFeature([AdminEffects]),
    CommonModule,
  ],
  exports: [...components]
})
export class AdminModule { }
