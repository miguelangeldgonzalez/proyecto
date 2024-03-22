import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkdayReportComponent } from './workday-report.component';

describe('WorkdayComponent', () => {
  let component: WorkdayReportComponent;
  let fixture: ComponentFixture<WorkdayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkdayReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkdayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
