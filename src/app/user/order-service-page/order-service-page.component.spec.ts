import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderServicePageComponent } from './order-service-page.component';

describe('OrderServicePageComponent', () => {
  let component: OrderServicePageComponent;
  let fixture: ComponentFixture<OrderServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderServicePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
