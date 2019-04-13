import { Component } from '@angular/core';
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { map } from 'rxjs/operators';
import { IFolderSelectData, IItemSelectData } from 'src/app/services/models/contracts/selectors';
import { Observable, Subscription } from 'rxjs';
import { GlobalSheetActions } from "../../actions/global-sheet.action";
import { Router } from '@angular/router';
import * as c from "../../../utilities/route-paths"; 

@Component({
  selector: 'getready-copy-questions',
  templateUrl: './copy-questions.component.html',
  styleUrls: ['./copy-questions.component.css']
})
export class CopyQuestionsComponent {

  successSub: Subscription;
  foldersLoaded: boolean = false;
  itemsLoaded: boolean = false;
  folders$: Observable<IFolderSelectData[]>; 
  items$: Observable<IItemSelectData[]>;

  private selectedItems: number[]; 
  private selectedFolder: number;
  selectingItems: boolean = true;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
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

    store.dispatch(new ReadActions.GetAllItems(true));
    this.items$ = store.select(x => x.crud.read.allItems.items).pipe(
      map(x => { 
          let newArr: IItemSelectData[] = [];
          for (let i = 0; i < x.length; i++) {
            newArr.push({ 
              id: x[i].id,
              name: x[i].name,
              parentId: x[i].questionSheetId,
              order: 0,
              items: x[i].globalQuestions.map(x => Object.assign({}, x, {selected: false})),
              selected: false,
            });
          }
          return newArr;
      }),
    );

    let fildersLoadedSub = this.store.select(x => x.crud.read.allFolders.success).subscribe(x => {
      if (x) {
        this.foldersLoaded = true; 
        fildersLoadedSub.unsubscribe();
      }
    })

    let ItemsLoadedSub = this.store.select(x => x.crud.read.allItems.success).subscribe(x => {
      if (x) {
        this.itemsLoaded = true; 
        ItemsLoadedSub.unsubscribe();
      }
    })

   }

  questionsSelected(ids: number[]) {
    this.selectedItems = ids;
    this.selectingItems = false;
  } 

  folderSelected(id: number) {
    this.selectedFolder = id;
    this.store.dispatch(new GlobalSheetActions.copyQuestions({
      selectedDir: this.selectedFolder, 
      selectedQuestions: this.selectedItems,
    }));

    this.successSub = this.store.select(x => x.global.copyQuestionsSuccess).subscribe(x => {
      console.log("COPY_QUESTIONS_SUCCESS_",x);
      if (x) {
        this.router.navigate([c.personalQuestionSheetsPath+"/"+ this.selectedFolder]);
      }
    });
  }

  folderCreatedRefresh() {
    this.store.dispatch(new ReadActions.GetAllFolders(false));
  }

  ngOnDestroy() {
    if (this.successSub) {
      this.successSub.unsubscribe();
    }
  }

}
