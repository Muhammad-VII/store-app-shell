import { TestBed } from '@angular/core/testing';

import { DynamicComponentsLoadService } from './dynamic-components-load.service';

describe('DynamicComponentsLoadService', () => {
  let service: DynamicComponentsLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicComponentsLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
