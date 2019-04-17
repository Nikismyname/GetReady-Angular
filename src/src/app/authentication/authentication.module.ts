import { NgModule } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from "./reducers/auth.reducers";
import { AuthEffects } from "./effects/auth.effects"; 
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { SharedModule } from '../shared/shared.module';
//1
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        SharedModule,
        AuthenticationRoutingModule,
        StoreModule.forFeature("auth", authReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
})
export class AuthenticationModule { }