import { TestBed } from '@angular/core/testing';

import { ItensMenuService } from './itens-menu.service';

describe('ItensMenuService', () => {
  let service: ItensMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItensMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
