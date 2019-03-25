import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'getready-with-pretty-print',
  templateUrl: './with-pretty-print.component.html',
  styleUrls: ['./with-pretty-print.component.css']
})
export class WithPrettyPrintComponent implements OnInit {

  constructor() { }

  @Output() public PRLoaded: EventEmitter<void> = new EventEmitter(); 

  ngOnInit() {
    this.runCodePrettify();

    let interval = setInterval(() => {
      if (typeof window["PR"] !== "undefined") {
        clearInterval(interval);
        this.PRLoaded.emit(); 
      }
    }, 20);
  } 

  runCodePrettify() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
  }
}
