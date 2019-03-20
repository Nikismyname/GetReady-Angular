import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getready-folder-recursion',
  templateUrl: './folder-recursion.component.html',
  styleUrls: ['./folder-recursion.component.css']
})
export class FolderRecursionComponent implements OnInit {

  constructor() {}
           
  @Input() currentNode: any;
  @Input() allNotes: any;
  @Output() selected: EventEmitter<number> = new EventEmitter();
  loaded: boolean = false;
    
  ngOnInit() {
    this.loaded = true;
  }

  getChildFolders() {
    if (this.allNotes) {
      return this.allNotes.filter(x => x.questionSheetId === this.currentNode.id);
    } else {
      return [];
    }
  }

  onClickNode() {
    console.log(this.currentNode.name + " Clicked"); 
    this.selected.emit(this.currentNode.id);
  }

  childEmited(e) {
    this.selected.emit(e);
  }
}
