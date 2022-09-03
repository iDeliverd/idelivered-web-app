import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { What3wordsSuggestionsComponent } from './what3words-suggestions.component';

describe('What3wordsSuggestionsComponent', () => {
  let component: What3wordsSuggestionsComponent;
  let fixture: ComponentFixture<What3wordsSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ What3wordsSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(What3wordsSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
