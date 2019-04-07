import { Component, OnInit, Input } from "@angular/core";
import { RoutePaths } from "../../utilities/route-paths";
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { IAuthState } from "../../authentication/reducers";
import { AuthActions } from "../../authentication/actions/auth.actions";

@Component({
  selector: 'getready-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public routePaths: RoutePaths,
    private store: Store<IAuthState> 
  ) { }

  isAdmin: boolean;
  isUser: boolean;

  ngOnInit() {
    this.store.select(x=>x.auth.user).subscribe((x) => { 
      let user = x;
      this.isAdmin = user ? user.role === "Admin" ? true : false : false;
      this.isUser = user ? true : false;
    })
  }

  onClickLogout() {
    this.store.dispatch(new AuthActions.logout());
  }
}
