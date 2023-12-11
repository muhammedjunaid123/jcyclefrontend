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

const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'product', component: ProductComponent },
  { path: 'productDetail', component: ProductDetailComponent },
  {path:'productAdd',component:ProductInputComponent},
  {path:'brandAdd',component:BrandComponent},
  {path:'categoryAdd',component:CategoryComponent },
  {path:'users',component:UsersComponent},
  {path:'brandUpdate',component:BrandEditComponent},
  {path:'categoryUpdate',component:CategoryEditComponent},
  {path:'user-details',component:UserDetailsComponent},
  {path:'productedit',component:ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
