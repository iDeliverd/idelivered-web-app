import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from './../../../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private user: UserService,
        private router: Router) { }

    canActivate(): boolean {
        if (this.user.getUserToken) {
            this.user.tokenFound = true;
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}

