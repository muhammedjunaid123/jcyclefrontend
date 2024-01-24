import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { service } from '../types/servicer.types';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
private subscribe:Subscription=new Subscription()
  constructor(private _servicerservice: ServicerService, private _router: Router) { }
  service!: service[]
  pagesize = 6
  currentPage = 1
  ngOnInit(): void {
    this.subscribe.add(
      this._servicerservice.getservice().subscribe({
        next: (res: service[]) => {
          this.service = res
          console.log(this.service, 'service');
  
        },
        error: (error) => {
          console.log(error);
  
        }
      })
    )
  }
  Refresh() {
    this.subscribe.add(
      this._servicerservice.getservice().subscribe({
        next: (res: service[]) => {
          this.service = res
          console.log(this.service, 'service');
  
        },
        error: (error) => {
          console.log(error);
  
        }
      })
    )

  }
  serviceListUnlist(id: string, isBlocked: boolean) {
    this.subscribe.add(
      this._servicerservice.blockService(id, isBlocked).subscribe({
        next: () => {
          this.Refresh()
        }
      })
    )
  }
  edit(id: string) {
    this._router.navigate(['/servicer/serviceEdit', { id: id }])
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }
}
