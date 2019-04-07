import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData } from "../../../services/models/other";
import { QuestionService } from 'src/app/services/question-service';
import { ActivatedRoute } from "@angular/router";
import { CrudState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { CudActions } from "../../actions/cud.actions";
import { ReadActions } from "../../actions/read.actions";
import { ISubscription } from "rxjs/Subscription";
import { map } from 'rxjs/operators';
 
@Component({
  selector: 'getready-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})

export class EditQuestionComponent implements OnInit {

  scope: string;
  id: string;
  resultSub: ISubscription;
  dataSub: ISubscription;

  constructor(
    private store: Store<CrudState>,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.scope = this.route.snapshot.paramMap.get("scope");
    console.log("id: " + this.id + " scope: " + this.scope);
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {

    this.resultSub = this.store.select(x => x.crud.cud.editQuestion.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    // this.store.subscribe(x => { 
    //   console.log("NO_SELECT subscription", x["crud"]["read"]["globalQuestion"]);
    // });

    this.dataSub = this.store.pipe(map(x => x.crud.read.question)).subscribe(x => { 
      console.log("GLOBAL QUESTION HERE: ", x);
      if (x.success === true) {
        console.log("recieved the question");
        let question = x.question;
        let inputData = [
          new FormInputData("name", "Name", "text", question.name),
          new FormInputData("question", "Question", "textarea", question.question),
          new FormInputData("answer", "Answer", "textarea", question.answer),
          new FormInputData("comment", "Comment", "textarea", question.comment),
          new FormInputData("difficulty", "Difficulty", "number", question.difficulty),
        ];
        this.formData = new FormData(
          inputData, "Edit Question Form", "Edit", true
        );
        this.loaded = true;
        this.store.dispatch(new ReadActions.ClearReadState());
      }
    });

    // this.store.select(x => x.crud.read.globalQuestion).subscribe(x => { 
    //   console.log("SELECT subscription", x);
    // });

    // this.dataSub = this.store.select(x => x.crud.read.globalQuestion).subscribe(x => {
      
    // });

    this.store.dispatch(new ReadActions.Question(Number(this.id)));
  }

  async onFormSubmit(input) {
    input["id"] = this.id;
    let isGlobal = this.scope === "global" ? true : false;
    let data = { data: input, global: isGlobal };
    this.store.dispatch(new CudActions.editQuestion(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
    this.dataSub.unsubscribe();
    //just in case reseting the state after component has been destroyed; 
    this.store.dispatch(new CudActions.clearState());
    this.store.dispatch(new ReadActions.ClearReadState());
  }

} 
