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
    let errorMessage: string
    if (err.error instanceof ErrorEvent) {
      if(err.status===401){
         localStorage.clear() 
      }
      errorMessage = `An error occured: ${err.error.message}`
      errorMessage = err.error.message
      this._toastr.error(errorMessage)
    } else {
    }
  }
}
  

