import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question-service';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'getready-view-global-question',
  templateUrl: './view-global-question.component.html',
  styleUrls: ['./view-global-question.component.css']
})
export class ViewGlobalQuestionComponent implements OnInit {

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }
 
  question: any;
  loaded: boolean = false;
  PRLoaded: boolean = false;

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    let getResult = await this.questionService.getGlobalQuestion(id); 
    if (getResult.status === 200) {
      this.question = getResult.data;
      console.log(this.question);
      this.loaded = true;
    }
  }

  prLoaded() {
    this.PRLoaded = true;
  }
 
  onClickBack() { 
    this.location.back();
  }
} 
