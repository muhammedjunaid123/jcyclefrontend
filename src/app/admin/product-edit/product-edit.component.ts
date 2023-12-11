import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  productForm!:FormGroup
  brand: any = []
  category: any = []
  product:any=[]

  constructor(private _adminService: AdminService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService,private _route:ActivatedRoute) { }
  productupdate(id:string){
    console.log(id);
    
     if(this.productForm.valid){      
      this._adminService.updateProduct(id,this.productForm.value).subscribe({
        next:()=>{
          this._router.navigate(['/admin/product'])
        }
      })
     }
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this._adminService.productDetail(params['id']).subscribe({
        next: (res) => {
          this.product = res
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
      next: (res) => {
        this.brand = res
      }
    })
    this._adminService.getCategory().subscribe({
      next: (res) => {
        this.category = res
      }
    })
   
  }
}
