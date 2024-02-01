import { AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicerService } from 'src/app/services/servicer/servicer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-servicer-dashboard',
  templateUrl: './servicer-dashboard.component.html',
  styleUrl: './servicer-dashboard.component.css'
})
export class ServicerDashboardComponent implements OnInit ,OnDestroy{
  private subscribe: Subscription = new Subscription()
  constructor(private _servicerService: ServicerService) { }
  revenue!: any
  service!: any
  done!: any
  pending!: any
  locationorder!: any
  basicData: any;
  basicOptions: any;
  location: any = []
  locationCount: any = []
  ngOnInit(): void {
    this.subscribe.add(
      this._servicerService.dashboard().subscribe({
        next: (res: any) => {
          this.revenue = res['revenue']
          if (this.revenue.length === 0) {
            this.revenue = 0
          } else {
            this.revenue = this.revenue[0]['revenue']
          }
          this.service = res['service']
          this.done = res['done']
          this.pending = res['pending']
          this.locationorder = res['locationorder']
          let location1:any=[]
           let locationCount1:any=[]
          this.locationorder.forEach((res: any) => {
            location1.push(res['_id'])
            locationCount1.push(res['count'])
          })
          this.location=location1
          this.locationCount=locationCount1
          console.log(this.location,'location1',this.locationCount,'locationcount1');
          this.chart()
        }
      })
    )
    
  }
  
  chart()  {
    console.log(this.location,'location',this.locationCount,'locationcount');
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels:this.location,
      datasets: [
        {
          label: 'location Sales',
          data:this.locationCount,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
