import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicerRoutingModule } from './servicer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicersignupComponent } from './servicersignup/servicersignup.component';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ServiceInputComponent } from './service-input/service-input.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ServicerLoginComponent } from './servicer-login/servicer-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TimeConvertPipe } from '../pipe/time-convert.pipe';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceOrderListComponent } from './service-order-list/service-order-list.component';
import { SearchFilterPipe } from '../pipe/search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChatComponent } from './chat/chat.component';
import { DateToTimePipe } from '../pipe/date-to-time.pipe';


@NgModule({
  declarations: [
    ServicersignupComponent,
    OtpComponent,
    HomeComponent,
    ServiceInputComponent,
    ServicerLoginComponent,
    NavBarComponent,
    ServiceEditComponent,
    ServiceOrderListComponent,
    ChatComponent,
  
  ],
  imports: [
    CommonModule,
    ServicerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    TimeConvertPipe,
    SearchFilterPipe,
    NgxPaginationModule,
    DateToTimePipe
  ]
})
export class ServicerModule { }
