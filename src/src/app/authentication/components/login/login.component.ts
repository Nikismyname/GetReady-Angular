import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormInputData, FormData, IUser } from "../../../services/models/other";
import { Store } from '@ngrx/store';
import { IAuthState } from '../../reducers';
import { AuthActions } from "../../actions/auth.actions";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
//1
@Component({
  selector: 'getready-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  successSub: Subscription;
  formData = new FormData(
    [
      new FormInputData("username", "Username", "string"),
      new FormInputData("password", "Password", "password"),
    ],
    "Login Form", "Login", false);
  

  constructor(
    private store: Store<IAuthState>,
    private router: Router,
  ) {
    this.successSub = this.store.select(x => x.auth.loginSuccess).subscribe(success => {
      if (success === true) {
        this.router.navigate([""]);
      }
    });
  }

  onFormSubmit(data) {
    this.store.dispatch(new AuthActions.login(data));
  }
  
  ngOnDestroy() {
    this.successSub.unsubscribe();
  }

}
