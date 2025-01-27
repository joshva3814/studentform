import { TestBed } from '@angular/core/testing';

import { StudentEditService } from './student-edit.service';

describe('StudentEditService', () => {
  let service: StudentEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
