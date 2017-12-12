import { TestBed, inject } from '@angular/core/testing';

import { FeaturedProjectService } from './featured-project.service';

describe('FeaturedProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturedProjectService]
    });
  });

  it('should be created', inject([FeaturedProjectService], (service: FeaturedProjectService) => {
    expect(service).toBeTruthy();
  }));
});
