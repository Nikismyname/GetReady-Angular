import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getready-folder-selector',
  templateUrl: './folder-selector.component.html',
  styleUrls: ['./folder-selector.component.css']
})
export class FolderSelectorComponent implements OnInit {
  constructor() {}

  @Input() data: any[];
  @Output() folderSelectedOutput: EventEmitter<number> = new EventEmitter(); 

  loaded: boolean = false;
  //data: any;
  root: any;
  selectedId: number = null;
  foldedFolders: number[] = [];

  ngOnInit() {
    this.root = this.data.filter(x => x.questionSheetId === null)[0]; 
    this.loaded = true;
  }

  folderSelected(e) {
    this.selectedId = e; 
  }

  folderFolded(id) { 
    if (this.foldedFolders.includes(id)) {
      this.foldedFolders = this.foldedFolders.filter(x=>x !== id);
    } else {
      this.foldedFolders = this.foldedFolders.concat(id);
    }
  }

  folderFinalChosen() { 
    if (this.selectedId !== null) {
      this.folderSelectedOutput.emit(this.selectedId);
    }
  } 
}
