import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IItemSelectData } from 'src/app/services/models/contracts/selectors';
import { IItemsPickedData } from '../item-selector/item-selector.component';

@Component({
  selector: 'getready-item-recursion',
  templateUrl: './item-recursion.component.html',
  styleUrls: ['./item-recursion.component.css']
})
export class ItemRecursionComponent implements OnInit {

  constructor() { }
   
  foldedFolders: number[] = []; 
  
  @Input() currentNode: IItemSelectData;
  @Input() allNotes: IItemSelectData[];
  @Input("foldedFolders")
  set foldedFoldersSetter(foldedFolders: number[]) {
    this.isFolded = foldedFolders.includes(this.currentNode.id) ? true : false;
    this.foldedFolders = foldedFolders;
  }

  @Output() selected: EventEmitter<IItemsPickedData> = new EventEmitter();
  @Output() folded: EventEmitter<number> = new EventEmitter();

  loaded: boolean = false;
  isSelected: boolean = false; 
  isFolded: boolean = false;
  ngOnInit() {
    this.loaded = true;
  }

  getChildFolders() { 
    if (this.loaded) {
      return this.allNotes.filter(x => x.parentId === this.currentNode.id);
    } else {
      return [];
    }
  }

  sheetCheckboxClicked() {
    this.selected.emit({
      parentDirId: this.currentNode.id, 
      dirSelected: true, 
      itemId: null,
    });
  }

  itemCheckboxCicked(id: number) {
    this.selected.emit({
      parentDirId: this.currentNode.id, 
      dirSelected: false, 
      itemId: id,
    });
  }

  childEmitedSelected(e) {    
    this.selected.emit(e);
  }

  onClickFold() {
    this.folded.emit(this.currentNode.id);
  }

  childEmitedFolded(e) {
    this.folded.emit(e); 
  } 

} 
