import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicycleRentComponent } from './bicycle-rent.component';

describe('BicycleRentComponent', () => {
  let component: BicycleRentComponent;
  let fixture: ComponentFixture<BicycleRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicycleRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BicycleRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
