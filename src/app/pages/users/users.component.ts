import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CreateUserDTO, GetDisplayUserDTO, GetUserDTO } from '../../models/user.model';
import { LoggedUser, Roles } from '../../models/auth.model';
import { State } from '../../models/zone.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { ZoneService } from '../../services/zone.service';
import { FormControlStatus, FormValue } from '../../common/constants';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public showModal = false;
  public loadingStates = true;
  public loadingCreateUser = false;

  public user: LoggedUser = {} as LoggedUser;
  public states: Array<State> = [];
  public users: Array<GetDisplayUserDTO> = [];
  public displayedColumns = ['name', 'email', 'roleName', 'stateNames', 'delete'];

  public statesSelected: Array<State> = [];
  public currentState: State = {} as State;

  @ViewChild(MatTable) table: MatTable<any> | undefined;

  constructor(
    private zoneService: ZoneService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
    .subscribe(res => {
      const users: Array<GetDisplayUserDTO> = [];
      res.forEach(user => {
        var roleName = '';

        switch (user.role.name) {
          case Roles.ADMIN:
            roleName = 'Administrador';
            break;
          case Roles.STATE_MANAGER:
            roleName = 'Gerente de Estado';
            break;
          case Roles.VOLUNTEER:
            roleName = 'Voluntario';
            break;
        }

        users.push({
          ...user,
          stateNames: user.states.map(state => state.name).join(', '),
          roleName
        });
      })
      this.users = users;

      console.log(this.users);
    });

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

  onRowClicked(arg0: any) {
    console.log(arg0);
  }

  handleChangeState($event: Event) {
    this.currentState = this.states.find(state => state.id === Number(($event.target as HTMLSelectElement).value)) as State;
  }

  userSubmitHandler(f: FormValue<CreateUserDTO>) {
    this.loadingCreateUser = true;
    if (f.form.status == FormControlStatus.VALID) {
      f.value.states = this.statesSelected.map(state => state.id);

      this.userService.create(f.value)
        .pipe(catchError(err => of(err)))
        .subscribe((res: GetUserDTO | HttpErrorResponse) => {
          this.loadingCreateUser = false;
          this.showModal = false;

          if (res instanceof HttpErrorResponse) {
          } else {
            this.users.push({
              ...res,
              stateNames: res.states.map(state => state.name).join(', '),
              roleName: res.role.name
            });

            this.table?.renderRows();
          }
        });
    }
  }

  addState(e: Event) {
    e.preventDefault();
    if (this.currentState.id) {
      const exists = this.statesSelected.find(state => state.id === this.currentState.id);

      if(!exists) {
        this.statesSelected.push(this.currentState);
      }
    }
  }

  removeState(e: Event, id: number) {
    e.preventDefault();
    const index = this.statesSelected.findIndex(state => state.id === id);
    if (index != -1) this.statesSelected.splice(index, 1);
  }
}
