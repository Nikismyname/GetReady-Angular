import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQGlobalIndex } from 'src/app/services/models/question/q-global-index';
import { ReorderService } from 'src/app/services/reorder-service';
import { IUserStatus } from "src/app/services/models/others/user-status";
import { IReorderQuestions } from "src/app/services/models/others/reorder-questions";
import { IReorderData } from 'src/app/services/models/question/question-reorder';
//typed
@Component({
  selector: 'getready-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent {

  questions: IQGlobalIndex[]
  @Input() sheetId: number;
  @Input() isGlobal: boolean;
  @Input() user: IUserStatus;
  @Input("questions") set questionsSetter(val: IQGlobalIndex[]) {
    this.questions = val.sort((a, b) => a.order - b.order);
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].order = i;
    }
    
    let questionCount = this.questions.length;
    this.colOneQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 1));
    this.colTwoQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 2));
    this.colThreeQuestions = this.questions
      .filter(x => this.reorderService.shouldDisplay(questionCount, x.order, 3));
    this.loaded = true;
  };
  @Output() dropped: EventEmitter<IReorderData> = new EventEmitter();
  loaded: boolean = false;

  colOneQuestions: IQGlobalIndex[];
  colTwoQuestions: IQGlobalIndex[];
  colThreeQuestions: IQGlobalIndex[];

  constructor(
    private reorderService: ReorderService,
  ) { }

  onDropped(event) {
    let e: IReorderQuestions = { questionNumber: this.questions.length, reorderEvent: event };
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
    let qr: IReorderData = {
      orderings: orderings,
      sheetId: this.sheetId,
    };
    this.dropped.emit(qr);
  }

}
