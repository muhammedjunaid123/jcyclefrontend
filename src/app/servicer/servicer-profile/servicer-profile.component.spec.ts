import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerProfileComponent } from './servicer-profile.component';

describe('ServicerProfileComponent', () => {
  let component: ServicerProfileComponent;
  let fixture: ComponentFixture<ServicerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicerProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
