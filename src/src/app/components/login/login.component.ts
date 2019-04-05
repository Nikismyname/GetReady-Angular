import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormInputData, FormData, User } from "../../services/models/other";
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'getready-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private location: Location,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  formData = new FormData(
    [
      new FormInputData("username", "Username", "string"),
      new FormInputData("password", "Password", "password"),
    ],
    "Login Form", "login", false);

  async onFormSubmit(data) {
    console.log(data);
    let editResult = await this.userService.login(data);
    if (editResult.status === 200) {
      let loginData = editResult.data; 
      console.log(loginData);
      this.authService.setUser(new User(
        loginData["username"],
        loginData["token"], 
        loginData["role"],
      ));
      this.location.back();
    } else {
      alert(editResult.json);
    }
  }
}
