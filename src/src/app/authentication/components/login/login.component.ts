import { Component, OnDestroy } from '@angular/core';
import { FormInputData } from "../../../services/models/others/form-input-data";
import { FormData } from "../../../services/models/others/form-data";
import { Store } from '@ngrx/store';
import { IAuthState } from '../../reducers';
import { AuthActions } from "../../actions/auth.actions";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginData } from 'src/app/services/models/others/login-data';
//1 //typed
@Component({ 
  selector: 'getready-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  successSub: Subscription;
  formData: FormData = new FormData(
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

  onFormSubmit(data: ILoginData) {
    this.store.dispatch(new AuthActions.login(data));
  }
  
  ngOnDestroy() {
    this.successSub.unsubscribe();
  }

}
