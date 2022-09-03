import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackUserOrderComponent } from './track-user-order.component';

describe('TrackUserOrderComponent', () => {
  let component: TrackUserOrderComponent;
  let fixture: ComponentFixture<TrackUserOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackUserOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackUserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
