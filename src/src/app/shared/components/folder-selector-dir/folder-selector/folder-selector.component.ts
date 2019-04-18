import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFolderSelectData } from 'src/app/services/models/others/selectors';
import { IButtonsRenderInformation } from 'src/app/services/models/others/button-renderer';
//typed
@Component({
  selector: 'getready-folder-selector',
  templateUrl: './folder-selector.component.html',
  styleUrls: ['./folder-selector.component.css']
})

export class FolderSelectorComponent implements OnInit {

  constructor() { }

  folders: IFolderSelectData[];
  @Input() isGlobal: boolean;
  @Input("folders") set foldersSetter(incFolders: IFolderSelectData[]) { 
    this.folders = incFolders;
  };
  @Output() folderSelectedEmitter: EventEmitter<number> = new EventEmitter();
  @Output() folderCreatedRefresh: EventEmitter<void> = new EventEmitter();

  areCreatingFolder: boolean = false;

  loaded: boolean = false;
  root: IFolderSelectData;
  selectedId: number = null;
  foldedFolders: number[] = [];

  ngOnInit() {
    this.root = this.folders.filter(x => x.parentId === null)[0];
    this.loaded = true;
  }

  folderSelected(e) {
    this.selectedId = e;
  }

  folderFolded(id) {
    if (this.foldedFolders.includes(id)) {
      this.foldedFolders = this.foldedFolders.filter(x => x !== id);
    } else {
      this.foldedFolders = this.foldedFolders.concat(id);
    }
  }

  folderFinalChosen = () => {
    if (this.selectedId !== null) {
      this.folderSelectedEmitter.emit(this.selectedId);
    }
  }

  onClickCreateFolder = () => { 
    this.areCreatingFolder = true;
  }

  onFolderCreated = () => { 
    this.areCreatingFolder = false;
    this.folderCreatedRefresh.emit();
  }

  get buttons(): IButtonsRenderInformation {
    return {
      type: "default",
      buttons: [
        {
          styles: "",
          name: "Select",
          function: this.folderFinalChosen,
        },
        {
          styles: "",
          name: "Create Folder",
          function: this.onClickCreateFolder,
        }
      ],
    }
  }

}
