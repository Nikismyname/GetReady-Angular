import { Component, OnInit, Input } from '@angular/core';
import { IButtonsRenderInformation } from 'src/app/services/models/others/button-renderer';
//typed
@Component({
  selector: 'getready-buttons-renderer',
  templateUrl: './buttons-renderer.component.html',
  styleUrls: ['./buttons-renderer.component.css']
})
export class ButtonsRendererComponent implements OnInit {

  @Input() data: IButtonsRenderInformation;
  loaded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loaded = true;
  }

}
