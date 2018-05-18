import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LumaraService} from './lumara_service';

@Injectable()
export class ProtectedGuard implements CanActivate {
  constructor(private lumaraService: LumaraService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.lumaraService.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
    // return this.lumaraService.getIsAuthenticated().first();
  }
}
