/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmergencyService } from './Emergency.service';

describe('Service: Emergency', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmergencyService]
    });
  });

  it('should ...', inject([EmergencyService], (service: EmergencyService) => {
    expect(service).toBeTruthy();
  }));
});
