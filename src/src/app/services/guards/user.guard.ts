import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { IAppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { take } from "rxjs/operators"
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class UserGuard implements CanActivate {

    constructor(
        private store: Store<IAppState>,
        private router: Router,
        private toastr: ToastrService,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let user;
        this.store.select(x => x.auth.user).pipe(take(1)).subscribe(x => {
            user = x;
        })

        if (user) {
            return true;
        }

        this.router.navigate(['/auth/login']).then(x => { 
            this.toastr.info("Please log in to access this page!","User Needed");
        });
        return false;
    }
}
