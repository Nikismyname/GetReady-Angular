import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import * as c from "../services/route-paths";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//1 
const routes: Routes = [
    {
        path: c.forFeatureRouting(c.loginPath),
        component: LoginComponent
    },
    {
        path: c.forFeatureRouting(c.registerPath),
        component: RegisterComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }