import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'getready-text-visualisation-tblock',
  templateUrl: './text-visualisation-tblock.component.html',
  styleUrls: ['./text-visualisation-tblock.component.css']
})
export class TextVisualisationTBlockComponent implements OnInit {

  constructor() { }
  
  @Input() text: string;

  ngOnInit() {
    //do work here
  }
}
