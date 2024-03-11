import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchVolunteerComponent } from './form-search-volunteer.component';

describe('AddVolunteerComponent', () => {
  let component: FormSearchVolunteerComponent;
  let fixture: ComponentFixture<FormSearchVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSearchVolunteerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSearchVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
