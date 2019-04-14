import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQGlobalIndex } from 'src/app/services/models/question/q-global-index';
import { IUserStatus } from 'src/app/services/models/other';

@Component({
  selector: 'getready-question-column',
  templateUrl: './question-column.component.html',
  styleUrls: ['./question-column.component.css']
})
export class QuestionColumnComponent implements OnInit {

  questions: IQGlobalIndex[];
  @Input("questions") set questionsSetter(data: IQGlobalIndex[]) {
    this.questions = data;
    console.log("QUESTION_COLUMN_UPDATED");
  }
  @Input() user: IUserStatus;
  @Input() isGlobal: boolean;
  @Input() colNumber: number;
  @Output() onDroppedEmitter: EventEmitter<any> = new EventEmitter();
  loaded: boolean = false;

  constructor(
  ) { }

  ngOnInit() { 
    this.loaded = true; 
  }

  onDropped(event) {
    this.onDroppedEmitter.emit(event);
  }

  onClickQuestion(event, id) {
    
  } 

}
