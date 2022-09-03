import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReviewExtraProductComponent } from './order-review-extra-product.component';

describe('OrderReviewExtraProductComponent', () => {
  let component: OrderReviewExtraProductComponent;
  let fixture: ComponentFixture<OrderReviewExtraProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReviewExtraProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReviewExtraProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
