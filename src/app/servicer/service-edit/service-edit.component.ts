import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { service } from '../types/servicer.types';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrl: './service-edit.component.css'
})
export class ServiceEditComponent implements OnInit, OnDestroy {

  isReadOnly = true
  serviceForm!: FormGroup
  today = new Date()
  hours = this.today.getHours().toString().padStart(2, '0'); // Hours in 2-digit format
  minutes = this.today.getMinutes().toString().padStart(2, '0'); // Minutes in 2-digit format
  seconds = this.today.getSeconds().toString().padStart(2, '0'); // Seconds in 2-digit format
  locationforapi!: any
  timePortion = `${this.hours}:${this.minutes}:${this.seconds}`;
  minDate = this.today.toISOString().split('T')[0];
  serviceData!: any
  id!: any
  private subscribe: Subscription = new Subscription()

  constructor(private _servicerService: ServicerService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }
  transform(value: string): string {
    value = `${value}:00`
    const [hours, minutes, seconds] = value.split(':').map(Number);
    // Create a Date object to facilitate formatting
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds);
    // Format the time in 12-hour format with AM/PM
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return formattedTime;
  }
  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._servicerService.getServiceById(params['id']).subscribe({
          next: (res: service) => {
  
            this.serviceData = { ...res }
            this.id = this.serviceData._id
            delete this.serviceData['_id']
            delete this.serviceData['isBlocked']
            delete this.serviceData['isBooked']
            delete this.serviceData['owner']
            let time = this.serviceData['time']
            this.serviceData['time'] = this.transform(time)
            delete this.serviceData['__v']
            console.log(this.serviceData, 'data');
            this.serviceForm.setValue(this.serviceData)
  
          }
        })
      })
    )

    this.serviceForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      service_Details: ['', Validators.required],
      time: ['', Validators.required],
      date: [Date, Validators.required],
      location: ['', Validators.required]
    })
    this.subscribe.add(
      this._servicerService.getLocation().subscribe({
        next: (res: any) => {
          this.locationforapi = res[0]['city']


        }
      })
    )

  }
  convertTimeTo12HourFormat(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Create a Date object to facilitate formatting
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds);

    // Format the time in 12-hour format with AM/PM
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return formattedTime;
  }


  getValue() {
    if (!this.serviceForm.valid) {
      this._toastr.warning('input can be null!!')
      return
    }
    this.today = new Date()

    this.hours = this.today.getHours().toString().padStart(2, '0'); // Hours in 2-digit format
    this.minutes = this.today.getMinutes().toString().padStart(2, '0'); // Minutes in 2-digit format
    this.seconds = this.today.getSeconds().toString().padStart(2, '0'); // Seconds in 2-digit format

    this.timePortion = `${this.hours}:${this.minutes}:${this.seconds}`;

    let time = this.convertTimeTo12HourFormat(this.timePortion)
    let data = this.serviceForm.value
    const adjustedDate = new Date(data['date']);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    let selectedDateFromForm = adjustedDate.toISOString().split('T')[0];
    let today = new Date().toISOString().split('T')[0];
    console.log(today, selectedDateFromForm);

    if (today === selectedDateFromForm) {
      console.log('enterd');
      console.log(typeof (time));

      //for get the time  from the date
      let Stime = time.split(" ")
      let Sdate = data['time'].split(' ')

      console.log(Stime, '1');
      //cheaking the time with am pm 
      if (Stime[1] === 'PM' && Sdate[1] === 'AM') {
        this._toastr.warning('The time is already finished')
        return
      }
      //split the time like hour and mints
      Stime = Stime[0].split(':')
      Sdate = Sdate[0].split(':')
      console.log(Stime, Sdate, '2');

      //cheaking the hour 
      if (Sdate[0] < Stime[0]) {
        console.log(Sdate[1], Stime[1]);

        console.log('1');

        this._toastr.warning('The time is already finished')
        return
      }
      //cheaking the minits if the hour the same 
      if (Sdate[1] < Stime[1] && Sdate[0] === Stime[0]) {
        console.log('2');

        this._toastr.warning('The time is already finished')
        return
      }
    }
    this.subscribe.add(
      this._servicerService.editService(this.id, this.serviceForm.value).subscribe({
        next: () => {
          this._toastr.success('edit success')
  
          this._router.navigate(['/servicer/home'])
        },
        error: (err: any) => {
          this._toastr.error(err.error.message)
        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
