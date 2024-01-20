import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerLoginComponent } from './servicer-login.component';

describe('ServicerLoginComponent', () => {
  let component: ServicerLoginComponent;
  let fixture: ComponentFixture<ServicerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicerLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
