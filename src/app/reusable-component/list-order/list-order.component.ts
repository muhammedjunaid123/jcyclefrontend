import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent  implements OnInit{
  @Input () obj: any = {};
  ngOnInit(): void {
    console.log(this.obj,'this obj');
    
  }
 
}
