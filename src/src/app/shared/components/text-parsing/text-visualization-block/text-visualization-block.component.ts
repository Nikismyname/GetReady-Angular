import { Component, OnInit, Input } from '@angular/core';
import { trimEnds } from "../../../../utilities/text-formatting-helpers";
import { ParsingData } from "../../../../services/models/other";

@Component({
  selector: 'getready-text-visualization-block',
  templateUrl: './text-visualization-block.component.html',
  styleUrls: ['../../../../css/text-parsing-shared.css']
})
export class TextVisualizationBlockComponent implements OnInit {

  constructor() { }

  @Input() text: string;
  parsedData: ParsingData[];
  loaded: boolean = false;

  ngOnInit() {
    this.loaded = true;
    this.parsedData = this.parseBlockElements(this.text);
  }

  parseBlockElements(text: string): ParsingData[] {
    let tags = ["<<c>>", "<<e>>"];
    let result: ParsingData[] = [
      new ParsingData(text, false, "text"),
    ];

    for (let j = 0; j < tags.length; j++) {
      let tag = tags[j];
      let newResult = [];
      for (let k = 0; k < result.length; k++) {
        if (result[k].done === true) {
          newResult = newResult.concat(result[k]);
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
            if (tag === "<<c>>") {
              chunk = window["PR"].prettyPrintOne(chunk);
            }
            newResult = newResult.concat(new ParsingData(chunk, true, tag));
          } else {
            newResult = newResult.concat(new ParsingData(chunk, false, "inline"));
          }
        };
      };
      result = newResult;
    };

    // for (let i = 0; i < result.length; i++) {
    //   if (result[i][1] === false) {
    //     result[i][0] = makePre(parseInlineElements(result[i][0], inlineMappings));
    //     result[i][1] = true;
    //   }
    // };

    return result;
  }
}
