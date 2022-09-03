import { TestBed } from '@angular/core/testing';

import { What3wordsService } from './what3words.service';

describe('What3wordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: What3wordsService = TestBed.get(What3wordsService);
    expect(service).toBeTruthy();
  });
});
