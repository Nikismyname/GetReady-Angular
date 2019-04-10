import { Component, OnInit, Input } from '@angular/core';
import { QIndex } from 'src/app/services/models/question/qGlobalIndex';
import { IUserStatus } from 'src/app/services/models/other';
import { RoutePaths } from 'src/app/utilities/route-paths';

@Component({
  selector: 'getready-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() isGlobal: boolean; 
  @Input() question: QIndex;
  @Input() user: IUserStatus;
  loaded: boolean = false;

  constructor(
    public routePaths: RoutePaths,
  ) { } 

  ngOnInit() {
    this.loaded = true;
  }

  onClickQuestion() {
    if (this.isGlobal) {
      
    } else {
      
    }
  }

  publish() {
    
  }
}
