import { Component, EventEmitter, Output } from '@angular/core';
import { VolunteerService } from '../../services/volunteer.service'; // Import the VolunteerService
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlStatus } from '../../common/constants';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GetVolunteerDTO } from '../../models/volunteer.model';

@Component({
  selector: 'app-form-search-volunteer',
  templateUrl: './form-search-volunteer.component.html',
  styleUrl: './form-search-volunteer.component.scss'
})
export class FormSearchVolunteerComponent {
  @Output() next = new EventEmitter<GetVolunteerDTO>();

  public loading: boolean = false;

  identificationForm: FormGroup<{ identification: FormControl }> = new FormGroup({
    identification: new FormControl(''),
  });

  constructor(private volunteerService: VolunteerService) {}

  searchVolunteer() {
    const f = this.identificationForm;

    if (f.status === FormControlStatus.VALID) {
      this.loading = true;

      this.volunteerService.getByIdentification(f.value.identification)
        .pipe(catchError(err => of(err)))
        .subscribe(
          (response) => {
            this.loading = false;
            if (!(response instanceof HttpErrorResponse)) {
              this.next.emit(response);
            } else {
              this.next.emit({
                identification: f.value.identification
              } as GetVolunteerDTO);
            }
          }
        );
    }
  }
}
