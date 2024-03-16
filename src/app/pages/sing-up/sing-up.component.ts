import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  public userName: string = 'María';
  public password: string = '';

  public validations: {
    content: string,
    valid: boolean,
    checked: boolean
  }[] = [
    {
      content: 'Debe tener al menos 8 caracteres',
      valid: false,
      checked: false
    },
    {
      content: 'Debe tener al menos una letra',
      valid: false,
      checked: false
    },
    {
      content: 'Debe tener al menos un número',
      valid: false,
      checked: false
    },
    {
      content: 'Ambas contraseñas deben coincidir',
      valid: false,
      checked: false
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];

    this.userService.getTokenStatus(token)
      .pipe(catchError(err => of(err)))
      .subscribe(rta => {
        console.log(rta);
        if (rta instanceof HttpErrorResponse) {
          if (rta.status == 401) {
            this.router.navigate(['/']);
          }
        } else {
          this.userName = rta.name;
        }
      })
  }

  public validatePassword(event: any): void {
    this.password = event.value;

    this.validations[0].valid = this.password.length >= 8;
    this.validations[0].checked = true;

    this.validations[1].valid = /[a-zA-Z]/.test(this.password);
    this.validations[1].checked = true;

    this.validations[2].valid = /[0-9]/.test(this.password);
    this.validations[2].checked = true;
  }

  public validateConfirmPassword(event: any): void {
    this.validations[3].valid = this.password === event.value;
    this.validations[3].checked = true;
  }

  public singUp(): void {
    if (this.validations.every(v => v.valid)) {
      this.userService.setPassword(this.password, this.route.snapshot.queryParams['token'])
        .pipe(catchError(err => of(err)))
        .subscribe(rta => {
          if (rta instanceof HttpErrorResponse) {
            alert('Ha ocurrido un error al intentar establecer la contraseña por favor pongase en contacto con el administrador del sistema')
          } else {
            alert('Contraseña establecida correctamente');
          }
          this.router.navigate(['/']);
        });
    }
  }
}
