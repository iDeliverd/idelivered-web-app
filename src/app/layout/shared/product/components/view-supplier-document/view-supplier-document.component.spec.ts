import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierDocumentComponent } from './view-supplier-document.component';

describe('ViewSupplierDocumentComponent', () => {
  let component: ViewSupplierDocumentComponent;
  let fixture: ComponentFixture<ViewSupplierDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
