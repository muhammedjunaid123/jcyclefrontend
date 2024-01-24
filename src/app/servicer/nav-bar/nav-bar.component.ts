import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  implements OnInit{
  constructor( private activeRoute:ActivatedRoute) { }
  protected mobMenu = false
  url!:string
  home:boolean=false
  service:boolean=false
 

  ngOnInit(): void {
    try {
      this.url=this.activeRoute.snapshot.url[0]['path']
      this.home=false
    } catch (error) {
     
      this.home=true
      
    }
    if(this.url==='serviceOrders'){
      
      this.service=true
    }else{
      this.service=false
    }
    if(this.url==='home'){
      
      this.home=true
    }else{
      this.home=false
    }
  }
  mobMenuChange() { 
    if (this.mobMenu === false) this.mobMenu = true
    else this.mobMenu = false
  }
}
