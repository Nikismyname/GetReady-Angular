import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router";
import { ICrudState } from "../../reducers";
import { Store } from "@ngrx/store";
import { CudActions } from "../../actions/cud.actions";
import { ISubscription } from "rxjs/Subscription";
import { take } from 'rxjs/operators';
 
@Component({
  selector: 'getready-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})

export class EditQuestionComponent {

  global: boolean;
  id: string;
  resultSub: ISubscription;
  formData: FormData;
  loaded: boolean = false;

  constructor(
    private store: Store<ICrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.global = this.route.snapshot.paramMap.get("scope") === "global" ? true : false;

    this.resultSub = this.store.select(x => x.crud.cud.editQuestion.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    this.store.select(x => x.crud.read.question).pipe(take(1)).subscribe(x => { 
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
    });
  }

  async onFormSubmit(input) {
    input["id"] = this.id;
    let data = { data: input, global: this.global };
    this.store.dispatch(new CudActions.editQuestion(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }

}
