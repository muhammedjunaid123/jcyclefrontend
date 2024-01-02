import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/user/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews-input',
  templateUrl: './reviews-input.component.html',
  styleUrl: './reviews-input.component.css'
})
export class ReviewsInputComponent implements OnInit {
 
  productForm!:FormGroup
  ratings:number=0
  productID!:string

 
  constructor(private _userService: UsersService, private _fb: FormBuilder, private _router: Router, private _toastr: ToastrService,private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
      console.log(params['id']);
       this.productID=params['id']
      
    });
  
    this.productForm = this._fb.group({ 
      review: ['', Validators.required],
     
    })

    
   
  }

 


  reviewCreate() {
    if (this.productForm.valid&&this.ratings!==0) {
      const review=this.productForm.value 
      this._userService.addReview(review['review'],this.ratings,this.productID).subscribe({
        next: () => {
          this._router.navigate(['/bicycleDetail', { id: this.productID }])
        }
      })
    }else{
    
      
      this._toastr.warning('input can not be null!!! ')
    }
    


  }
  update(val:number){
 this.ratings = val
   
  }
 
}
