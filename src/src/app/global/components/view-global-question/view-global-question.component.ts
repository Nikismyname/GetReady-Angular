import { Component, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { ReadActions } from 'src/app/crud/actions/read.actions';
import { ActivatedRoute } from '@angular/router';
import { IButtonsRenderInformation } from 'src/app/services/models/contracts/button-renderer';

@Component({
  selector: 'getready-view-global-question',
  templateUrl: './view-global-question.component.html',
  styleUrls: ['./view-global-question.component.css']
})
export class ViewGlobalQuestionComponent implements OnDestroy {

  question$: Observable<any>;
  PRLoaded: boolean = false;
  loaded: boolean = false;
  successSub: Subscription;

  showCommentb: boolean = false; 
  showAnswerb: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    let id = activatedRoute.snapshot.paramMap.get("id");
    this.store.dispatch(new ReadActions.Question({
      data: id,
      global: true,
    }));
    this.question$ = this.store.select(x => x.crud.read.question.question);
    this.successSub = this.store.select(x => x.crud.read.question.success).subscribe(x=>{
      if (x) {
        this.loaded = true; 
        this.successSub.unsubscribe();
      }
    })

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

  ngOnDestroy() {
    if (this.successSub) {
      this.successSub.unsubscribe();
    }
  }
} 
