import { catchError, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { FormControlStatus } from '../../common/constants';
import { shakeInputsError } from '../../common/shake-error';
import { WorkdayLocationService } from '../../services/workday-location.service';
import { ZoneSelectComponent } from '../../components/zone-select/zone-select.component';
import { GetWorkdayLocationDTO, WorkdayLocationFormControl } from '../../models/location.model';
import { setToTop } from '../../models/constants';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnInit {
  @ViewChild('zoneSelect') zoneSelect: ZoneSelectComponent | undefined;

  /**
   * @description Validations for the zone inputs
   */
  public validZone = {
    state: true,
    municipality: true,
    borough: true
  }

  /**
   * @description Validations for the location inputs
   */
  public validLocation = {
    title: false
  }

  /**
   * @description The id of the borough
   */
  public boroughId: number = 0;

  /**
   * @description The modal state
   */
  public showModal = false;

  /**
   * @description The list of locations created
   */
  public workdyaLocations: Array<GetWorkdayLocationDTO> = [];

  /**
   * @description The loading state for the create location request
   */
  public loadingCreateLocation = false;

  /**
   * @description The editable state for the location
   */
  public editable: boolean = false;

  public locationForm: FormGroup = new FormGroup<WorkdayLocationFormControl>({
    id: new FormControl(),
    title: new FormControl(),
    boroughId: new FormControl(),
    description: new FormControl(),
    locationUrl: new FormControl()
  })

  constructor(
    private workdayLocationService: WorkdayLocationService
  ) { }

  locationSubmitHandler() {
    const f = this.locationForm;

    if (f.status == FormControlStatus.VALID && this.boroughId > 0) {
      this.loadingCreateLocation = true;
      f.value.boroughId = this.boroughId;

      this.workdayLocationService.create(f.value)
        .pipe(catchError(err => of(err)))
        .subscribe(rta => {
            if (rta instanceof HttpErrorResponse) {
              // TODO: Show error message
            } else {
              this.showModal = false;
              this.loadingCreateLocation = false;
              this.workdyaLocations.push(rta);

              //TODO: Show success message
            }
        });
    } else if (this.editable){
      this.loadingCreateLocation = true;
      f.value.boroughId = this.boroughId !== 0 ? this.boroughId : f.value.boroughId;

      this.workdayLocationService.update(f.value)
        .pipe(catchError(err => of(err)))
        .subscribe(rta => {
            if (rta instanceof HttpErrorResponse) {
              alert('La actualización de la ubicación ha fallado')
            } else {
              alert('Ubicación actualizada');

              const index = this.workdyaLocations.findIndex(location => location.id === rta.id);
              this.workdyaLocations[index] = rta;

              this.showModal = false;
            }

            this.loadingCreateLocation = false;
            this.editable = false;
          });

    } else {
      shakeInputsError(f, this.validLocation);
      this.validZone.borough = false;
      setTimeout(() => {
        this.validZone.borough = true;
      }, 300);
    }
  }

  ngOnInit() {
    this.workdayLocationService.get()
      .subscribe((locations: Array<GetWorkdayLocationDTO>) => {
        this.workdyaLocations = locations;
      });
  }

  edit(location: GetWorkdayLocationDTO) {
    this.locationForm.patchValue({
      ...location,
      boroughId: location.borough.id
    });


    if (this.zoneSelect) {
      this.zoneSelect.clean();
      this.zoneSelect.externalBorough = location.borough;
    }

    this.editable = true;
    this.showModal = true;
    setToTop();
  }

  textModal() {
    return this.editable ? 'Editar' : 'Crear';
  }

  addLocation() {
    this.locationForm.reset();
    this.editable = false;
    this.showModal = true;

    if (this.zoneSelect) {
      this.zoneSelect.clean();
    }
  }
}
