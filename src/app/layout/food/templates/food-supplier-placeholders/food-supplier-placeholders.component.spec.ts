import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSupplierPlaceholdersComponent } from './food-supplier-placeholders.component';

describe('FoodSupplierPlaceholdersComponent', () => {
  let component: FoodSupplierPlaceholdersComponent;
  let fixture: ComponentFixture<FoodSupplierPlaceholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodSupplierPlaceholdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSupplierPlaceholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
