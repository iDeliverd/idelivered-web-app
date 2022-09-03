import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSuppliersComponent } from './service-suppliers.component';

describe('ServiceSuppliersComponent', () => {
  let component: ServiceSuppliersComponent;
  let fixture: ComponentFixture<ServiceSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
