import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { service } from '../types/servicer.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/user/users.service';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-servicer-profile',
  templateUrl: './servicer-profile.component.html',
  styleUrl: './servicer-profile.component.css'
})
export class ServicerProfileComponent implements OnInit, OnDestroy {
  edit = false
  servicerData!: any
  nameForm!: FormGroup
  servicer!: any
  ngOnInit(): void {
    this.subscribe.add(
      this._servicerService.ServicerData().subscribe({
        next: (res: any) => {
          this.servicerData = res
          console.log(this.servicerData, 'this is servicer datr');

          if (this.edit === true) {
            const name = this.servicerData['name']
            this.nameForm.setValue({ name: name });
          }
        },

      })
    )
  }
  private subscribe: Subscription = new Subscription()
  constructor(private _fb: FormBuilder, private _servicerService: ServicerService, private _router: Router, private _toastr: ToastrService) { }

  logout() {
    localStorage.removeItem(environment.servicerSecret)
    this._router.navigate(['/servicer'])
  }
  editchage() {
    if (this.edit === true) {
      this.edit = false
    } else {
      this.edit = true
      this.nameForm = this._fb.group({
        name: [this.servicerData['name'], Validators.required],
      })
    }
  }
  saveName() {
    this.servicer = this.nameForm.controls
    if (this.nameForm.valid) {
      this.subscribe.add(
        this._servicerService.saveName(this.nameForm.value)
          .subscribe({
            next: (res: any) => {
              this.refersh()
              this.edit = false
            },

          })
      )
    } else {
      this._toastr.warning('fill the input')
    }
  }
  refersh() {
    this.subscribe.add(
      this._servicerService.ServicerData().subscribe({
        next: (res: any) => {
          this.servicerData = res
          console.log(this.servicerData, 'this is servicer datr');

          if (this.edit === true) {
            const name = this.servicerData['name']
            this.nameForm.setValue({ name: name });
          }
        },

      })
    )
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
