import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData } from "../../../services/models/others/form-input-data";
import { FormData } from "../../../services/models/others/form-data";
import { ActivatedRoute } from "@angular/router";
import { ICrudState } from "../../reducers";
import { Store } from "@ngrx/store";
import { CudActions } from "../../actions/cud.actions";
import { ISubscription } from "rxjs/Subscription";
import { IScopedData } from 'src/app/services/models/others/scoped-data';
import { take } from 'rxjs/operators';
//typed
@Component({
  selector: 'getready-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.css']
})
export class DeleteQuestionComponent implements OnDestroy {

  global: boolean;
  id: number;
  resultSub: ISubscription;
  dataSub: ISubscription;
  formData: FormData;

  constructor(
    private store: Store<ICrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.global = this.route.snapshot.paramMap.get("scope") === "global" ? true : false;

    this.store.select(x => x.crud.read.question).pipe(take(1)).subscribe(x => {
        console.log("QUESTION HERE: ", x);
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
          inputData, "Delete Question Form", "Delete", false, true
        );
    });

    console.log("FORM DATA HERE,", this.formData);

    this.resultSub = this.store.select(x => x.crud.cud.deleteQuestion.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

  }

  async onFormSubmit() {
    let data: IScopedData = { data: this.id, global: this.global };
    this.store.dispatch(new CudActions.deleteQuestion(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }

} 
