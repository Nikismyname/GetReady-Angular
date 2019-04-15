import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { AuthActions } from "./authentication/actions/auth.actions";
import { IAppState } from './store/reducers';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private store: Store<IAppState>,
  ) {
    let savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      let user = JSON.parse(savedUser);
      this.store.dispatch(new AuthActions.loginSuccess(user));
      this.store.dispatch(new AuthActions.clear());
    } 

    this.store.select(x => x.crud.read.question).subscribe(x=> {
      console.log("QUESTION_CHANGED_", x);
    });
  }
}
