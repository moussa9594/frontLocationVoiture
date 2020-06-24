import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../admin.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private adminService: AuthenticationService
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('--auth-guard--')
        const admin = this.adminService.currentUserValue;
        console.log(admin)
        if (admin && admin.email === 'moussa9594@gmail.com') {
            // logged in so return true
            console.log('dans authGuard')
            console.log(admin)
            return true;
        }

        // // not logged in so redirect to login page with the return url
         this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // return false;
        return false
    }
}
