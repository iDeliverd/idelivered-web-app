import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KPayGatewayComponent } from './k-pay-gateway.component';

describe('KPayGatewayComponent', () => {
  let component: KPayGatewayComponent;
  let fixture: ComponentFixture<KPayGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KPayGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KPayGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
