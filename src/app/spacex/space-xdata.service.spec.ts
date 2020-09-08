import { TestBed } from '@angular/core/testing';

import { SpaceXdataService } from './space-xdata.service';

describe('SpaceXdataService', () => {
  let service: SpaceXdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceXdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
