import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QsChildIndex } from 'src/app/services/models/question-sheet/qsChildIndex';
import { IUserStatus } from 'src/app/services/models/other';
import { ReorderService } from 'src/app/services/reorder-service';

@Component({
  selector: 'getready-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.css']
})
export class SheetListComponent implements OnInit {

  sheets: QsChildIndex[];
  @Input("sheets") set sheetSetter(data: QsChildIndex[]) {
    this.sheets = data.sort((a, b) => a.order - b.order);
    console.log("LSIT_SHEETS_HERE:", this.sheets);
  }
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
    this.onDoppedEmitter.emit(orderings);
  }
 
}
