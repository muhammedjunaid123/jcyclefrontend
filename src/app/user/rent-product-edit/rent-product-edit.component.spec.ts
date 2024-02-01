import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentProductEditComponent } from './rent-product-edit.component';

describe('RentProductEditComponent', () => {
  let component: RentProductEditComponent;
  let fixture: ComponentFixture<RentProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentProductEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
