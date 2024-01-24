import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SreviceListComponent } from './srevice-list.component';

describe('SreviceListComponent', () => {
  let component: SreviceListComponent;
  let fixture: ComponentFixture<SreviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SreviceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SreviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
