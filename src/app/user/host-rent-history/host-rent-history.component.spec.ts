import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRentHistoryComponent } from './host-rent-history.component';

describe('HostRentHistoryComponent', () => {
  let component: HostRentHistoryComponent;
  let fixture: ComponentFixture<HostRentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostRentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostRentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
