import { NgModule } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '../common/common.module';
import { authReducer } from "./reducers/auth.reducers";
import { AuthEffects  } from "./effects/auth.effects"; 

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature("auth", authReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
})
export class AuthenticationModule { }