import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from "../../../store/reducers/index";
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { PersonalSheetActions } from "../../actions/personal-sheet.actions";
import { IScopedData } from "../../../services/models/contracts/scoped-data";
import { Subscription } from 'rxjs';

@Component({
  selector: 'getready-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnDestroy {

  questionIds: any[];
  id: string;
  isSingle: boolean;
  loaded: boolean = false;
  dataSub: Subscription;
  indexSub: Subscription;
  questionSub: Subscription;
  currentInd: number;
  currentQuestion: any;
  PRLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isSingle = this.route.snapshot.paramMap.get("mode") === "single" ? true : false;

    this.indexSub = this.store.select(x => x.personal.test.currentInd).subscribe(x => { 
      this.currentInd = x;
    });

    if (this.isSingle) {
      this.questionIds = [this.id];
      this.loaded = true;
      this.displayQuestion();
    } else {
      this.store.dispatch(new PersonalSheetActions.getQIdsForSheet(Number(this.id)));
      this.dataSub = this.store.select(x => x.personal.test.qIdsForSheet).subscribe(x => { 
        if (x.success === true) {
          this.questionIds = x.ids;
          this.loaded = true;
          this.displayQuestion();
        }
      });
    }
  }

  displayQuestion() {
    let data: IScopedData = { data: this.questionIds[this.currentInd], global: false };
    this.store.dispatch(new ReadActions.Question(data));
    this.questionSub = this.store.select(x => x.crud.read.question).subscribe(x => {
      console.log(JSON.stringify(x));
      if (x.success) {
        this.currentQuestion = x.question;
      }
    })
  }

  onPrLoaded() {
    this.PRLoaded = true;
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    this.indexSub.unsubscribe();
    this.questionSub.unsubscribe();
  }

}
