import { Component } from '@angular/core';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router"; 
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ICrudState } from '../../reducers';
import { Location } from '@angular/common';
import { CudActions } from "../../actions/cud.actions";
import { IScopedData } from 'src/app/services/models/contracts/scoped-data';
import { Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IQuestionSheet } from 'src/app/services/models/question-sheet/question-sheet';

@Component({
  selector: 'getready-edit-question-sheet',
  templateUrl: './edit-question-sheet.component.html',
  styleUrls: ['./edit-question-sheet.component.css']
})
export class EditQuestionSheetComponent {

  global: boolean;
  id: number;
  errors: object = {};
  formData: FormData;
  // loaded: boolean = false;
  resultSub: ISubscription;

  constructor(
    private store: Store<ICrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.global = this.route.snapshot.paramMap.get("scope") == "global" ? true : false;

    this.resultSub = this.store.select(x => x.crud.cud.editQSheet.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    this.formData = this.generateForm();
    
  }

  generateForm(): FormData {
    let qs: IQuestionSheet;
    this.store.select(x => x.crud.read.questionSheet).pipe(take(1)).subscribe(x => {         
      qs = x.qSheet;
    });

    let inputData = [
      new FormInputData(
        "name", "Name", "text", qs.name,
        [
          Validators.required,
          Validators.minLength(3),
        ],
        {
          minLength: "Name must be at least 3 characters long!"
        }),
      
      new FormInputData(
        "description", "Description", "text", qs.description,
        [Validators.nullValidator]),
      
      new FormInputData(
        "difficulty", "Difficulty", "number", qs.difficulty,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
        ],
        {
          min: "Diffuculty must be between 1 and 10!",
          max: "Diffuculty must be between 1 and 10!",
        }
      ),

      new FormInputData(
        "importance", "Importance", "number", qs.importance,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(10),
        ],
        {
          min: "Importance must be between 1 and 10!",
          max: "Importance must be between 1 and 10!",
        }
      ),
    ];
    // this.loaded = true;
    return new FormData(
      inputData, "Edit Sheet Form", "Edit", false
    );
  }

  onFormSubmit(input) {
    input["id"] = this.id;
    let data: IScopedData = { data: input, global: this.global };
    this.store.dispatch(new CudActions.editQSheet(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }
} 
