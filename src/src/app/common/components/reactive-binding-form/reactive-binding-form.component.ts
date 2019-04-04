import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormData as myFormData } from "../../../services/models/other";
import { Location } from '@angular/common';
import { textFormattingMappings } from "../../../utilities/route-paths";

@Component({
  selector: 'getready-reactive-binding-form',
  templateUrl: './reactive-binding-form.component.html',
  styleUrls: ['./reactive-binding-form.component.css']
})
export class ReactiveBindingFormComponent implements OnInit {

  form: FormGroup;
  loaded: boolean = false;
  mappings: string[] = textFormattingMappings;
  @Input() formData: myFormData;
  @Output() onFormSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    let formControlsGroup = {};
    for (let i = 0; i < this.formData.inputData.length; i++) {
      const input = this.formData.inputData[i];
      formControlsGroup[input.name] = ["", Validators.nullValidator];
    }
    this.form = this.fb.group(formControlsGroup);
    for (let i = 0; i < this.formData.inputData.length; i++) {
      const input = this.formData.inputData[i];
      this.form.patchValue({[input.name]: input.data});
    }
    this.loaded = true;
  } 

  handleKeyDown(event, name) {

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

        let action = shortCutEffects[event.keyCode];

        let start = event.target.selectionStart;
        let end = event.target.selectionEnd;
        let value = event.target.value;
        
        let prePart = value.slice(0, start);
        let selection = value.slice(start, end);
        let postPart = value.slice(end)
        selection = action(selection);
        let newVal = prePart + selection + postPart;
        console.log(newVal);

        this.form.patchValue({[name]: newVal}); 
      }
    }
  }

  onClickBack() {
    this.location.back();
  }

  onSubmit() { 
    this.onFormSubmit.emit(this.form.value);
  }

}
