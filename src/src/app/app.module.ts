import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { AppRoutingModule } from './app-routing.module';
import { Crud } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";
import { ReorderService } from "./services/reorder-service";
import RoutePaths from "./utilities/route-paths";
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { GlobalSheetComponent } from "./components/global-sheet/global-sheet.component"
import { PersonalSheetComponent } from "./components/personal-sheet/personal-sheet.component";
import { FolderSelectorComponent } from "./components/folder-selector/folder-selector.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { FolderRecursionComponent } from "./components/recursive/folder-recursion/folder-recursion.component";
import { CopyQuestionsComponent } from "./components/copy-questions/copy-questions.component";
import { FixedButtonsComponent } from "./components/fixed-buttons/fixed-buttons.component";
import { TextVisualisationTBlockComponent } from "./components/text-parsing/text-visualisation-tblock/text-visualisation-tblock.component";
import { EditQuestionComponent } from "./components/edit-question/edit-question.component";
import { TextVisualizationInlineComponent } from './components/text-parsing/text-visualization-inline/text-visualization-inline.component'; 

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
    CopyQuestionsComponent,
    FixedButtonsComponent,
    TextVisualisationTBlockComponent,
    EditQuestionComponent,
    TextVisualizationInlineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatInputModule,
    TextareaAutosizeModule,
  ],
  providers: [Crud, QuestionSheetService, ReorderService, RoutePaths],
  bootstrap: [AppComponent]
})
export class AppModule { }
