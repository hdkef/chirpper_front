import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAppReducer from './redux/reducers/app-reducer'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store:Store<fromAppReducer.AppState>, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,_)=>{
      this.store.select("auth").subscribe((auth)=>{
        if(auth["ID"] != ""){
          resolve(true)
        }else{
          this.router.navigateByUrl("/login")
          resolve(false)
        }
      })
    })
  }
  
}