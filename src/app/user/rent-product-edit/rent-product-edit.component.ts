import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { brand, category, bicycle, rent } from '../types/user.types';
import { UsersService } from 'src/app/services/user/users.service';

@Component({
  selector: 'app-rent-product-edit',
  templateUrl: './rent-product-edit.component.html',
  styleUrl: './rent-product-edit.component.css'
})
export class RentProductEditComponent implements OnInit,OnDestroy{
  productForm!: FormGroup
 
  product!: rent
  productdata: any = []
  files: File[] = [];
  selectedfiles: File[] = []
  length!: number
  imageUrls: any = []
  maxFiles = 6;
  apiFileLength = 0
  locationforapi!: any
  private subscribe: Subscription = new Subscription()
  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
        this._userService.rentDetail(params['id']).subscribe({
          next: (res: any) => {
          this.product=res['product']
            this.productdata = { ...res['product'] }
            delete this.productdata['_id']
            this.imageUrls = this.productdata['image']
            this.selectedfiles = this.productdata['image']
            this.apiFileLength = this.productdata['image'].length
            delete this.productdata['image']
            delete this.productdata['isBlocked']
            delete this.productdata['createdAt']
            delete this.productdata['updatedAt']
            delete this.productdata['updatedAt']
            delete this.productdata['owner']
            delete this.productdata['adminisBlocked']
            delete this.productdata['__v']
            console.log(this.productdata);

            this.productForm.setValue(this.productdata)
          }
        })
      })
      
    )
    this.subscribe.add(
      this.subscribe.add(
        this._userService.getLocation().subscribe({
          next: (res: any) => {
            this.locationforapi = res[0]['city']
            console.log(this.locationforapi);
            
          }
        })
      )
    )

    this.productForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      cycle_Details: ['', Validators.required],
    })

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

  productCreate(id: string) {
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
        form.append('price', data.price)
        form.append('location', data.location)
        form.append('cycle_Details', data.cycle_Details)
        for (let i = 0; i < this.length; i++) {
          form.append('image', this.selectedfiles[i], this.selectedfiles[i].name);
        }
        console.log('imagesss');
  
        form.forEach((value, key) => {
          console.log(key, value);
        });
       
      this.subscribe.add(
        this._userService.updateRent(id, form).subscribe({
          next: (res) => {
            console.log(res, 'RES');

            this._router.navigate(['/profile'])
          },
         
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
        this._userService.rentDetail(params['id']).subscribe({
          next: (res: any) => {
          
            this.productdata = { ...res['product'] }
            delete this.productdata['_id']
            this.imageUrls = this.productdata['image']
            this.selectedfiles = this.productdata['image']
            this.apiFileLength = this.productdata['image'].length
            delete this.productdata['isBlocked']
            delete this.productdata['image']
            delete this.productdata['createdAt']
            delete this.productdata['updatedAt']
            delete this.productdata['updatedAt']
            delete this.productdata['owner']
            delete this.productdata['adminisBlocked']
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
      location: ['', Validators.required],
      cycle_Details: ['', Validators.required],
      image: [Validators.required]
    })
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
      this._userService.imgDelete(index, id).subscribe({
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
