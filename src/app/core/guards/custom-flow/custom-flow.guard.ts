import { AppSettings } from './../../../shared/models/appSettings.model';
import { UtilityService } from './../../../services/utility/utility.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
 
@Injectable({
  providedIn: 'root'
})
export class CustomFlowGuard implements CanActivate {
 
  constructor(
    private router: Router,
    private util: UtilityService,
    private user:UserService
    ) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
      this.util.getSettings.subscribe((settings: AppSettings) => {
        if(!!settings && !settings.isCustomFlow) {
        
          this.router.navigate(['error']);
          return false;
        } else {
          if(this.user.tokenFound){
            if(this.router.url!='/'){
            this.router.navigateByUrl(this.router.url);
 
            }
          }
        }
      });
    
    return true;
  }
}
