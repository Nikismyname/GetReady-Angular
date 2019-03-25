import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { AutosizeModule } from 'ngx-autosize'; // problems with name works otherwise
import { FormsModule } from '@angular/forms'; //so you can use [(model)];
//import {Autosize} from 'ng-autosize'; // does not work

import { AppRoutingModule } from './app-routing.module';
import { Crud } from "./services/crud";
import { QuestionSheetService } from "./services/question-sheet-service";
import { QuestionService } from "./services/question-service"
import { ReorderService } from "./services/reorder-service";
import RoutePaths from "./utilities/route-paths";
import { TrackingService } from "./services/tracking.service";
import { UserService } from "./services/user-service";

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
import { TextVisualizationInlineComponent } from "./components/text-parsing/text-visualization-inline/text-visualization-inline.component";
import { TextVisualizationBlockComponent } from "./components/text-parsing/text-visualization-block/text-visualization-block.component";
import { BindingFormComponent } from "./components/binding-form/binding-form.component";
import { ViewGlobalQuestionComponent } from './components/view-global-question/view-global-question.component';
import { CreateQuestionComponent } from './components/common/crud/create-question/create-question.component';
import { CreateQuestionSheetComponent } from './components/common/crud/create-question-sheet/create-question-sheet.component';
import { EditQuestionSheetComponent } from './components/common/crud/edit-question-sheet/edit-question-sheet.component'; 
import { EditQuestionComponent } from "./components/common/crud/edit-question/edit-question.component";
import { WithPrettyPrintComponent } from './components/text-parsing/with-pretty-print/with-pretty-print.component';

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
    EditQuestionComponent,
    TextVisualisationTBlockComponent,
    TextVisualizationBlockComponent,
    TextVisualizationInlineComponent,
    BindingFormComponent,
    ViewGlobalQuestionComponent,
    CreateQuestionComponent,
    CreateQuestionSheetComponent,
    EditQuestionSheetComponent,
    WithPrettyPrintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    DragDropModule,
    BrowserAnimationsModule,
    AutosizeModule,
    FormsModule,
  ],
  providers: [
    Crud,
    QuestionSheetService,
    QuestionService,
    ReorderService,
    RoutePaths,
    TrackingService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
