import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQsChildIndex } from 'src/app/services/models/question-sheet/qs-child-index';
import { IUserStatus } from 'src/app/services/models/other';
import { RoutePaths } from 'src/app/services/route-paths';

@Component({
  selector: 'getready-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {

  @Input() isGlobal: boolean;
  @Input() sheet: IQsChildIndex;
  @Input() user: IUserStatus;
  @Output() sheetClickedEmitter: EventEmitter<number> = new EventEmitter(); 
  loaded: boolean = false;

  constructor(
    public routePaths: RoutePaths,
  ) { }

  ngOnInit() {
    this.loaded = true;
  }

  onClickSheet(event, id) {
    this.sheetClickedEmitter.emit(id);
  }

  publish() {
    
  }

}
