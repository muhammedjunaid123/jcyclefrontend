import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/user/users.service';



@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrl: './rent-add.component.css'
})
export class RentAddComponent implements OnInit, OnDestroy {
  files: File[] = [];
  selectedfiles: File[] = []
  productForm!: FormGroup
  length!: number
  locationforapi!: any
  private subscribe: Subscription = new Subscription()

  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit(): void {

    this.productForm = this._fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      cycle_Details: ['', Validators.required],
      image: [Validators.required]
    })

    this._userService.getLocation().subscribe({
      next: (res: any) => {
        this.locationforapi = res[0]['city']
        console.log(this.locationforapi);
        
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
        this._userService.addrent(form).subscribe({
          next: () => {
            this._router.navigate(['rent'])
          }
        })
      )
    } else {
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
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}

