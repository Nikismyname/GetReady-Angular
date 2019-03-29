import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormData } from "../../../services/models/other";
import { textFormattingMappings } from "../../../utilities/route-paths";

@Component({
  selector: 'getready-binding-form',
  templateUrl: './binding-form.component.html',
  styleUrls: ['./binding-form.component.css']
})
export class BindingFormComponent implements OnInit {

  constructor(private location: Location) { }

  @Input() formData: FormData;
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();
  loaded: boolean = false;
  submitData: object = {};
  mappings: string[] = textFormattingMappings;

  ngOnInit() {
    let inputData = this.formData.inputData; 

    inputData.forEach(inputData => {
      if (inputData.data) {
        this.submitData[inputData.name] = inputData.data;
      } else {
        this.submitData[inputData.name] = "";
      }
    });

    this.loaded = true;
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.onFormSubmit.emit(this.submitData);
  }

  onClickBack() {
    this.location.back();
  } 

  /* #region  Tag ShortCuts */
  handleKeyDown(event, name) {
    console.log(this.submitData["textarea"]);

    let shortCutEffects = {
        /*D*/ 68: function (selection) { return "<<p>>\n" + selection + "\n<<p>>" },

        /*A*/ 65: function (selection) { return "<<c>>\n" + selection + "\n<<c>>" },
        /*F*/ 70: function (selection) { return "<<e>>\n" + selection + "\n<<e>>" },

        /*S*/ 83: function (selection) { return "<<s>>" + selection + "<<s>>" },
        /*G*/ 71: function (selection) { return "<<em>>" + selection + "<<em>>" },
    };

    if (event.ctrlKey) {
      let keys = Object.keys(shortCutEffects);
      if (keys.includes(event.keyCode.toString())) {
        event.preventDefault();
        event.stopPropagation();

        console.log(event);

        let action = shortCutEffects[event.keyCode];

        let start = event.target.selectionStart;
        let end = event.target.selectionEnd;
        let value = event.target.value;
        //let name = event.target.name;

        let prePart = value.slice(0, start);
        let selection = value.slice(start, end);
        let postPart = value.slice(end)
        selection = action(selection);
        let newVal = prePart + selection + postPart;


        this.submitData[name] = newVal;
        console.log(this.submitData[name]);
      }
    }
  }
  /* #endregion */
}
