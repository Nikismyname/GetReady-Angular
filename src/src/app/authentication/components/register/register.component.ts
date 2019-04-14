import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormInputData, FormData, IUser } from "../../../services/models/other";
import { Store } from '@ngrx/store';
import { IAuthState } from '../../reducers';
import { AuthActions } from "../../actions/auth.actions";
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as c from "../../../services/route-paths";

@Component({
  selector: 'getready-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  successSub: Subscription;

  constructor(
    private store: Store<IAuthState>,
    private router: Router,

  ) {
  }

  formData = new FormData(
    [
      new FormInputData("username", "Username", "string", null,
        [
          Validators.required,
          Validators.minLength(3)
        ],
        {
          minLength: "Username must be at least three characters long!",
        }),
      new FormInputData("password", "Password", "password", null,
        [
          Validators.required,
          Validators.minLength(6),
        ],
        {
          minLength: "Password must be at least six caracters long!",
        }),
      new FormInputData("repeatPassword", "Repeat Password", "password"),
      new FormInputData("firstName", "First Name", "string", null,
        [
          Validators.required,
          Validators.minLength(2),
        ],
        {
          minLength: "First Name must be at least two character long!",
        }),
      new FormInputData("lastName", "Last Name", "string", null,
        [
          Validators.required,
          Validators.minLength(2),
        ],
        {
          minLength: "Last Name must be at least two character long!",
        }),
    ],
    "Register Form", "Register", false, false);

  ngOnInit() {
    this.successSub = this.store.select(x => x.auth.registerSuccess).subscribe(success => {
      if (success === true) {
        this.router.navigate([c.loginPath]);
      }
    });
  }

  onFormSubmit(data) {
    console.log(data);
    this.store.dispatch(new AuthActions.register(data));
  }

  ngOnDestroy() {
    this.successSub.unsubscribe();
  }

}
