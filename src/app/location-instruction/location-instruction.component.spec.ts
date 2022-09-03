import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInstructionComponent } from './location-instruction.component';

describe('LocationInstructionComponent', () => {
  let component: LocationInstructionComponent;
  let fixture: ComponentFixture<LocationInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
