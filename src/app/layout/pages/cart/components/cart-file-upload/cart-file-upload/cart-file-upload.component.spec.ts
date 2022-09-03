import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFileUploadComponent } from './cart-file-upload.component';

describe('CartFileUploadComponent', () => {
  let component: CartFileUploadComponent;
  let fixture: ComponentFixture<CartFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
