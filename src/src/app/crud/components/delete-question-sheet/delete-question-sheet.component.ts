import { Component } from '@angular/core';
import { FormInputData } from "../../../services/models/others/form-input-data";
import { FormData } from "../../../services/models/others/form-data";
import { ActivatedRoute } from "@angular/router";
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ICrudState } from '../../reducers';
import { Location } from '@angular/common';
import { CudActions } from "../../actions/cud.actions";
import { IScopedData } from 'src/app/services/models/others/scoped-data';
import { take } from 'rxjs/operators';
import { IQuestionSheet } from 'src/app/services/models/question-sheet/question-sheet';
//typed
@Component({
  selector: 'getready-delete-question-sheet',
  templateUrl: './delete-question-sheet.component.html',
  styleUrls: ['./delete-question-sheet.component.css']
})
export class DeleteQuestionSheetComponent {

  global: boolean;
  id: number;
  resultSub: ISubscription;
  formData: FormData;

  constructor(
    private store: Store<ICrudState>,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.global = this.route.snapshot.paramMap.get("scope") == "global" ? true : false;

    this.resultSub = this.store.select(x => x.crud.cud.deleteQSheet.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    this.formData = this.generateForm();
  }

  generateForm() {
    let qs: IQuestionSheet;
    this.store.select(x => x.crud.read.questionSheet).pipe(take(1)).subscribe(x => {
      qs = x.qSheet;
    });

    let inputData = [
      new FormInputData("name", "Name", "text", qs.name),

      new FormInputData("description", "Description", "text", qs.description),

      new FormInputData("difficulty", "Difficulty", "number", qs.difficulty),

      new FormInputData("importance", "Importance", "number", qs.importance),
    ];

    return new FormData(
      inputData, "Delete Sheet Form", "Delete", false, true
    );
  }

  async onFormSubmit() {
    let data: IScopedData = { data: this.id, global: this.global };
    console.log("DEL_DATA_", data);
    this.store.dispatch(new CudActions.deleteQSheet(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
  }
} 
