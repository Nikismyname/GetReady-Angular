import { NgModule } from '@angular/core';
import { CommonModule as stockCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AutosizeModule } from 'ngx-autosize'; // problems with name works otherwise

import { BindingFormComponent } from "./components/binding-form/binding-form.component";
import { ReactiveBindingFormComponent } from './components/reactive-binding-form/reactive-binding-form.component'; 
import { FixedButtonsComponent } from "./components/fixed-buttons/fixed-buttons.component";
import { FolderSelectorComponent } from "./components/folder-selector-dir/folder-selector/folder-selector.component"
import { FolderRecursionComponent } from "./components/folder-selector-dir/folder-recursion/folder-recursion.component"; 
import { TextVisualisationTBlockComponent } from "./components/text-parsing/text-visualisation-tblock/text-visualisation-tblock.component"; 
import { TextVisualizationBlockComponent } from "./components/text-parsing/text-visualization-block/text-visualization-block.component"; 
import { TextVisualizationInlineComponent } from "./components/text-parsing/text-visualization-inline/text-visualization-inline.component"; 
import { WithPrettyPrintComponent } from "./components/text-parsing/with-pretty-print/with-pretty-print.component";
import { QuestionColumnComponent } from './components/sheets-shared/question-column/question-column.component';
import { QuestionComponent } from './components/sheets-shared/question/question.component';
import { SheetComponent } from './components/sheets-shared/sheet/sheet.component';
import { AllQuestionsComponent } from './components/sheets-shared/all-questions/all-questions.component';
import { CurrentSheetComponent } from './components/sheets-shared/current-sheet/current-sheet.component';
import { AppRoutingModule } from '../app-routing.module';
import { SheetListComponent } from './components/sheets-shared/sheet-list/sheet-list.component';

const components = [
  BindingFormComponent,
  ReactiveBindingFormComponent,
  FixedButtonsComponent,
  FolderSelectorComponent,
  FolderRecursionComponent,
  TextVisualisationTBlockComponent,
  TextVisualizationBlockComponent,
  TextVisualizationInlineComponent,
  WithPrettyPrintComponent,
  QuestionColumnComponent,
  QuestionComponent,
  SheetComponent,
  AllQuestionsComponent,
  CurrentSheetComponent,
  SheetListComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    stockCommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AutosizeModule,
    AppRoutingModule,
    DragDropModule,
  ],
  exports: [...components],
})
export class CommonModule { }
