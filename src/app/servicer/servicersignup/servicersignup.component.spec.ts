import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersignupComponent } from './servicersignup.component';

describe('ServicersignupComponent', () => {
  let component: ServicersignupComponent;
  let fixture: ComponentFixture<ServicersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicersignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
