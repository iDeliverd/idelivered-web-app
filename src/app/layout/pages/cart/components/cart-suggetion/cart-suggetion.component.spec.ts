import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSuggetionComponent } from './cart-suggetion.component';

describe('CartSuggetionComponent', () => {
  let component: CartSuggetionComponent;
  let fixture: ComponentFixture<CartSuggetionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSuggetionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSuggetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
