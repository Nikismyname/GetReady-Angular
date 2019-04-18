import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQsChildIndex } from 'src/app/services/models/question-sheet/qs-child-index';
import { IUserStatus } from "src/app/services/models/others/user-status";
import { ReorderService } from 'src/app/services/reorder-service';
import { IReorderData } from 'src/app/services/models/question/question-reorder';
//typed
@Component({
  selector: 'getready-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.css']
})
export class SheetListComponent implements OnInit {

  sheets: IQsChildIndex[];
  @Input("sheets") set sheetSetter(data: IQsChildIndex[]) {
    this.sheets = data.sort((a, b) => a.order - b.order);
  }
  @Input() sheetId: number;
  @Input() user: IUserStatus;
  @Input() isGlobal: boolean;
  @Output() onClickSheet: EventEmitter<Number> = new EventEmitter();
  @Output() onDoppedEmitter: EventEmitter<any> = new EventEmitter(); 
  loaded: boolean = false;

  constructor(
    private reorderService: ReorderService,
  ) { }

  ngOnInit() {
    this.loaded = true;
  }

  onClick(event) {
    this.onClickSheet.emit(event);
  }

  onDropped(e) {
    let currentIndex = e.currentIndex;
    let prevIndex = e.previousIndex;
    let orderings = this.reorderService.generateReorderingsSheet(this.sheets, currentIndex, prevIndex);
    let qr: IReorderData = {
      orderings: orderings,
      sheetId: this.sheetId,
    };
    this.onDoppedEmitter.emit(qr);
  }
 
}
