import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagCoursesComponent } from './manag-courses.component';

describe('ManagCoursesComponent', () => {
  let component: ManagCoursesComponent;
  let fixture: ComponentFixture<ManagCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
