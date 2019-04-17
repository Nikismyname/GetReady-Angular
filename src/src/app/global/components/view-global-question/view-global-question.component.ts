import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IButtonsRenderInformation } from 'src/app/services/models/contracts/button-renderer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'getready-view-global-question',
  templateUrl: './view-global-question.component.html',
  styleUrls: ['./view-global-question.component.css']
})
export class ViewGlobalQuestionComponent {

  question$: Observable<any>;
  PRLoaded: boolean = false;

  showCommentb: boolean = false; 
  showAnswerb: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private location: Location,
  ) {
    this.question$ = this.store.select(x => x.crud.read.question.question).pipe(take(1));
  }

  prLoaded() {
    this.PRLoaded = true;
  }

  onClickBack = () => {
    this.location.back();
  }

  showComment = () => { 
    this.showCommentb = !this.showCommentb;
  }

  showAnswer = () => { 
    this.showAnswerb = !this.showAnswerb;
  }

  get buttons():IButtonsRenderInformation {
    return {
      type: "default", 
      buttons: [
        {
          name: "Show Comment",
          styles: "",
          function: this.showComment, 
        },
        {
          name: "Show Answer", 
          styles: "", 
          function: this.showAnswer, 
        },
        {
          name: "Back",
          function: this.onClickBack, 
          styles: "",
        },
      ]
    }
  } 
} 
