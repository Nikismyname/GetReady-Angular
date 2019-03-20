import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { Crud } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";
import { ReorderService } from "./services/reorder-service";
import RoutePaths from "./utilities/route-paths";

import { AppComponent } from './app.component';
import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component"
import { PersonalSheetComponent } from './components/personal-sheet/personal-sheet.component';
import { FolderSelectorComponent } from './components/folder-selector/folder-selector.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { FolderRecursionComponent } from './components/recursive/folder-recursion/folder-recursion.component'; 

@NgModule({
  declarations: [
    AppComponent,
    GlobalSheetComponent,
    PersonalSheetComponent,
    FolderSelectorComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    FolderRecursionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [Crud, QuestionSheetService, ReorderService, RoutePaths],
  bootstrap: [AppComponent]
})
export class AppModule { }
