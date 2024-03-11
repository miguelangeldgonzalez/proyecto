import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Services
import { ZoneService } from '../../services/zone.service';
import { LocalStorageService } from '../../services/local-storage.service';

// Models
import { LoggedUser, Roles } from '../../models/auth.model';
import { GetWorkdayLocationDTO } from '../../models/location.model';
import { Borough, Municipality, State } from '../../models/zone.model';
import { WorkdayLocationService } from '../../services/workday-location.service';

@Component({
  selector: 'app-zone-select',
  templateUrl: './zone-select.component.html',
  styleUrl: './zone-select.component.scss'
})
export class ZoneSelectComponent implements OnInit, AfterViewChecked {
  public states: Array<State> = [];
  public boroughs: Array<Borough> = [];
  public municipalities: Array<Municipality> = [];

  public workdayLocations: Array<GetWorkdayLocationDTO> = [];

  private user: LoggedUser = {} as LoggedUser;

  public loadingStates = true;
  public loadingBoroughs = false;
  public loadingMunicipalities = false;
  public loadingWorkdayLocations = false;

  private externalBoroughInserted: boolean = false;

  set externalBorough(value: Borough) {
    this.boroughs = [value];
    this.externalBoroughInserted = true;
  }

  @Input() public searchWorkdayLocation = false;

  @Input() public valid: {
    state: boolean,
    borough: boolean,
    municipality: boolean,
    workdayLocation?: boolean
  } = {
    state: false,
    borough: false,
    municipality: false,
    workdayLocation: false
  };

  @Output() public boroughId = new EventEmitter<number>();

  constructor(
    private zoneService: ZoneService,
    private localStorageService: LocalStorageService,
    private workdayLocationService: WorkdayLocationService
  ) { }

  ngAfterViewChecked(): void {
    try {
      if (this.externalBoroughInserted) {
        const boroughSelect = document.querySelector(`select[name='boroughId'] option:nth-child(2)`) as HTMLOptionElement;

        boroughSelect.selected = true;
        this.externalBoroughInserted = false;
      }
    } catch {
      console.error('Error setting external borough');
    }
  }

  ngOnInit(): void {
    this.user = this.localStorageService.getUserData() as LoggedUser;

    if (this.user.role.name === Roles.ADMIN) {
      this.zoneService.getStates().subscribe((states: Array<State>) => {
        this.states = states;
        this.loadingStates = false;
      });
    } else {
      this.states = this.user.states;
      this.loadingStates = false;
    }
  }

  handleChangeState(event: Event): void {
    this.loadingMunicipalities = true;
    const stateId = parseInt((event.target as HTMLSelectElement).value);

    this.zoneService.getMunicipalities(stateId)
      .subscribe((municipalities: Array<Municipality>) => {
        this.municipalities = municipalities;
        this.loadingMunicipalities = false;
      });
  }

  handleChangeMunicipality(event: Event): void {
    this.loadingBoroughs = true;
    const municipalityId = parseInt((event.target as HTMLSelectElement).value);

    this.zoneService.getBoroughs(municipalityId)
      .subscribe((boroughs: Array<Borough>) => {
        this.boroughs = boroughs;
        this.loadingBoroughs = false;
      });
  }

  handleChangeBorough(e: Event) {
    if (this.searchWorkdayLocation) {
      this.loadingWorkdayLocations = true;
      this.workdayLocationService.get(parseInt((e.target as HTMLSelectElement).value))
        .subscribe((workdayLocations: Array<GetWorkdayLocationDTO>) => {
          this.workdayLocations = workdayLocations;

          if (this.workdayLocations.length == 0) {
            alert('No hay ubicaciones registradas para esta parroquia');
          }
          this.loadingWorkdayLocations = false;
        });
    } else {
      this.boroughId.emit(parseInt((e.target as HTMLSelectElement).value));
    }
  }

  handleChangeWorkdayLocation(e: Event) {
    this.boroughId.emit(parseInt((e.target as HTMLSelectElement).value));
  }

  /**
   * Reset all the values of the component
   */
  clean() {
    console.log('clean');
    this.states = [];
    this.boroughs = [];
    this.municipalities = [];
    this.workdayLocations = [];

    this.ngOnInit();
    document.querySelectorAll('select option:nth-child(1)').forEach((option) => {
      (option as HTMLOptionElement).selected = true;
    });
  }
}
