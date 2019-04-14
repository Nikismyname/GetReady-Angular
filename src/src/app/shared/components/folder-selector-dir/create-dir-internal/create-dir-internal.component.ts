import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormInputData, FormData } from "../../../../services/models/other";
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ICrudState } from '../../../../crud/reducers';
import { CudActions } from "../../../../crud/actions/cud.actions";
import { IScopedData } from 'src/app/services/models/contracts/scoped-data';
import { Validators } from '@angular/forms';

@Component({
  selector: 'getready-create-dir-internal',
  templateUrl: './create-dir-internal.component.html',
  styleUrls: ['./create-dir-internal.component.css']
})
export class CreateDirInternalComponent implements OnInit {

  global: boolean;
  parentId: string;
  resultSub: Subscription;

  @Input() intGlobal: boolean;
  @Input() intParentId: number;
  @Output() folderCreatedEmitter: EventEmitter<number> = new EventEmitter();

  constructor(
    private store: Store<ICrudState>,
  ) {
    this.formData = this.generateFormData();
  }

  formData: FormData;
  loaded: boolean = false;

  async ngOnInit() {
      this.global = this.intGlobal;
      this.parentId = this.intParentId.toString();

    this.loaded = true;
    this.resultSub = this.store.select(x => x.crud.cud.createQSheet).subscribe(data => {
      if (data.success === true) {
          this.folderCreatedEmitter.emit(data.createdId);
      }
    });
  }

  generateFormData(): FormData{
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
    return new FormData(
      inputData, "Create Sheet Form", "Create", false
    );
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

