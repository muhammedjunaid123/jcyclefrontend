import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductInputComponent } from './product-input/product-input.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { UsersComponent } from './users/users.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { adminGuard, adminGuardloged } from '../guard/adminGuard/admin.guard';
import { OrdersComponent } from './orders/orders.component';
import { AdminRentComponent } from './admin-rent/admin-rent.component';
import { ServicerComponent } from '../servicer/servicer.component';
import { AdminServicersComponent } from './servicers/servicers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AdminLoginComponent,canActivate:[adminGuardloged] },
  { path: 'product', component: ProductComponent,canActivate:[adminGuard] },
  { path: 'productDetail', component: ProductDetailComponent,canActivate:[adminGuard]  },
  {path:'productAdd',component:ProductInputComponent,canActivate:[adminGuard]},
  {path:'brandAdd',component:BrandComponent,canActivate:[adminGuard]},
  {path:'categoryAdd',component:CategoryComponent,canActivate:[adminGuard] },
  {path:'users',component:UsersComponent,canActivate:[adminGuard]},
  {path:'brandUpdate',component:BrandEditComponent,canActivate:[adminGuard]},
  {path:'categoryUpdate',component:CategoryEditComponent,canActivate:[adminGuard]},
  {path:'user-details',component:UserDetailsComponent,canActivate:[adminGuard]},
  {path:'productedit',component:ProductEditComponent,canActivate:[adminGuard]},
  {path:'orders',component:OrdersComponent,canActivate:[adminGuard]},
  {path:'rent',component:AdminRentComponent,canActivate:[adminGuard]},
  {path:'servicers',component:AdminServicersComponent,canActivate:[adminGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[adminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
