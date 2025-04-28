import { TestBed } from '@angular/core/testing';

import { SetoresService } from './setores.service';

describe('SetoresService', () => {
  let service: SetoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
