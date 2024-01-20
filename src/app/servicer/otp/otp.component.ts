import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/user/users.service';
import { ServicerService } from 'src/app/services/servicer/servicer.service';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit,OnDestroy {
  verified: boolean = false
  otpVerification!: FormGroup
  otp!: number;
  id!: string;
  token!: string
  count: number = 10
  resendActive: boolean = false;
  resendCount: number = 0
  private subscribe: Subscription = new Subscription()

  constructor(private _fb: FormBuilder, private _servicerServices:ServicerService , private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(this._route.queryParams
      .subscribe({
        next: (params) => {
          this.id = params['id']
          console.log(this.id,'PARAM ID');
          
        }
      }))
    this.timer()
    this.sendMail(this.id)
    this.otpVerification = this._fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]+$/)]],
    })
  }
  sendMail(id: string) {
    this.subscribe.add(
    this.subscribe.add(this._servicerServices.sendMail(id).subscribe({
      next: (res:any) => {
        this.otp = +res.otp
        this.token = res.access_token.toString()
      }
    }))
    )
  }
  timer() {
    const time = setInterval(() => {
      this.count--
      if (this.count === 0) {
        this.count = 10
        this.resendActive = true
        clearInterval(time)
      }
    }, 2000)
  }
  resendOtp() {
    if (this.resendCount === 3) {
      this._toastr.error('Resend OTP limit has been expired, You will be redirected to login page, please try again.');
      setTimeout(() => {
        this._router.navigate(['/']);
      }, 5000)
    }
    if (this.resendActive === true)
      this.resendCount++
    this.sendMail(this.id)
    this.timer()
    this.resendActive = false
  }
  verifyOtp() {
    const user = this.otpVerification.getRawValue();
    if (this.otpVerification.valid && +this.otp === +user.otpCode) {
      this.verified = true
      this.subscribe.add(
     this._servicerServices.loadHome(this.id).subscribe({
      next:()=>{
        localStorage.setItem(environment.servicerSecret,this.token)
      this._router.navigate(['/servicer/home'])
      },error:(error)=>{
        this._toastr.error(error.error.message)
      }
     })
      )
      
    } else {
      this._toastr.error('Invalid OTP', 'Jcycle');
    }
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
