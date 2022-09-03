import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzowpayComponent } from './ozowpay.component';

describe('OzowpayComponent', () => {
  let component: OzowpayComponent;
  let fixture: ComponentFixture<OzowpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzowpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzowpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
