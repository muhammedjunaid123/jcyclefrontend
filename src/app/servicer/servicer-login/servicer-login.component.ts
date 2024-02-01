import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { environment } from 'src/environments/environment.development';
import { ServicerService } from 'src/app/services/servicer/servicer.service';

@Component({
  selector: 'app-servicer-login',
  templateUrl: './servicer-login.component.html',
  styleUrl: './servicer-login.component.css'
})
export class ServicerLoginComponent  implements OnDestroy{
  constructor(private _fb: FormBuilder, private _servicerService: ServicerService, private _toastr: ToastrService, private _router: Router) { }
  servicer!:any
  private subscribe: Subscription = new Subscription()
  login = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })
  Login() {
    this.servicer = this.login.controls
    if (this.login.valid) {
      this.subscribe.add(
        this._servicerService.userLogin(this.login.value)
          .subscribe({
            next: (res: any) => {
              localStorage.setItem(environment.servicerSecret, res.access_token.toString());  
              this._toastr.success('LOGIN SUCCESSFUL');
              this._router.navigate(['/servicer/home'])
            },
           

          })
      )
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
