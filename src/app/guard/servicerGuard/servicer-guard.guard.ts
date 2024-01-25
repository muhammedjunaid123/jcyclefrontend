import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const servicerGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.servicerSecret)
  if(token){
    return true;
  }else{
 _router.navigate(['/servicer/login'])
 return false
  }
};

export const servicerGuardloged: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.servicerSecret)
  if(!token){
    return true;
  }else{
 _router.navigate(['/servicer'])
 return false
  }
};
