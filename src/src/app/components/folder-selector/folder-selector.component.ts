import { Component, OnInit, Input, Output } from '@angular/core';
import { QuestionSheetService } from 'src/app/services/question-sheet-service';

@Component({
  selector: 'getready-folder-selector',
  templateUrl: './folder-selector.component.html',
  styleUrls: ['./folder-selector.component.css']
})
export class FolderSelectorComponent implements OnInit {

  constructor(
    private questionSheetService: QuestionSheetService
  ) {
    
  }

  loaded: boolean = false;

  data: any;
  root: any;

  async ngOnInit() {
    let getResult = await this.questionSheetService.getAllFoldersGlobal();
    if (getResult.status === 200) {
      this.data = getResult.data;
      this.root = this.data.filter(x => x.questionSheetId === null)[0];
      this.loaded = true;
    }
  }

  itemSelected(e) {
    console.log("Root event Here");
    console.log(e);
  }
}
