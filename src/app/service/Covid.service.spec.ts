/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CovidService } from './Covid.service';

describe('Service: Covid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CovidService]
    });
  });

  it('should ...', inject([CovidService], (service: CovidService) => {
    expect(service).toBeTruthy();
  }));
});
