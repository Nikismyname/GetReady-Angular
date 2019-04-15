import { Component, OnInit, Input } from '@angular/core';
import { IQGlobalIndex } from 'src/app/services/models/question/q-global-index';
import { IUserStatus } from 'src/app/services/models/other';
import { RoutePaths } from 'src/app/services/route-paths';
import * as c from 'src/app/services/route-paths';
import { Router } from '@angular/router';
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { PersonalSheetActions } from "../../../../personal/actions/personal-sheet.actions"; 

@Component({
  selector: 'getready-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() isGlobal: boolean; 
  @Input() question: IQGlobalIndex;
  @Input() user: IUserStatus;
  loaded: boolean = false;
 
  constructor(
    public routePaths: RoutePaths,
    private router: Router,
    private store: Store<IAppState>,
  ) { } 

  ngOnInit() {
    this.loaded = true;
  }

  onClickQuestion() {
    if (this.isGlobal) {
      this.router.navigate([c.viewGlobalQuestion+"/"+this.question.id]);
    } else {
      this.router.navigate([c.testPath+"/"+ this.question.id + "/single"]);
    }
  }

  publish(e) {
    e.preventDefault();
    e.stopPropagation();
    this.store.dispatch(new PersonalSheetActions.suggestForPublishing(this.question.id));
  }

  stopPropagation(e) {
    e.stopPropagation();
  }
}
