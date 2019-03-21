import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'getready-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  constructor() { }
  text: string = "start\nleft<<s>>var i = 5;<<s>>right\nend";
  PRLoaded: boolean = false;
  shouldDisplay: boolean = true;

  ngOnInit() {
    this.runCodePrettify();

    let counter = 0;
    let interval = setInterval(() => {
      if (typeof window.PR !== "undefined") {
        this.PRLoaded = true;
        clearInterval(interval);
        console.log("PR Loaded");
      } else {
        counter++;
        if (counter > 100) {
          clearInterval(interval);
          console.log("Loading Prettify Failed!");
        }
      }
    }, 20);
  }

  onCickDisplay(text: string) {
    this.text = text;
    this.shouldDisplay = true;
  }

  runCodePrettify() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  }
}
