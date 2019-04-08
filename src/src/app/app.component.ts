import { Component } from "@angular/core";
import { Store } from '@ngrx/store';
import { IAuthState } from './authentication/reducers';
import { AuthActions } from "./authentication/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private store: Store<IAuthState>,
  ) {
    let savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      let user = JSON.parse(savedUser);
      this.store.dispatch(new AuthActions.loginSuccess(user));
      this.store.dispatch(new AuthActions.clear());
    }  
  }
}
