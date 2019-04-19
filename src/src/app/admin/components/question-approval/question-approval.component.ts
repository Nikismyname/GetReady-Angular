import { Component, OnDestroy } from '@angular/core';
import { IAppState } from "../../../store/reducers/index";
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { AdminActions } from "../../actions/admin.actions";
import { IScopedData } from "../../../services/models/others/scoped-data";
import { Subscription, Observable } from 'rxjs';
import { Location } from "@angular/common";
import {
  IButtonsRenderInformation,
  IButtonRenderInformation
} from 'src/app/services/models/others/button-renderer';
import { IApproveQuestionData } from 'src/app/services/models/others/approve-question-data';
import { IGlobalQuestion } from 'src/app/services/models/question/global-question';
import { IPersonalQuestion } from 'src/app/services/models/question/personal-question';
import { IFolderSelectData } from 'src/app/services/models/others/selectors';
import { take, filter } from 'rxjs/operators';
import { GlobalSheetActions } from 'src/app/global/actions/global-sheet.action';
//typed
@Component({
  selector: 'getready-question-approval',
  templateUrl: './question-approval.component.html',
  styleUrls: ['./question-approval.component.css']
})
export class QuestionApprovalComponent implements OnDestroy {

  questionIds: number[];
  id: string;
  dataSub: Subscription;
  currentQuestion$: Observable<IGlobalQuestion | IPersonalQuestion>;
  PRLoaded: boolean = false;
  firstQuestionLoaded: boolean = false;
  loaded: boolean = false;
  foldersLoaded: boolean = false;
  folders: IFolderSelectData[];
  folderSub: Subscription;
  currentGlobalId: number;

  shouldShowComment: boolean = false;
  shouldShowAnswer: boolean = false;
  index: number = 0;

  selectingDir: boolean = false;

  constructor(
    private location: Location,
    private store: Store<IAppState>,
  ) {
    this.currentQuestion$ = this.store.select(x => x.crud.read.question.question);

    store
      .select(x => x.crud.read.question.success)
      .pipe(filter(x=> x),take(1))
      .subscribe(x => {
          this.firstQuestionLoaded = true;
      });

    this.store.select(x => x.global.currentGlobalIndex.id).pipe(take(1)).subscribe(x => {
      this.currentGlobalId = x;
    })

    this.store.dispatch(new AdminActions.getIdsForApproval());
    this.dataSub = this.store.select(x => x.admin.idsForApproval).subscribe(x => {
      if (x.success === true) {
        if (x.ids.length === 0) {
          this.location.back();
        }
        this.questionIds = x.ids;
        this.loaded = true;
        this.displayQuestion();
      }
    });
  }

  displayQuestion() {
    let data: IScopedData = { data: this.questionIds[this.index], global: true };
    this.store.dispatch(new ReadActions.Question(data));
  }

  onPrLoaded() {
    this.PRLoaded = true;
  }

  next = () => {
    this.index++;
    if (this.index >= this.questionIds.length) {
      this.location.back();
    }
    this.displayQuestion();
  }

  approve = () => {
    this.store.dispatch(new ReadActions.GetAllFolders(true));
    this.folderSub = this.store.select(x => x.crud.read.allFolders).subscribe(x => {
      if (x.success) {
        this.folders = x.folders.map(x => ({
          id: x.id,
          name: x.name,
          parentId: x.questionSheetId,
          order: 0,
        }));
        this.foldersLoaded = true;
        this.selectingDir = true;
      }
    });
  }

  folderSelected(id: number) {
    this.selectingDir = false;
    if (id === this.currentGlobalId) {
      this.store.select(x => x.admin.questionApproved.success).pipe(filter(x => x), take(1)).subscribe(x => {
        this.store.dispatch(new GlobalSheetActions.load(id));
      })
    };
    let data: IApproveQuestionData = { globalParentSheetId: id, questionId: this.questionIds[this.index] };
    this.store.dispatch(new AdminActions.approveQuestion(data));
    this.next();
  }

  directoryCreatedRefresh() {
    this.store.dispatch(new ReadActions.GetAllFolders(true));
  }

  reject = () => {
    this.store.dispatch(new AdminActions.rejectQuestion(this.questionIds[this.index]));
    this.next();
  }

  skip = () => {
    this.next();
  }

  get buttons(): IButtonsRenderInformation {
    let buttons: IButtonRenderInformation[] = [
      {
        name: "Approve",
        styles: "",
        function: this.approve,
      },
      {
        name: "Reject",
        styles: "",
        function: this.reject,
      },
      {
        name: "Skip",
        styles: "",
        function: this.skip,
      }
    ]

    return {
      type: "default",
      buttons: buttons,
    }
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    if (this.folderSub) {
      this.folderSub.unsubscribe();
    }
  }

} 
