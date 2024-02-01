import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentreviewComponent } from './rentreview.component';

describe('RentreviewComponent', () => {
  let component: RentreviewComponent;
  let fixture: ComponentFixture<RentreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
