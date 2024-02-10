import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/user/users.service';
import { Store } from '@ngrx/store';
import { datePiker } from '../store/user.action';
import { datePickerT } from '../types/user.types';
import { Router } from '@angular/router';
import { datepikerData } from '../store/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-piker',
  templateUrl: './date-piker.component.html',
  styleUrl: './date-piker.component.css'
})
export class DatePikerComponent implements OnInit, OnDestroy {
  constructor(private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _userService: UsersService,
    private _Store: Store,
    private _router: Router
  ) { }
  private subscribe: Subscription = new Subscription()
  isReadOnly=true
  isLinear = false;
  locationforapi!: any
  location!: string
  submit = false
  today = new Date()
  startDate!: Date
  endDate!: Date
  minDate = this.today.toISOString().split('T')[0];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  firstFormGroup = this._formBuilder.group({
    start: ['', Validators.required],
    end: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    location: ['', Validators.required],
  });
  ngOnInit(): void {
    this.subscribe.add(
      this._userService.getLocation().subscribe({
        next: (res: any) => {
          this.locationforapi = res[0]['city']


        }
      })
    )
  }
  valid() {
    if (this.range.controls.start.value !== null && this.range.controls.end.value !== null) {



      this.startDate = this.range.controls.start.value
      this.endDate = this.range.controls.end.value
    } else {
      this._toastr.warning('both date can be null ')

      return
    }
    if (!this.secondFormGroup.valid) {
      this._toastr.warning('fill the location!!')
      return
    }

    let val = this.secondFormGroup.value['location']
    if (val !== undefined && val !== null) {
      this.location = val
    }
    this.submit = true

  }
  submitfunc() {
    console.log(this.startDate, this.endDate, 'pikdatre');

    let res: datePickerT = {
      start: this.startDate,
      end: this.endDate,
      location: this.location
    }


    this._Store.dispatch(datePiker({ datePickerval: res }))
    this._router.navigate(['rent'])


  }
  locationchage(val: any) {
    console.log(val, 'cccc');


  }
ngOnDestroy(): void {
  this.subscribe.unsubscribe()
}
}
