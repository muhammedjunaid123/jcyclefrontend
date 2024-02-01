import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  constructor( private activeRoute:ActivatedRoute) { }
  protected mobMenu = false
  url!:string
  rent:boolean=false
  home:boolean=false
  product:boolean=false
  wishlist:boolean=false
  cart:boolean=false
  service:boolean=false
  ngOnInit(): void {
    try {
      this.url=this.activeRoute.snapshot.url[0]['path']
      this.home=false
    } catch (error) {
     
      this.home=true
      
    }
    
     
  //
    if(this.url==='rent'){
      this.rent=true
    }else{
      this.rent=false
    }
    //
   
    //
    if(this.url==='bicycle'){
      this.product=true
    }else{
      this.product=false
    }
    //
    if(this.url==='cart'){
      this.cart=true
    }else{
      this.cart=false
    }
    //
    if(this.url==='wishlist'){
      this.wishlist=true
    }else{
      this.wishlist=false
    }

    if(this.url==='service'){
      this.service=true
    }else{
      this.service=false
    }
    
  }
  mobMenuChange() { 
    if (this.mobMenu === false) this.mobMenu = true
    else this.mobMenu = false
  }
}
