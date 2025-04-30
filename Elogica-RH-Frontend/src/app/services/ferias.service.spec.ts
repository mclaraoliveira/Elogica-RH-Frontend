import { TestBed } from '@angular/core/testing';
import { FeriasService } from './ferias.service';

describe('FeriasService', () => {
  let service: FeriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
