import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormInputData, FormData, User } from "../../../services/models/other";
import { Store } from '@ngrx/store';
import { IAuthState } from '../../reducers';
import { AuthActions } from "../../actions/auth.actions";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as c from "../../../utilities/route-paths"; 

@Component({
  selector: 'getready-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  successSub: Subscription;

  constructor(
    private store: Store<IAuthState>,
    private router: Router,
  ) {
  }

  formData = new FormData(
    [
      new FormInputData("username", "Username", "string"),
      new FormInputData("password", "Password", "password"),
    ],
    "Login Form", "Login", false);
  
  ngOnInit() {
    this.successSub = this.store.select(x => x.auth.loginSuccess).subscribe(success => {
      if (success === true) {
        this.router.navigate([""]);
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
