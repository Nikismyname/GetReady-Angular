import { Component, OnInit } from '@angular/core';
import { QuestionSheetService } from 'src/app/services/question-sheet-service';

@Component({
  selector: 'getready-copy-questions',
  templateUrl: './copy-questions.component.html',
  styleUrls: ['./copy-questions.component.css']
})
export class CopyQuestionsComponent implements OnInit {
  constructor(private questionSheetService: QuestionSheetService) { }

  private firsSelectedId: number; 
  private secondSelectedId: number;
  selectingQuestions: boolean = true;
  loaded: boolean = false;
  questionSelectionData: any[]; 
  folderSelectionData: any[];

  async ngOnInit() {
    let getResult = await this.questionSheetService.getAllFoldersGlobal();
    if (getResult.status === 200) {
      let data = getResult.data;
      this.questionSelectionData = data;
      this.folderSelectionData = data; 
      this.loaded = true;
    }
  }

  questionsSelected(id: number) {
    this.firsSelectedId = id;
    this.selectingQuestions = false;
  } 

  folderSelected(id: number) {
    this.secondSelectedId = id; 
    alert(this.firsSelectedId + " " + this.secondSelectedId);
  }
}
