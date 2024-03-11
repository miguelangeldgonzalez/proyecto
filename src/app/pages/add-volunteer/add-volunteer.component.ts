import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControlStatus } from '../../common/constants';
import { VolunteerService } from '../../services/volunteer.service';
import { GetVolunteerDTO, VolunteerFormControl } from '../../models/volunteer.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ZoneSelectComponent } from '../../components/zone-select/zone-select.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrl: './add-volunteer.component.scss'
})
export class AddVolunteerComponent implements OnInit {
  @ViewChild('zoneSelect') zoneSelect: ZoneSelectComponent | undefined;
  @ViewChild('sliderContainer') sliderContainer: ElementRef | undefined;

  validZone = {
    state: true,
    borough: true,
    municipality: true
  }

  id: number = 0;
  stepCount: number = 0;
  moveSlide: number = 0;
  resived: boolean = false;
  volunteer: GetVolunteerDTO | undefined;
  loadingCreateVolunteer: boolean = false;

  boroughId: number = 0;

  createForm: FormGroup = new FormGroup<VolunteerFormControl>({
    identification: new FormControl(),
    name: new FormControl(),
    phone: new FormControl(),
    hasPet: new FormControl(),
    birthDate: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private volunteerService: VolunteerService
  ) {
    this.formBuilder.group(this.createForm);
  }

  ngOnInit(): void {
    this.createForm
    this.id = this.route.snapshot.params['id'];
    this.stepCount = document.querySelectorAll('.slider_step').length;
  }

  handleSearchVolunteer(volunteer: GetVolunteerDTO | undefined) {
    if (volunteer?.birthDate) {
      volunteer.birthDate = volunteer.birthDate.split('T')[0];
    }

    this.createForm.patchValue({
      ...volunteer
    });
    this.volunteer = volunteer;

    if (this.zoneSelect && volunteer?.borough) {
      this.zoneSelect.externalBorough = volunteer.borough;
    }

    this.next();
  }

  next() {
    this.moveSlide = this.sliderContainer?.nativeElement.offsetWidth * -1;
  }

  addVolunteer() {
    const f = this.createForm;
    // Check if the form is valid and the boroughId is not 0 or the volunteer already exist and have a borough
    if (f.status === FormControlStatus.VALID &&
        (this.boroughId !== 0 || this.volunteer?.borough != undefined)) {
      this.loadingCreateVolunteer = true;

      if (this.boroughId !== 0) {
        f.value.boroughId = this.boroughId;
      } else if (this.volunteer) {
        f.value.boroughId = this.volunteer.borough.id;
      }

      f.value.workdayId = this.id;

      this.volunteerService.create(f.value).subscribe(
        (response) => {
          this.loadingCreateVolunteer = false;

          if (response instanceof HttpErrorResponse) {
            alert('Error al crear el voluntario, intente más tarde');
          } else {
            alert('Voluntario creado con éxito');
            window.location.reload();
          }
        }
      );
    }
  }
}
