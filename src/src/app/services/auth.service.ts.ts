import { Injectable, EventEmitter } from '@angular/core';
import { User } from './models/other';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;

  onUserChange: EventEmitter<void> = new EventEmitter();

  constructor() {
    console.log("Auth Service Constructor!");
    let storageUser = localStorage.getItem("user");
    if (storageUser !== null) {
      this.user = JSON.parse(storageUser);
    }
  }

  public setUser(user: User) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", user.token);
    this.onUserChange.emit();
  }

  public deleteUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.user = null; 
    this.onUserChange.emit();
  }

  public getUser() {
    return this.user;
  }
}
