import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { info } from 'console';
import { Observable } from 'rxjs';
import { FirestoreDataService } from '../shared/firestore-data.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    user: any;
    constructor(private auth: AuthService, private route: Router, private afs: FirestoreDataService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        return this.checkUserLoging();
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }
    checkUserLoging(): boolean{
        if (this.auth.isLoggedIn) {
            return true;
        }
        this.route.navigate(['']);
        return false;
    }
}