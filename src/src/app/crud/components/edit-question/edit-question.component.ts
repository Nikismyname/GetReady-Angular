import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router";
import { CrudState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { CudActions } from "../../actions/cud.actions";
import { ReadActions } from "../../actions/read.actions";
import { ISubscription } from "rxjs/Subscription";
import { map } from 'rxjs/operators';
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';
 
@Component({
  selector: 'getready-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})

export class EditQuestionComponent implements OnInit {

  global: boolean;
  id: string;
  resultSub: ISubscription;
  dataSub: ISubscription;

  constructor(
    private store: Store<CrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.global = this.route.snapshot.paramMap.get("scope") === "global"? true: false;
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {

    this.resultSub = this.store.select(x => x.crud.cud.editQuestion.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

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
      }
    });

    let data: IScopedData = {data:this.id, global: this.global };
    this.store.dispatch(new ReadActions.Question(data));
  }

  async onFormSubmit(input) {
    input["id"] = this.id;
    let data = { data: input, global: this.global };
    this.store.dispatch(new CudActions.editQuestion(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

}
