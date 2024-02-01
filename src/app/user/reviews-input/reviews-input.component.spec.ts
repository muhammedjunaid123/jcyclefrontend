import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsInputComponent } from './reviews-input.component';

describe('ReviewsInputComponent', () => {
  let component: ReviewsInputComponent;
  let fixture: ComponentFixture<ReviewsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
