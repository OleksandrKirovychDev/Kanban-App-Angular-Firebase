import { TestBed } from '@angular/core/testing';

import { Boardervice } from './board.service';

describe('KanbanService', () => {
  let service: Boardervice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Boardervice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
