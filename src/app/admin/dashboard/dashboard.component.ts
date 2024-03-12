import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
    private subscribe: Subscription = new Subscription()
    constructor(private _adminServcie: AdminService) { }
    basicData!: any
    basicOptions!: any
    data: any;
    revenue: any = []
    user!: any
    servicer!: any
    orders!: any
    brandOrderCount!: any
    brand!: any
    category!: any
    categoryList!: any
    categoryCount!: any
    options: any;
    ngOnInit(): void {
        this.subscribe.add(
            this._adminServcie.getDashborad().subscribe({
                next: (res: any) => {
                    console.log(res,'rtesss');
                    this.revenue = res['revenue']
                    this.user = res['user']
                    this.servicer = res['servicer']
                    this.orders = res['orders']
                    this.brandOrderCount = res['brandOrderCount']
                    this.brand = res['brand']
                    this.category = res['category']
                    let ar: any = []
                    let brandCount: any = []
                    let categoryList1: any = []
                    let categoryCount1: any = []
                    this.category.forEach((res: any) => {
                        categoryList1.push(res.category_data.category_name)
                        categoryCount1.push(res.count)
                    })
                    this.categoryList = categoryList1
                    this.categoryCount = categoryCount1

                    this.brand.forEach((res: any) => {
                        let c = 0
                        this.brandOrderCount.forEach((resB: any) => {
                            if (res._id === resB._id) {
                                c = resB.count
                            }
                        })
                        brandCount.push(c)
                        ar.push(res.Brand_name)
                    });
                    this.brand = ar
                    this.brandOrderCount = brandCount

                    this.chart()

                }
            })
        )



    }
    chart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: this.brand,
            datasets: [
                {
                    label: 'Brand Sales',
                    data: this.brandOrderCount,
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


        this.data = {
            labels: this.categoryList,
            datasets: [
                {
                    data: this.categoryCount,
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }
    ngOnDestroy(): void {
        this.subscribe.unsubscribe()
    }
}
