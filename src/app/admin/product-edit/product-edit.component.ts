import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bicycle, brand, category } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  productForm!:FormGroup
  brand: brand[] = []
  category: category[] = []
  product!:bicycle
  productdata:any=[]

  constructor(private _adminService: AdminService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService,private _route:ActivatedRoute) { }
  productupdate(id:string){
    console.log(id);
     console.log(this.productForm.value);
     if(this.productForm.value.stock<0){
       this._toastr.error(' stock can not be a negative value')
       return
     } if(this.productForm.value.price<0){
      this._toastr.error(' price can not be a negative value')
    return
    }
     if(this.productForm.valid){      
      this._adminService.updateProduct(id,this.productForm.value).subscribe({
        next:()=>{
          this._router.navigate(['/admin/product'])
        }
      })
     }else{
      this._toastr.warning('input can not be null!!!')
     }
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._adminService.productDetail(params['id']).subscribe({
        next: (res:bicycle) => {
          this.product = res
       
         this.productdata ={...res }
        delete this.productdata['_id']
        delete this.productdata['image']
        delete this.productdata['isBlocked']
        delete this.productdata['createdAt']
        delete this.productdata['updatedAt']
        delete this.productdata['updatedAt']
        delete this.productdata['wished']
        delete this.productdata['__v']
        console.log(this.productdata);
        
          this.productForm.setValue(this.productdata)
        }
      })
    });

    this.productForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required],
      cycle_Details: ['', Validators.required]
    })
  

    this._adminService.getBrand().subscribe({
      next: (res:brand[]) => {
        this.brand = res
      }
    })
    this._adminService.getCategory().subscribe({
      next: (res:category[]) => {
        this.category = res
      }
    })
   
    
    
   
  }
}
