import { ActivatedRoute } from '@angular/router';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { isEmpty } from '../../common/constants';
import { WorkdayService } from '../../services/workday.service';
import { GetWorkdayDTO, GetWorkdayMetadataDTO } from '../../models/workday.model';

@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrl: './workday.component.scss'
})
export class WorkdayComponent implements OnInit, OnChanges {
  public loading: boolean = true;
  public workdayClosed: boolean = false;
  public workdayUpdatedLoading: boolean = false;

  public workday: GetWorkdayDTO = {} as GetWorkdayDTO;
  public workdayMetadata: GetWorkdayMetadataDTO = {} as GetWorkdayMetadataDTO;

  public createForm: FormGroup = new FormGroup({
    totalCollected: new FormControl(''),
    mediaDescription: new FormControl(''),
    totalExternalAssistance: new FormControl(''),
    externalAssistanceDescription: new FormControl(''),
  })

  constructor(
    private route: ActivatedRoute,
    private workdayService: WorkdayService
  ) {}

  ngOnChanges() {
    this.setCheckboxValues();
  }

  find(id: number, property: 'externalAssistance' | 'mediaTypes') {
    return this.workday[property].find(m => m.id === id);
  }

  setCheckboxValues() {
    if (this.workday.mediaTypes.length > 0) {
      this.workday.mediaTypes.forEach(m => {
        const e: any = document.querySelector(`.checkbox_container.media_types input#m${m.id}`);
        if (e) e.checked = true
      });
    }

    if (this.workday.externalAssistance.length > 0) {
      this.workday.externalAssistance.forEach(m => {
        const e: any = document.querySelector(`.checkbox_container.external_assistance input#m${m.id}`);
        if (e) e.checked = true
      });
    }
  }

  ngOnInit(): void {
    this.workdayService.getMetadata()
      .subscribe((metadata) => {
        this.workdayMetadata = metadata;
        this.verifyLoading();
      })

    this.workdayService.getById(this.route.snapshot.params['id'])
      .subscribe((workday) => {
        if (workday instanceof HttpErrorResponse) {

        } else {
          this.workdayClosed = new Date(workday.endTime) < new Date();
          this.workday = workday;

          this.createForm.patchValue(workday);

          this.verifyLoading();
        }
      })
  }

  public patch() {
    const workday = this.createForm.value;
    workday.externalAssistanceIds = [];
    workday.mediaTypeIds = [];

    document.querySelectorAll(".checkbox_container.media_types input")
      .forEach((input: any) => {
        const id = parseInt(input.id.split('m')[1]);
        if (input.checked) {
          workday.mediaTypeIds.push(id);
        }
      })

    document.querySelectorAll(".checkbox_container.external_assistance input")
      .forEach((input: any) => {
        const id = parseInt(input.id.split('m')[1]);
        if (input.checked) {
          workday.externalAssistanceIds.push(id);
        }
      })

    if (workday.mediaTypeIds.length === 0) delete workday.mediaTypeIds;
    if (workday.externalAssistanceIds.length === 0) delete workday.externalAssistanceIds;

    this.workdayService.patch(this.workday.id, workday)
      .subscribe((workday) => {
        if (workday instanceof HttpErrorResponse) {
          alert('Ocurrión un error al actualizar el reporte. Por favor, intente nuevamente.')
        } else {
          this.workday = workday;
          this.createForm.patchValue(workday);
          this.setCheckboxValues();

          alert('Reporte actualizado exitosamente.');
        }
      })
  }

  private verifyLoading() {
    if (!isEmpty(this.workday) && !isEmpty(this.workdayMetadata)) {
      this.loading = false;

      this.setCheckboxValues();
    }
  }
}
