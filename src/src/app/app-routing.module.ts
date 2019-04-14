import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { CrudModule } from "./crud/crud.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { AnonGuard } from './guards/anon.guard';

const routes: Routes = [
  {
    path: "global",
    loadChildren: "./global/global.module#GlobalModule",
  },
  {
    path: "personal",
    loadChildren: "./personal/personal.module#PersonalModule",
    canActivate: [UserGuard]
  },
  {
    path: "admin",
    loadChildren: "./admin/admin.module#AdminModule",
    canActivate: [AdminGuard],
  },
  {
    path: "auth", 
    loadChildren: () => AuthenticationModule,
    canActivate: [AnonGuard],
  },
  {
    path: "crud",
    loadChildren: () => CrudModule,
    canActivate: [UserGuard]
  },

  { path: "", component: HomeComponent },
  { path: "**", component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
