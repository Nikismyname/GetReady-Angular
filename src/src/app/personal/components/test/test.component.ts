import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAppState } from "../../../store/reducers/index";
import { Store } from '@ngrx/store';
import { ReadActions } from "../../../crud/actions/read.actions";
import { PersonalSheetActions } from "../../actions/personal-sheet.actions";
import { IScopedData } from "../../../services/models/others/scoped-data";
import { Subscription, Observable } from 'rxjs';
import * as c from 'src/app/services/route-paths';
import {
  IButtonsRenderInformation,
  IButtonRenderInformation
} from 'src/app/services/models/others/button-renderer';
import { filter, take } from 'rxjs/operators';
import { IGlobalQuestion } from 'src/app/services/models/question/global-question';
import { IPersonalQuestion } from 'src/app/services/models/question/personal-question';
//typed
@Component({
  selector: 'getready-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnDestroy {

  questionIds: number[];
  id: number;
  isSingle: boolean;
  indexSub: Subscription;
  currentInd: number;
  currentQuestion$: Observable<IGlobalQuestion|IPersonalQuestion>;
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
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.isSingle = this.route.snapshot.paramMap.get("mode") === "single" ? true : false;

    this.currentQuestion$ = this.store.select(x => x.crud.read.question.question);

    if (this.isSingle) {
      this.questionIds = [this.id];
      this.loaded = true;
    } else {
      this.store.select(x => x.personal.test.qIdsForSheet).pipe(take(1)).subscribe(x => {
        this.questionIds = x.ids;
        this.loaded = true;
      })
    }
    
    this.indexSub = this.store.select(x => x.personal.test.currentInd).subscribe(x => {
      this.currentInd = x;
      if (this.currentInd !== 0 && this.currentInd >= this.questionIds.length) {
        this.router.navigate([c.personalQuestionSheetsPath + "/-1"]);
      } else if (this.firstQuestionLoaded) {
        this.resetUIState();
        this.displayQuestion();
      }
    });

    this.displayQuestion();

    this.store
      .select(x => x.crud.read.question.success)
      .pipe(filter(x => x), take(1))
      .subscribe(x => {
          this.firstQuestionLoaded = true;
      });
  }

  displayQuestion() {
    let data: IScopedData = { data: this.questionIds[this.currentInd], global: false };
    this.store.dispatch(new ReadActions.Question(data));
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

  onClickPrev = () => {
    if (this.currentInd !== 0) {
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

  back = () => {
    this.router.navigate([c.personalQuestionSheetsPath + "/-1"]);
  }

  resetUIState() {
    this.shouldShowAnswer = false;
    this.shouldShowComment = false;
    this.userAnswer = "";
    this.userRating = -1;
  }

  get buttons(): IButtonsRenderInformation {
    let buttons: IButtonRenderInformation[] = [
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
      buttons.push({
        name: "Back",
        styles: "",
        function: this.back,
      })
    }

    return {
      type: "default",
      buttons: buttons,
    }
  }

  ngOnDestroy() {
    this.indexSub.unsubscribe();
  }

}
