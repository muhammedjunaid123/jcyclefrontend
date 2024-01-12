import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {
  constructor(private _toastr: ToastrService) { }
  public handleError(err: HttpErrorResponse) {
    // localStorage.clear()
   this._toastr.warning('your token has expired please try to sign in again')
  }
}
  

