import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IAppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators"
import { IUser } from "../models/others/user";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class AdminGuard implements CanActivate {

    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private toastr: ToastrService,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user: IUser;
        this.store.select(x => x.auth.user).pipe(take(1)).subscribe(x => {
            user = x;
        })

        if (user && user.role === "Admin") {
            return true;
        }

        if (user) {
            this.router.navigate([""])
                .then(x => this.toastr.info("Please log as admin to access that page!", "Admin Required"));
        } else {
            this.router.navigate(["/auth/login"])
                .then(x => this.toastr.info("Please log as admin to access that page!", "Admin Required"));
        }

        return false;
    }
}
