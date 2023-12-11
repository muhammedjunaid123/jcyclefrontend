import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor() { }
  protected mobMenu = false
  mobMenuChange() { 
    if (this.mobMenu === false) this.mobMenu = true
    else this.mobMenu = false
  }
}
