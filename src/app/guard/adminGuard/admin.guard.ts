import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.AdminSecrect)
  if(token){
    return true;
  }else{
 _router.navigate(['admin'])
 return false
  }
};



export const adminGuardloged: CanActivateFn = (route, state) => {
  const _router=inject(Router)
  const token=localStorage.getItem(environment.AdminSecrect)
  if(!token){
    return true;
  }else{
 _router.navigate(['/admin/product'])
 return false
  }
};
