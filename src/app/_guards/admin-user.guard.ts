import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'app/_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let user = localStorage.getItem('currentUser');
    if (user) {
      const currentuser = <UserModel>JSON.parse(user);

      if (currentuser.type === 'Admin') {
        return true;
      }
    }
    return false;
  }

}
