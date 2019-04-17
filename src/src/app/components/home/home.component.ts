import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//1 
@Component({
  selector: 'getready-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isUser: boolean = false;
  userSub: Subscription;

  constructor(
    private store: Store<IAppState>
  ) {
    this.userSub = this.store.select(x => x.auth.user).subscribe(x => {
      if (x) {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    });
  }
}
