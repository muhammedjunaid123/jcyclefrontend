import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicerRoutingModule } from './servicer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicersignupComponent } from './servicersignup/servicersignup.component';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ServicersignupComponent,
    OtpComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ServicerRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ServicerModule { }
