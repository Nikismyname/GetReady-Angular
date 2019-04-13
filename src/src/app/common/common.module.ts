import { NgModule } from '@angular/core';
import { CommonModule as stockCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AutosizeModule } from 'ngx-autosize'; // problems with name works otherwise

import { ReactiveBindingFormComponent } from './components/reactive-binding-form/reactive-binding-form.component'; 
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
import { ButtonsRendererComponent } from './components/buttons-renderer/buttons-renderer.component';
import { ItemRecursionComponent } from './components/item-selector-dir/item-recursion/item-recursion.component';
import { ItemSelectorComponent } from './components/item-selector-dir/item-selector/item-selector.component';
import { CreateDirInternalComponent } from './components/folder-selector-dir/create-dir-internal/create-dir-internal.component';

const components = [
  ReactiveBindingFormComponent,
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
  ButtonsRendererComponent,
  ItemRecursionComponent,
  ItemSelectorComponent,
  CreateDirInternalComponent,
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
  exports: [
    ...components,
    AutosizeModule,
  ],
})
export class CommonModule { }
