import { Component, OnInit, Input } from "@angular/core";
import { RoutePaths } from "../../services/route-paths";
import { Store } from '@ngrx/store';
import { IAuthState } from "../../authentication/reducers";
import { AuthActions } from "../../authentication/actions/auth.actions";
import { Router } from '@angular/router';
//1
@Component({
  selector: 'getready-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  isAdmin: boolean;
  isUser: boolean;

  constructor(
    public routePaths: RoutePaths,
    private store: Store<IAuthState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.select(x=>x.auth.user).subscribe((user) => { 
      this.isAdmin = user ? user.role === "Admin" ? true : false : false;
      this.isUser = user ? true : false;
    })
  }

  onClickLogout(event) {
    event.preventDefault();
    this.store.dispatch(new AuthActions.logout());
    this.router.navigate([""]);
  }
}
