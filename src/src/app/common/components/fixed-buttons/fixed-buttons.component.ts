import { Component, OnInit, ContentChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'getready-fixed-buttons',
  templateUrl: './fixed-buttons.component.html',
  styleUrls: ['./fixed-buttons.component.css']
})
export class FixedButtonsComponent implements OnInit {

  constructor() { }

  @ContentChildren("buttonRef") buttons: QueryList<ElementRef>;

  ngAfterContentInit() {
    this.buttons.forEach(x => { 
      x.nativeElement.innerText = "test value";
      x.nativeElement.className += " btn btn-primary";
    }); 
    this.buttons.forEach(x=>console.log(x));
  }

  ngOnInit() {
  }

}
