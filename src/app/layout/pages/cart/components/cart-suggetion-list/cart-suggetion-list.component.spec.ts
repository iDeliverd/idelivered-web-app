import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSuggetionListComponent } from './cart-suggetion-list.component';

describe('CartSuggetionListComponent', () => {
  let component: CartSuggetionListComponent;
  let fixture: ComponentFixture<CartSuggetionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSuggetionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSuggetionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
