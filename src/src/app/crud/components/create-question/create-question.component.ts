import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router";
import { ICrudState } from "../../reducers";
import { Store } from "@ngrx/store";
import { CudActions } from "../../actions/cud.actions";
import { ISubscription } from "rxjs/Subscription";
import { Validators } from '@angular/forms';

@Component({
  selector: 'getready-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  
  global: boolean;
  parentId: string;
  resultSub: ISubscription;
  formData: FormData;
  loaded: boolean = false;

  constructor(
    private store: Store<ICrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.parentId = this.route.snapshot.paramMap.get("parentId");
    this.global = this.route.snapshot.paramMap.get("scope") === "global" ? true : false;

    this.resultSub = this.store.select(x => x.crud.cud.createQuestion.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    this.formData = this.generateForm();
  }

  generateForm(): FormData {
    let inputData = [
      new FormInputData("name", "Name", "text", null,
        [
          Validators.required,
          Validators.minLength(2),
        ],
        {
          minLength: "Name must be at least two character long!"
        }),
      new FormInputData("question", "Question", "textarea", null,
        [
          Validators.required,
          Validators.minLength(10),
        ],
        {
          minLength: "Question must be at least 10 characters long!",
        }),
      new FormInputData("answer", "Answer", "textarea", null,
        [
          Validators.required,
          Validators.minLength(10),
        ],
        {
          minLength: "Answer must be at least 10 characters long!",
        }),
      new FormInputData("comment", "Comment", "textarea"),
      new FormInputData("difficulty", "Difficulty", "number", null,
        [
          Validators.required, 
          Validators.min(1),
          Validators.max(10),
        ],
        {
          min: "Difficulty must be between 1 and 10!",
          max: "Difficulty must be between 1 and 10!",
        }),
    ];

    return new FormData(
      inputData, "Create Question Form", "Create", true
    );
  }

  async onFormSubmit(input) {
    input["sheetId"] = this.parentId;
    let data = { data: input, global: this.global };
    this.store.dispatch(new CudActions.createQuestion(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }

} 
