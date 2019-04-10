import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QIndex } from 'src/app/services/models/question/qGlobalIndex';
import { ReorderService } from 'src/app/services/reorder-service';
import { IUserStatus, IReorderQuestion } from 'src/app/services/models/other';

@Component({
  selector: 'getready-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit {

  questions: QIndex[]
  @Input() isGlobal: boolean;
  @Input() user: IUserStatus;
  @Input("questions") set questionsSetter(val: any) {
    this.questions = val;
    let questionCount = this.questions.length;
    this.colOneQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 1));
    this.colTwoQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 2));
    this.colThreeQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 3));
    this.loaded = true;
    console.log("ALL_QUESTIONS_UPDATED");
  };
  @Output() dropped: EventEmitter<any> = new EventEmitter();
  loaded: boolean = false;

  colOneQuestions: QIndex[];
  colTwoQuestions: QIndex[];
  colThreeQuestions: QIndex[];

  constructor(
    private reorderService: ReorderService,
  ) { }

  ngOnInit() {

  }

  onDropped(event) {
    let e: IReorderQuestion = { questionNumber: this.questions.length, reorderEvent: event };
    let container = e.reorderEvent.container;
    let qc = e.questionNumber;
    let currColumn = container.data;
    let prevContainer = e.reorderEvent.previousContainer;
    let prevColumn = prevContainer.data;
    let currentIndex = e.reorderEvent.currentIndex;
    let prevIndex = e.reorderEvent.previousIndex;

    let orderings = this.reorderService.generateOrderingWithElements(
      this.questions,
      currentIndex,
      prevIndex,
      currColumn,
      prevColumn
    );
    this.dropped.emit(orderings);
  }

}
