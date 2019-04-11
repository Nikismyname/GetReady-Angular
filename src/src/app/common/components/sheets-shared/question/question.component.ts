import { Component, OnInit, Input } from '@angular/core';
import { IQGlobalIndex } from 'src/app/services/models/question/q-global-index';
import { IUserStatus } from 'src/app/services/models/other';
import { RoutePaths } from 'src/app/utilities/route-paths';
import * as c from 'src/app/utilities/route-paths';
import { Router } from '@angular/router';

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
  ) { } 

  ngOnInit() {
    this.loaded = true;
  }

  onClickQuestion() {
    if (this.isGlobal) {
      
    } else {
      this.router.navigate([c.testPath+"/"+ this.question.id + "/single"]);
    }
  }

  publish() {
    
  }
}
