import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/user/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews-input',
  templateUrl: './reviews-input.component.html',
  styleUrl: './reviews-input.component.css'
})
export class ReviewsInputComponent implements OnInit, OnDestroy {

  productForm!: FormGroup
  ratings: number = 0
  productID!: string
  private subscribe: Subscription = new Subscription()
marker=''
  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._route.params.subscribe(params => {
     console.log(params,'params');
   
   
      this.marker=params['marker']
        this.productID = params['id']

      })
    )

    this.productForm = this._fb.group({
      review: ['', Validators.required],

    })



  }




  reviewCreate() {
    if (this.productForm.valid && this.ratings !== 0) {
      const review = this.productForm.value
      if(this.marker=='rent'){
          this.subscribe.add(
          this._userService.addRentReview(review['review'], this.ratings, this.productID).subscribe({
            next: () => {
              console.log(this.marker);
              
              if(this.marker=='rent'){
                console.log('renterrr');
                
                 this._router.navigate(['/rent-detail', { id: this.productID }])
              }else{
  
                this._router.navigate(['/bicycleDetail', { id: this.productID }])
              }
            },
          
          })
          )
        }else{
          this.subscribe.add(
          this._userService.addReview(review['review'], this.ratings, this.productID).subscribe({
            next: () => {
              console.log(this.marker);
              
              if(this.marker=='rent'){
                console.log('renterrr');
                
                 this._router.navigate(['/rent-detail', { id: this.productID }])
              }else{
  
                this._router.navigate(['/bicycleDetail', { id: this.productID }])
              }
            },
            
          })
          )
        }
    } else {

      this._toastr.warning('input can not be null!!! ')
    }



  }
  update(val: number) {
    this.ratings = val

  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
