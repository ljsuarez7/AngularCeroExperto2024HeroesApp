import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  private checkAuthStatus(): Observable<boolean>{

    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => console.log('isAuthenticated:', isAuthenticated)),
        tap(isAuthenticated => {
          if(isAuthenticated) this.router.navigate(['./']);
        }),
        map(isAuthenticated => !isAuthenticated) //devolvemos true para que deje pasar
      );

  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {

    return this.checkAuthStatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.checkAuthStatus();

  }

}
