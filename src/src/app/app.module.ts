import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalSheet } from "./components/global-sheet-component/global-sheet.component"
import { Crud } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";
import { ReorderService } from "./services/reorder-service"; 

@NgModule({
  declarations: [
    AppComponent,
    GlobalSheet,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [Crud, QuestionSheetService, ReorderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
