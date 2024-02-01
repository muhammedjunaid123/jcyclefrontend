import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentUserproductHistoryComponent } from './rent-userproduct-history.component';

describe('RentUserproductHistoryComponent', () => {
  let component: RentUserproductHistoryComponent;
  let fixture: ComponentFixture<RentUserproductHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentUserproductHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentUserproductHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
