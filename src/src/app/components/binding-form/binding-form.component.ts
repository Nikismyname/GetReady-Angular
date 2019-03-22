import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getready-binding-form',
  templateUrl: './binding-form.component.html',
  styleUrls: ['./binding-form.component.css']
})
export class BindingFormComponent implements OnInit {

  constructor() { }

  @Output() formOnSubmit: EventEmitter<any> = new EventEmitter();

  submitData: object = {};

  public inputData: FormInputData[] = [
    new FormInputData("username", "Username", "text"),
    new FormInputData("password", "Password", "password"),
    new FormInputData("textareaTest", "TextareaTest", "textarea", "somedata"),
  ];

  ngOnInit() {
    this.inputData.forEach(inputData => {
      if (inputData.data) {
        this.submitData[inputData.name] = inputData.data;
      } else {
        this.submitData[inputData.name] = "";
      }
    });
  }

  onSubmit() {
    console.log(this.submitData);
    this.formOnSubmit.emit(this.submitData);
  }

  onKeyUp(e) {
    this.submitData[e.target.name] = e.target.value;
  }

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
}

class FormInputData {
  constructor(
    public name: string,
    public displayName: string,
    public type: string,
    public data: any = null,
    public placeholder: string = "",
  ) { }
} 
