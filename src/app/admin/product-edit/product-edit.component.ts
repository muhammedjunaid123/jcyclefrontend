import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { bicycle, brand, category } from 'src/app/user/types/user.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit,OnDestroy {
  productForm!: FormGroup
  brand: brand[] = []
  category: category[] = []
  product!: bicycle
  productdata: any = []
  files: File[] = [];
  selectedfiles: File[] = []
  length!: number
  imageUrls: any = []
  maxFiles = 6;
  apiFileLength = 0
  private subscribe: Subscription = new Subscription()
  constructor(private _adminService: AdminService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._adminService.productDetail(params['id']).subscribe({
          next: (res: bicycle) => {
            this.product = res

            this.productdata = { ...res }
            delete this.productdata['_id']
            this.imageUrls = this.productdata['image']
            this.selectedfiles = this.productdata['image']
            this.apiFileLength = this.productdata['image'].length
            delete this.productdata['image']
            delete this.productdata['isBlocked']
            delete this.productdata['createdAt']
            delete this.productdata['updatedAt']
            delete this.productdata['updatedAt']
            delete this.productdata['wished']
            this.productdata['brand'] = this.productdata['brand']['_id']
            this.productdata['category'] = this.productdata['category']['_id']
            delete this.productdata['__v']
            console.log(this.productdata);

            this.productForm.setValue(this.productdata)
          }
        })
      })
    )

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

  this.subscribe.add(

    this._adminService.getBrand().subscribe({
      next: (res: brand[]) => {
        this.brand = res
      }
    })
  )
  this.subscribe.add(
    this._adminService.getCategory().subscribe({
      next: (res: category[]) => {
        this.category = res
      }
    })
  )




  }
  getFileExtension(filename: string): any {
    return filename.split('.').pop();
  }

  getFile(event: any) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (event.target.files.length > 0) {
      const n = event.target.files.length
      for (let i = 0; i < n; i++) {
        const file = event.target.files[i]
        const extension = this.getFileExtension(file.name)
        if (allowedExtensions.includes(extension)) {
          this.files.push(file.name)
        } else {
          this._toastr.error('Please select a valid image file (jpg, jpeg, png, or gif).');
        }
      }
      this.selectedfiles = event.target.files
    }
    this.selectedfiles = Array.from(this.selectedfiles);
    this.length = this.selectedfiles.length;
  }

  productupdate(id: string) {
    if (this.productForm.valid) {
      if (this.imageUrls.length == 0) {
        this._toastr.warning('image can\'t be empty')
        return
      }
      const form = new FormData();
      console.log('Initial FormData:', form);
      let data = this.productForm.getRawValue()
      console.log(data);

      form.append('name', data.name)
      console.log(data.name);
      console.log('Initial FormData:', form);
      if (data.price < 0) {
        this._toastr.error('price can not be a negative value')
        return
      }
      form.append('price', data.price)
      console.log('Initial FormData:', form);
      if (data.stock < 0) {
        this._toastr.error('stock can not be a negative value')
        return
      }
      console.log(data.brand, 'braddddd');

      form.append('stock', data.stock)
      form.append('brand', data.brand)
      form.append('category', data.category)
      form.append('gears', data.gears)
      form.append('brake_type', data.brake_type)
      form.append('suspension', data.suspension)
      form.append('cycle_Details', data.cycle_Details)
      for (let i = 0; i < this.length; i++) {
        form.append('image', this.selectedfiles[i], this.selectedfiles[i].name);
      }
      console.log('imagesss');

      form.forEach((value, key) => {
        console.log(key, value);
      });
      this.subscribe.add(
        this._adminService.updateProduct(id, form).subscribe({
          next: (res) => {
            console.log(res, 'RES');

            this._router.navigate(['/admin/product'])
          },
          error: (err) => {
            console.log(err);

          }
        })
      )
    } else {
      console.log(this.productForm.value);

      this._toastr.warning('input can not be null!!! ')
    }



  }

  refersh() {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._adminService.productDetail(params['id']).subscribe({
          next: (res: bicycle) => {
            this.product = res

            this.productdata = { ...res }
            delete this.productdata['_id']
            this.imageUrls = this.productdata['image']
            this.selectedfiles = this.productdata['image']
            this.apiFileLength = this.productdata['image'].length
            delete this.productdata['image']
            delete this.productdata['isBlocked']
            delete this.productdata['createdAt']
            delete this.productdata['updatedAt']
            delete this.productdata['updatedAt']
            delete this.productdata['wished']
            this.productdata['brand'] = this.productdata['brand']['_id']
            this.productdata['category'] = this.productdata['category']['_id']
            delete this.productdata['__v']
            console.log(this.productdata);

            this.productForm.setValue(this.productdata)
          }
        })
      })
    )

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

    this.subscribe.add(
      this._adminService.getBrand().subscribe({
        next: (res: brand[]) => {
          this.brand = res
        }
      })
    )

    this.subscribe.add(
      this._adminService.getCategory().subscribe({
        next: (res: category[]) => {
          this.category = res
        }
      })
    )





  }

  previewImage(event: any) {
    const fileInput = <HTMLInputElement>event.target;
    if (this.imageUrls.length > this.maxFiles) {

      this._toastr.error(`You can only upload up to ${this.maxFiles} files.`)

      event.target.value = null;
      return;
    }
    if (fileInput.files && fileInput.files.length > this.maxFiles) {
      this._toastr.error(`You can only upload up to ${this.maxFiles} files.`)
      event.target.value = null;
      return;
    }


    if (fileInput.files && fileInput.files.length > 0) {
      if (this.imageUrls.length + fileInput.files.length > this.maxFiles) {
        this._toastr.error(`You can only upload up to ${this.maxFiles} files.`)
        // Reset the file input
        event.target.value = null;
        return;
      }
      for (let i = 0; i < fileInput.files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrls.push(e.target?.result);
        };

        reader.readAsDataURL(fileInput.files[i]);
      }
    }
    this.getFile(event)
  }
  imgDelete(index: number, id: string) {
    
    this.subscribe.add(
      this._adminService.imgDelete(index, id).subscribe({
        next: () => {
          this.refersh()
        }
      })
    )

  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
