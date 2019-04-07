import { Component, OnInit } from '@angular/core';
import { FormInputData, FormData } from "../../../services/models/other";
import { ActivatedRoute } from "@angular/router"; 
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { CrudState } from '../../reducers';
import { Location } from '@angular/common';
import { CudActions } from "../../actions/cud.actions";
import { IScopedData } from 'src/app/services/models/contracts/ScopedData';

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
      new FormInputData("name", "Name", "text"),
      new FormInputData("description", "Description", "text"),
      new FormInputData("difficulty", "Difficulty", "number"),
      new FormInputData("importance", "Importance", "number"),
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
    //just in case reseting the state after component has been destroyed; 
    this.store.dispatch(new CudActions.clearState());
  }
} 
