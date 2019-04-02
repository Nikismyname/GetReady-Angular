import { Component, OnInit, Input } from '@angular/core';
import { trimEnds } from "../../../../utilities/text-formatting-helpers";
import { ParsingData } from "../../../../services/models/other";

@Component({
  selector: 'getready-text-visualisation-tblock',
  templateUrl: './text-visualisation-tblock.component.html',
  styleUrls: ['./text-visualisation-tblock.component.css']
})
export class TextVisualisationTBlockComponent implements OnInit {

  constructor() { }

  @Input() text: string;
  loaded: boolean = false;
  parsedData: ParsingData[]; 

  ngOnInit() {
    this.loaded = true;
    this.parsedData = this.parseTransperantBlockElements(this.text); 
  }

  parseTransperantBlockElements(text) {
    let tags = ["<<p>>", "<<y>>"]
    let result = [
      new ParsingData(text, false, "text")
    ];

    for (let j = 0; j < tags.length; j++) {
      let tag = tags[j];
      let newResult = [];
      for (let k = 0; k < result.length; k++) {
        if (result[k].done === true) {
          newResult.push(result[k]);
          continue;
        };
        if (result[k].text.length === 0 || result[k].text === "\n") {
          continue;
        };

        let currText = result[k].text;
        let chunks = currText.split(tag);
        let toEqual = 1;
        for (let i = 0; i < chunks.length; i++) {
          let chunk = chunks[i];
          if (i % 2 === toEqual) {
            chunk = trimEnds(chunk);
            let data = new ParsingData(chunk, true, tag); 
            newResult.push(data);
          } else {
            let data = new ParsingData(chunk, false, "text"); 
            newResult.push(data);
          }
        };
      };
      result = newResult;
    };

    return result;
  }
}