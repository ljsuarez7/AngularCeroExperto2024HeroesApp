import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{

  //Ahora hay otra forma de hacer esto con programación funcional, tengo q investigarlo en angular 18

  constructor(private authService: AuthService, private router: Router) { }

  private checkAuthStatus(): Observable<boolean>{

    return this.authService.checkAuthentication()
      .pipe(
        tap(isAuthenticated => console.log('isAuthenticated:', isAuthenticated)),
        tap(isAuthenticated => {
          if(!isAuthenticated) this.router.navigate(['./auth/login']);
        })
      );

  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {

    // console.log('Can match');
    // console.log({route, segments});

    // return false;

    return this.checkAuthStatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    // console.log('Can activate');
    // console.log({route, state});

    // return true;

    return this.checkAuthStatus();

  }

}
