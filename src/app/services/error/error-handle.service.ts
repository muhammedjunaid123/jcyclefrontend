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
      errorMessage = `An error occured: ${err.error.message}`
    } else {
      errorMessage = err.error.message
    }
    this._toastr.error(errorMessage)
  }
}
  

