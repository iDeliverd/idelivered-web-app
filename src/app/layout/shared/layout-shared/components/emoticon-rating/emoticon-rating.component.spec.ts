import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmoticonRatingComponent } from './emoticon-rating.component';

describe('EmoticonRatingComponent', () => {
  let component: EmoticonRatingComponent;
  let fixture: ComponentFixture<EmoticonRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmoticonRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoticonRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
