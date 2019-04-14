import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Location } from "@angular/common";
import { IAppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators"
import { IUser } from '../services/models/other';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate {

    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private location: Location,
        private toastr: ToastrService,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user: IUser;
        this.store.select(x => x.auth.user).pipe(take(1)).subscribe(x => {
            user = x;
            console.log("GUARD GOT USER");
        })

        if (user.role === "Admin") {
            return true;
        }

        this.router.navigate([""]).then
            (x => this.toastr.info("Please log as admin to access that page!", "Admin Required"));

        return false;
    }
}
