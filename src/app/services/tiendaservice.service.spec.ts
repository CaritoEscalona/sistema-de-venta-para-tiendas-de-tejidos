import { TestBed } from '@angular/core/testing';

import { TiendaServiceService } from './tiendaservice.service';

describe('TiendaserviceService', () => {
  let service: TiendaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
