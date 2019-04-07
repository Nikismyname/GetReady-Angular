import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData, User } from "../../../services/models/other";
import { Store } from '@ngrx/store';
import { IAuthState } from '../../reducers';
import { AuthActions } from "../../actions/auth.actions";
import { Subscription } from 'rxjs';

@Component({
  selector: 'getready-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  successSub: Subscription;

  constructor(
    private location: Location,
    private store: Store<IAuthState>,
  ) {
  }

  formData = new FormData(
    [
      new FormInputData("username", "Username", "string"),
      new FormInputData("password", "Password", "password"),
    ],
    "Login Form", "login", false);
  
  ngOnInit() {
    this.successSub = this.store.select(x => x.auth.loginSuccess).subscribe(success => {
      if (success === true) {
        this.location.back();
      }
    });
  }

  onFormSubmit(data) {
    console.log(data);
    this.store.dispatch(new AuthActions.login(data));
  }
  
  ngOnDestroy() {
    this.successSub.unsubscribe();
  }

}
