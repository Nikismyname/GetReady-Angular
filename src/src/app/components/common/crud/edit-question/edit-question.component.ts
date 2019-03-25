import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData } from "../../../../services/models/other";
import { QuestionService } from 'src/app/services/question-service';
import { ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'getready-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
   
export class EditQuestionComponent implements OnInit {

  scope: string; 
  id: string;
 
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
  ) { 
    this.id = this.route.snapshot.paramMap.get("id");
    this.scope = this.route.snapshot.paramMap.get("scope");
    console.log("id: "+this.id +" scope: "+ this.scope);
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {
    let getResult = await this.questionService.getGlobalQuestion(this.id);
    if (getResult.status === 200) {
      let question = getResult.data as any;
      let inputData = [
        new FormInputData("name","Name", "text", question.name ),
        new FormInputData("question","Question", "textarea", question.question),
        new FormInputData("answer","Answer", "textarea", question.answer),
        new FormInputData("comment", "Comment", "textarea", question.comment),
        new FormInputData("difficulty","Difficulty", "number", question.difficulty),
      ];
      this.formData = new FormData(
        inputData, "Edit Question Form", "Edit", true
      );
      // console.log("form data:");
      // console.log(inputData);
      this.loaded = true;
    }
  }

  async onFormSubmit(data) {
    data["id"] = this.id;
    let editResult = await this.questionService.editQuestion(data, this.scope);
    // alert(editResult.status)
    if (editResult.status === 200) {
      this.location.back();
    } else {
      alert(editResult.json);
    }
  } 
} 
