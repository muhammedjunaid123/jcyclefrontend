import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const userGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.UserSecret)
  if(token){
    return true;
  }else{
 _router.navigate(['login'])
 return false
  }
};

export const userGuardloged: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.UserSecret)
  if(!token){
    return true;
  }else{
 _router.navigate([''])
 return false
  }
};
