import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IQsGlobalIndex } from 'src/app/services/models/question-sheet/qs-global-index';
import { RoutePaths } from 'src/app/utilities/route-paths';
import { IUserStatus } from 'src/app/services/models/other';

@Component({
  selector: 'getready-current-sheet',
  templateUrl: './current-sheet.component.html',
  styleUrls: ['./current-sheet.component.css']
})
export class CurrentSheetComponent implements OnInit {

  @Input() isGlobal: boolean;
  @Input() currentSheet: IQsGlobalIndex;
  @Input() user: IUserStatus;
  @Output() currentSheetClickedEmitter: EventEmitter<number> = new EventEmitter(); 
  loaded: boolean = false;

  constructor(
    public routePaths: RoutePaths,
  ) { }

  ngOnInit() {
    this.loaded = true;
  }

  onClickCurrentSheet(event, id) {
    this.currentSheetClickedEmitter.emit(id);
  }

}
