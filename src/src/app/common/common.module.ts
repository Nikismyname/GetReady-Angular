import { NgModule } from '@angular/core';
import { CommonModule as cm } from '@angular/common';

import { BindingFormComponent } from "./components/binding-form/binding-form.component";
import { FixedButtonsComponent } from "./components/fixed-buttons/fixed-buttons.component";
import { FolderSelectorComponent } from "./components/folder-selector-dir/folder-selector/folder-selector.component"
import { FolderRecursionComponent } from "./components/folder-selector-dir/folder-recursion/folder-recursion.component"; 
import { TextVisualisationTBlockComponent } from "./components/text-parsing/text-visualisation-tblock/text-visualisation-tblock.component"; 
import { TextVisualizationBlockComponent } from "./components/text-parsing/text-visualization-block/text-visualization-block.component"; 
import { TextVisualizationInlineComponent } from "./components/text-parsing/text-visualization-inline/text-visualization-inline.component"; 
import { WithPrettyPrintComponent } from "./components/text-parsing/with-pretty-print/with-pretty-print.component"; 

const components = [
  BindingFormComponent,
  FixedButtonsComponent,
  FolderSelectorComponent,
  FolderRecursionComponent,
  TextVisualisationTBlockComponent,
  TextVisualizationBlockComponent,
  TextVisualizationInlineComponent,
  WithPrettyPrintComponent,
];

@NgModule({
  declarations: components,
  imports: [
    cm
  ],
  exports: components,
})
export class CommonModule { }
