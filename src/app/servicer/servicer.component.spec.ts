import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerComponent } from './servicer.component';

describe('ServicerComponent', () => {
  let component: ServicerComponent;
  let fixture: ComponentFixture<ServicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
