import { Component } from '@angular/core';
import { QuestionSheetService } from 'src/app/services/question-sheet-service';
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { ISheetForAllFolders } from 'src/app/services/models/contracts/for-get-all';
import { map } from 'rxjs/operators';
import { IFolderSelectData } from 'src/app/services/models/contracts/selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'getready-copy-questions',
  templateUrl: './copy-questions.component.html',
  styleUrls: ['./copy-questions.component.css']
})
export class CopyQuestionsComponent {

  loaded: boolean = false;
  folders$: Observable<IFolderSelectData[]>; 

  private firsSelectedId: number; 
  private secondSelectedId: number;
  selectingQuestions: boolean = true;
  questionSelectionData: any[]; 
  folderSelectionData: any[];

  constructor(
    private questionSheetService: QuestionSheetService,
    private store: Store<IAppState>
  ) {
    store.dispatch(new ReadActions.GetAllFolders(false));
    this.folders$ = store.select(x => x.crud.read.allFolders.folders).pipe(
      map(x => { 
          let newArr: IFolderSelectData[] = [];
          for (let i = 0; i < x.length; i++) {
            newArr.push({
              id: x[i].id,
              name: x[i].name,
              parentId: x[i].questionSheetId,
              order: 0,
            });
          }
          return newArr;
      }),
    );

    let loadedSub = this.store.select(x => x.crud.read.allFolders.success).subscribe(x => {
      if (x) {
        this.loaded = true; 
        loadedSub.unsubscribe();
        console.log("folders loaded");
      }
    })
   }

  questionsSelected(id: number) {
    this.firsSelectedId = id;
    this.selectingQuestions = false;
  } 

  folderSelected(id: number) {
    this.secondSelectedId = id; 
    alert(this.firsSelectedId + " " + this.secondSelectedId);
  }
}
