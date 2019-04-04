import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  store$: Observable<any>;
  constructor(
    public wholeStore: Store<any>,
  ) {
    this.store$ = wholeStore.pipe(map(x => x["crud"]));
    this.wholeStore.subscribe(x => {
      console.log("state here", x);
    })
  }
}
