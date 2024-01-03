import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductInputComponent } from './product-input/product-input.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AdminLoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersComponent } from './orders/orders.component';
import { ListOrderComponent } from '../reusable-component/list-order/list-order.component';



@NgModule({
  declarations: [ 
    NavbarComponent,
    ProductComponent,
    ProductDetailComponent,
    ProductInputComponent,
    BrandComponent,
    CategoryComponent,
    UsersComponent,
    ProductEditComponent,
    AdminLoginComponent,
    OrdersComponent,
    ListOrderComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
    
  
   
    
  ]
})
export class AdminModule { }
