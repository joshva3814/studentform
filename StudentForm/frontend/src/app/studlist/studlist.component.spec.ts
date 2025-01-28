import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudlistComponent } from './studlist.component';

describe('StudlistComponent', () => {
  let component: StudlistComponent;
  let fixture: ComponentFixture<StudlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
