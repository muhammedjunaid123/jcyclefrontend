import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAddComponent } from './rent-add.component';

describe('RentAddComponent', () => {
  let component: RentAddComponent;
  let fixture: ComponentFixture<RentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
