import { Component, OnInit } from '@angular/core';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router"; 
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CrudState } from '../../reducers';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { CudActions } from "../../actions/cud.actions";
import { ReadActions } from "../../actions/read.actions";
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';


@Component({
  selector: 'getready-edit-question-sheet',
  templateUrl: './edit-question-sheet.component.html',
  styleUrls: ['./edit-question-sheet.component.css']
})
export class EditQuestionSheetComponent implements OnInit {

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
    this.global = this.route.snapshot.paramMap.get("scope") == "global" ? true : false;
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {

    this.resultSub = this.store.select(x => x.crud.cud.editQSheet.success).subscribe(done => {
      if (done === true) {
        this.location.back();
      }
    });

    this.dataSub = this.store.pipe(map(x => x.crud.read.questionSheet)).subscribe(x => { 
      if (x.success === true) {
        let qs = x.qSheet;
        let inputData = [

          new FormInputData("name", "Name", "text", qs.name),
          new FormInputData("description", "Description", "text", qs.description),
          new FormInputData("difficulty", "Difficulty", "number", qs.difficulty),
          new FormInputData("importance", "Importance", "number", qs.importance),
        ];

        this.formData = new FormData(
          inputData, "Edit Sheet Form", "Edit", false
        );
        this.loaded = true;
        this.store.dispatch(new ReadActions.ClearReadState());
      }
    });

    let data: IScopedData = {data: Number(this.id),global: this.global};
    this.store.dispatch(new ReadActions.QuestionSheet(data));
  }

  async onFormSubmit(input) {
    input["id"] = this.id;
    let data: IScopedData = { data: input, global: this.global };
    this.store.dispatch(new CudActions.editQSheet(data));
  }

  ngOnDestroy() {
    this.resultSub.unsubscribe();
    this.dataSub.unsubscribe();
    //just in case reseting the state after component has been destroyed; 
    this.store.dispatch(new CudActions.ClearState());
    this.store.dispatch(new ReadActions.ClearReadState());
  }
} 
