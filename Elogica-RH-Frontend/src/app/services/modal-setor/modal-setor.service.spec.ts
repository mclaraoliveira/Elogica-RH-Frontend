import { TestBed } from '@angular/core/testing';

import { ModalSetorService } from './modal-setor.service';

describe('ModalSetorService', () => {
  let service: ModalSetorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalSetorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
