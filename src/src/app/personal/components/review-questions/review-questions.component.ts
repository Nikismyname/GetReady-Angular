import { Component } from '@angular/core';
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPQForUserReview } from 'src/app/services/models/others/pq-for-user-review';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as c from "../../../services/route-paths";
//typed
@Component({
  selector: 'getready-review-questions',
  templateUrl: './review-questions.component.html',
  styleUrls: ['./review-questions.component.css']
})
export class ReviewQuestionsComponent {

  questions$: Observable<IPQForUserReview[]>;
  nameAsc: boolean = true;
  arAsc: boolean = true;
  taAsc: boolean = true;
  diffAsc: boolean = true;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
  ) {
    this.questions$ = this.store
      .select(x => x.personal.questionReview.questions)
      .pipe(take(1));
  }

  sortByName() {
    if (this.nameAsc) {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => a.name.localeCompare(b.name))));
    } else {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => b.name.localeCompare(a.name))));
    }
    this.nameAsc = !this.nameAsc;
  }

  sortByAr() {
    if (this.arAsc) {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => a.answerRate - b.answerRate)));
    } else {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => b.answerRate - a.answerRate)));
    }
    this.arAsc = !this.arAsc;
  }

  sortByTa() {
    if (this.taAsc) {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => a.timesBeingAnswered - b.timesBeingAnswered)));
    } else {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => b.timesBeingAnswered - a.timesBeingAnswered)));
    }
    this.taAsc = !this.taAsc;
  }

  sortByDiff() {
    if (this.diffAsc) {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => a.difficulty - b.difficulty)));
    } else {
      this.questions$ = this.questions$.pipe(map(x => x.sort((a, b) => b.difficulty - a.difficulty)));
    }
    this.diffAsc = !this.diffAsc;
  }

  navigateToQuestion(id: number) {
    this.router.navigate([c.testPath+"/"+id+"/single"]);
  }

}
