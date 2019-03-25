import { Component, OnInit } from '@angular/core';
import { FormInputData } from "../../../../services/models/other";
import { QuestionService } from 'src/app/services/question-service';
import { ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'getready-edit-question-sheet',
  templateUrl: './edit-question-sheet.component.html',
  styleUrls: ['./edit-question-sheet.component.css']
})
export class EditQuestionSheetComponent implements OnInit {

  scope: string; 
  id: string;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
  ) { 
    this.id = this.route.snapshot.paramMap.get("id");
    this.scope = this.route.snapshot.paramMap.get("scope");
    console.log("id: "+this.id +" scope: "+ this.scope);
  }

  inputData: FormInputData[];
  loaded: boolean = false;

  async ngOnInit() {
    let getResult = await this.questionService.getGlobalQuestion(this.id);
    if (getResult.status === 200) {
      let question = getResult.data as any;
      this.inputData = [
        new FormInputData("name","Name", "text", question.name ),
        new FormInputData("question","Question", "textarea", question.question),
        new FormInputData("answer","Answer", "textarea", question.answer),
        new FormInputData("comment", "Comment", "textarea", question.comment),
        new FormInputData("difficulty","Difficulty", "number", question.difficulty),
      ];
      this.loaded = true;
    }
  }

  onFormSubmit(data) {
    console.log(data);
  } 
} 
