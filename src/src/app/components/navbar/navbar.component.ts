import { Component, OnInit, Input } from "@angular/core";
import RoutePaths from "../../utilities/route-paths";

@Component({
  selector: 'getready-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public routePaths: RoutePaths) { }

  @Input() user: any;

  isAdmin: boolean;
  isUser: boolean;

  ngOnInit() {
    this.isAdmin = this.user ? this.user.role === "Admin" ? true : false : false;
    this.isUser = this.user ? true : false;
  }

  onClickLogout() {
    alert("Logout");
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");
    // props.setUser(null);
    // props.setGlobalReturnId(0);
    // props.setPersonalReturnId(0);
    // props.history.push('/');
  }
}
