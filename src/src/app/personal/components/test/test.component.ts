import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from "../../../store/reducers/index";
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { PersonalSheetActions } from "../../actions/personal-sheet.actions";
import { IScopedData } from "../../../services/models/contracts/scoped-data";
import { Subscription, Observable } from 'rxjs';
import * as c from 'src/app/utilities/route-paths';
import { IButtonsRenderInformation, IButtonRenderInformation } from 'src/app/services/models/contracts/button-renderer';

@Component({
  selector: 'getready-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnDestroy {

  questionIds: any[];
  id: string;
  isSingle: boolean;
  dataSub: Subscription;
  indexSub: Subscription;
  questionSuccessSub: Subscription;
  currentInd: number;
  currentQuestion$: Observable<any>;
  PRLoaded: boolean = false;
  firstQuestionLoaded: boolean = false;
  loaded: boolean = false;

  shouldShowComment: boolean = false; 
  shouldShowAnswer: boolean = false;

  userAnswer: string = "";
  userRating: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>,
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isSingle = this.route.snapshot.paramMap.get("mode") === "single" ? true : false;

    this.indexSub = this.store.select(x => x.personal.test.currentInd).subscribe(x => { 
      this.currentInd = x;
      if (this.currentInd !== 0 && this.currentInd >= this.questionIds.length) {
        this.router.navigate([c.personalQuestionSheetsPath+"/-1"]);
      } else if (this.firstQuestionLoaded) {
        this.resetUIState();
        this.displayQuestion();
      }
    });

    this.questionSuccessSub = store
      .select(x => x.crud.read.question.success)
      .subscribe(x => {
        if (x) {
          this.firstQuestionLoaded = true;
          this.questionSuccessSub.unsubscribe();
        }
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
    this.currentQuestion$ = this.store.select(x => x.crud.read.question.question);
  }

  onPrLoaded() {
    this.PRLoaded = true;
  }

  onClickNext = () => { 
    if (this.userRating !== -1) {
      this.store.dispatch(new PersonalSheetActions.addNewScore({
        score: this.userRating, 
        questionId: this.questionIds[this.currentInd],
      }));
    }
    this.store.dispatch(new PersonalSheetActions.incrementCurrentIndex(1));
  }

  onClickPrev = () =>  {
    if (this.currentInd !== 0){
      this.store.dispatch(new PersonalSheetActions.incrementCurrentIndex(-1));
    } else {
    }
  }

  showComment = () => {
    this.shouldShowComment = !this.shouldShowComment;
  }

  showAnswer = () => { 
    this.shouldShowAnswer = !this.shouldShowAnswer;
  }

  resetUIState() {
    this.shouldShowAnswer = false;
    this.shouldShowComment = false;
    this.userRating = -1;
  }

  get buttons(): IButtonsRenderInformation {
    let buttons: IButtonRenderInformation[] =  [
      {
        name: "Show Comment",
        styles: "",
        function: this.showComment, 
      },
      {
        name: "Show Answer", 
        styles: "", 
        function: this.showAnswer, 
      }
    ]

    if (this.isSingle) {
      buttons.push({ 
        name: "Done",
        styles: "",
        function: this.onClickNext, 
      })
    } else {
      buttons.push({ 
        name: "Previous",
        styles: "",
        function: this.onClickPrev, 
      })

      buttons.push({ 
        name: "Next",
        styles: "",
        function: this.onClickNext, 
      })
    }

    return {
      type: "default", 
      buttons: buttons,
    }
  }

  ngOnDestroy() {
    if (this.dataSub) {
      this.dataSub.unsubscribe();
    }
    this.indexSub.unsubscribe();
    this.questionSuccessSub.unsubscribe();
  }

}
