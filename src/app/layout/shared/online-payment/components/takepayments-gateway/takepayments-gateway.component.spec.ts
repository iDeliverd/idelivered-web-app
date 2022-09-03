import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakepaymentsGatewayComponent } from './takepayments-gateway.component';

describe('TakepaymentsGatewayComponent', () => {
  let component: TakepaymentsGatewayComponent;
  let fixture: ComponentFixture<TakepaymentsGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakepaymentsGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakepaymentsGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
