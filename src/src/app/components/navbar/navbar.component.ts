import { Component, OnInit, Input } from "@angular/core";
import { RoutePaths } from "../../utilities/route-paths";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'getready-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    public routePaths: RoutePaths,
    public authService: AuthService,
  ) { }

  isAdmin: boolean;
  isUser: boolean;

  ngOnInit() {
    this.authService.onUserChange.subscribe(() => { 
      let user = this.authService.getUser();
      this.isAdmin = user ? user.role === "Admin" ? true : false : false;
      this.isUser = user ? true : false;
    })
  }

  onClickLogout() {
    this.authService.deleteUser();
  }
}
