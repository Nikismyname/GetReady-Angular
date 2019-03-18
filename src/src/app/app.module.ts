import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalSheet } from "./components/global-sheet-component/global-sheet.component"
import { Crud } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";

@NgModule({
  declarations: [
    AppComponent,
    GlobalSheet,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
  ],
  providers: [Crud, QuestionSheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
