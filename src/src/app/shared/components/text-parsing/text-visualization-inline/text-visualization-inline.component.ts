import { Component, OnInit, Input } from "@angular/core";
import { trimEnds, replaceTags } from "../../../../utilities/text-formatting-helpers";

@Component({
  selector: 'getready-text-visualization-inline',
  templateUrl: './text-visualization-inline.component.html',
  styleUrls: ['../../../../css/text-parsing-shared.css'],
})
export class TextVisualizationInlineComponent implements OnInit {

  constructor() { }

  @Input() text: string;
  formatetText: any[] = [];
  loaded: boolean = false;
  
  ngOnInit() {
    this.formatetText = this.parseInlineElements(this.text);
    this.loaded = true;
  }

  parseInlineElements(text) {
    let tags = ["<<em>>", "<<s>>"];
    let lines = [];
    let currentIndexForLine = [];
    for (let i = 0; i < tags.length; i++) {
      lines[i] = [];
      currentIndexForLine[i] = 0;
    };

    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];

      let index = text.indexOf(tag);
      while (index !== -1) {
        lines[i].push(index);
        index = text.indexOf(tag, index + 1);
      }
    };

    let result = [];
    let prevIndex = 0;

    while (true) {
      let minTextIndex = Number.MAX_SAFE_INTEGER;
      let secondTextIndex;
      let index;
      let currTag;
      let foundOne = false;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length < 2 || lines[i].length <= currentIndexForLine[i]) {
          continue;
        }

        if (lines[i][currentIndexForLine[i]] < minTextIndex) {
          minTextIndex = lines[i][currentIndexForLine[i]];
          secondTextIndex = lines[i][currentIndexForLine[i] + 1]
          index = i;
          currTag = tags[i];
          foundOne = true;
        }
      };

      if (foundOne === false) {
        break;
      } else {
        currentIndexForLine[index] += 2;
      }

      let tagLength = currTag.length;

      let startIndex = minTextIndex;
      let endIndex = secondTextIndex;


      let preText = text.slice(prevIndex, startIndex);
      if (preText.length !== 0 && preText !== "\n") {
        preText = trimEnds(preText);
        result = result.concat({ text: preText, type: "text" });
      }

      let specialText = text.slice(startIndex + tagLength, endIndex);
      specialText = replaceTags(specialText);
      specialText = trimEnds(specialText);
      if (currTag = "<<s>>") {
        specialText = window["PR"].prettyPrintOne(specialText); 
      }
      result = result.concat({ text: specialText, type: currTag });
      let specialTextSymbolAfterTag = text.slice(endIndex + tagLength, endIndex + tagLength + 1)
      if (specialTextSymbolAfterTag === "\n") {
        result = result.concat({ text: "br", type: "<br>" });
      }

      prevIndex = endIndex + tagLength;
    };

    let trailingText = text.slice(prevIndex);
    if (trailingText.length !== 0 && trailingText !== "\n") {
      trailingText = trimEnds(trailingText);
      result = result.concat({text:trailingText, type:"text"});
    }

    return result;
  }
}
