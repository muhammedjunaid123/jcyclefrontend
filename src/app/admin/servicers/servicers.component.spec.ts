import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersComponent } from './servicers.component';

describe('ServicersComponent', () => {
  let component: ServicersComponent;
  let fixture: ComponentFixture<ServicersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
