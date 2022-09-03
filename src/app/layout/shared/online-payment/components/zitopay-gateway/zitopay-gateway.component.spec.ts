import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZitopayGatewayComponent } from './zitopay-gateway.component';

describe('ZitopayGatewayComponent', () => {
  let component: ZitopayGatewayComponent;
  let fixture: ComponentFixture<ZitopayGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZitopayGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZitopayGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
