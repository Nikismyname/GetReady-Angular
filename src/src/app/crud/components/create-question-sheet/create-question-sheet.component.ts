import { Component, OnInit } from '@angular/core';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router"; 
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CrudState } from '../../reducers';
import { Location } from '@angular/common';
import { CudActions } from "../../actions/cud.actions";
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';
import { Validators } from '@angular/forms';

@Component({
  selector: 'getready-create-question-sheet',
  templateUrl: './create-question-sheet.component.html',
  styleUrls: ['./create-question-sheet.component.css']
})
export class CreateQuestionSheetComponent implements OnInit { 

  global: boolean;
  parentId: string;
  resultSub: ISubscription;

  constructor(
    private store: Store<CrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.global = this.route.snapshot.paramMap.get("scope") == "global" ? true : false;
    this.parentId = this.route.snapshot.paramMap.get("parentId");
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {
    let inputData = [
      new FormInputData("name", "Name", "text", null,
        [
          Validators.required,
          Validators.minLength(3),
        ],
        {
          minLength: "Name must be at least 3 characters long!",
        }),
      new FormInputData("description", "Description", "text"),
      new FormInputData("difficulty", "Difficulty", "number", null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ],
      {
        min: "Diffuculty must be between 1 and 10!",
        max: "Diffuculty must be between 1 and 10!",
      }),
      new FormInputData("importance", "Importance", "number", null,
      [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ],
      {
        min: "Importance must be between 1 and 10!",
        max: "Importance must be between 1 and 10!",
      }),
    ];
    this.formData = new FormData(
      inputData, "Create Sheet Form", "Create", false
    );
    this.loaded = true;

    this.resultSub = this.store.select(x => x.crud.cud.createQSheet).subscribe(data => {
      console.log("QS SUCCESS DATA HERE: ", data);
      if (data.success === true) {
        this.location.back();
      }
    });
  }

  async onFormSubmit(input) {
    input.parentSheetId = this.parentId;
    console.log("CREATE DATA", input);
    let data: IScopedData = { data: input, global: this.global };
    this.store.dispatch(new CudActions.createQSheet(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }
} 
