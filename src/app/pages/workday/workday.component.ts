import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { WorkdayService } from '../../services/workday.service';
import { FormControlStatus, FormValue } from '../../common/constants';
import { CreateWorkdayFormDTO, GetWorkdayDTO } from '../../models/workday.model';

@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrl: './workday.component.scss'
})
export class DashboardComponent implements OnInit {
  public showModal: boolean = false;
  public loadingCreateWorkday = false;
  public workdayLocationId: number = 0;

  public workdays: GetWorkdayDTO[] = [];

  public validZone = {
    state: true,
    borough: true,
    municipality: true,
    workdayLocation: true
  }

  public validWorkday = {
    title: true
  }

  constructor (
    private workdayService: WorkdayService
  ) { }

  ngOnInit(): void {
    this.workdayService.get().subscribe(data => {
      if (data instanceof HttpErrorResponse) {

      } else {
        this.workdays = data;
        console.log(data);
      }
    });
  }

  workdaySubmitHandler(f: FormValue<CreateWorkdayFormDTO>) {
    switch (f.form.status) {
      case FormControlStatus.VALID:
        if (this.workdayLocationId) {
          this.loadingCreateWorkday = true;
          this.workdayService.create({
            ...f.value,
            workdayLocationId: this.workdayLocationId
          }).subscribe(data => {
            if (data instanceof HttpErrorResponse) {

            } else {
              this.loadingCreateWorkday = false;
              this.showModal = false;
              this.workdays.push(data);
            }
          });
        }
        break;
      case FormControlStatus.INVALID:
        break;
    }
  }
}
