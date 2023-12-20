import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrl: './product-input.component.css'
})
export class ProductInputComponent implements OnInit {
  brand: any = []
  category: any = []
  files: File[] = [];
  selectedfiles: File[] = []
  productForm!:FormGroup
  length!:number

 
  constructor(private _adminService: AdminService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {

    this.productForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      gears: ['', Validators.required],
      brake_type: ['', Validators.required],
      suspension: ['', Validators.required],
      cycle_Details: ['', Validators.required],
      image:[Validators.required]
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

  productCreate() {
    if (this.productForm.valid) {
      const form =new FormData();
      console.log('Initial FormData:', form);
      let data = this.productForm.getRawValue()
      console.log(data);
      
      form.append('name',data.name)
      console.log(data.name);
      console.log('Initial FormData:', form);
      if(data.price<0){
        this._toastr.error('price can not be a negative value')
        return
      }
      form.append('price',data.price)
      console.log('Initial FormData:', form);
      if(data.stock<0){
        this._toastr.error('stock can not be a negative value')
        return
      }
      form.append('stock',data.stock)
      form.append('brand',data.brand)
      form.append('category',data.category)
      form.append('gears',data.gears)
      form.append('brake_type',data.brake_type)
      form.append('suspension',data.suspension)
      form.append('cycle_Details',data.cycle_Details)
      for (let i = 0; i < this.length; i++) {
        form.append('image', this.selectedfiles[i], this.selectedfiles[i].name);
      }
      console.log('imagesss');
      
      form.forEach((value, key) => {
        console.log(key, value);
      });
      this._adminService.addProduct(form).subscribe({
        next: () => {
          this._router.navigate(['/admin/product'])
        }
      })
    }else{
      console.log(this.productForm.value);
      
      this._toastr.warning('input can not be null!!! ')
    }
    


  }
  imageUrls: any = []
  maxFiles = 6;
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
}

