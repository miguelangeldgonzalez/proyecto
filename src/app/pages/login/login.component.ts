import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Form, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// Services
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { UserLogin } from '../../models/auth.model';
import { FormControlStatus, FormValue, setToTop } from '../../common/constants';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  /**
   * Shows the error message when the password is invalid
   */
  invalidPassword: boolean = false;

  /**
   * Shows the loading spinner when the user is logging in
   */
  loadingLogin: boolean = false;

  /**
   * Shows the loading spinner when the user sends the reset password email
   */
  loadingResetPassword: boolean = false;

  /**
   * Set up a red outline in the input when the value is invalid
   */
  error = {
    email: false,
    password: false
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService

  ) {
    setToTop();
  }

  /**
   * Handle the login form submit
   * @param f
   */
  onLoginSubmit(f: FormValue<UserLogin>) {
    switch (f.form.status) {
      case FormControlStatus.VALID:
        this.loadingLogin = true;
        this.authService.login(f.value.email, f.value.password)
          .pipe(catchError(err => of(err)))
          .subscribe(response => {
              if (response instanceof HttpErrorResponse) {
                if (response.status === 401) {
                  this.invalidPassword = true;
                }
              } else {
                this.loadingLogin = false;
                this.localStorageService.setUserData(response);
                this.router.navigate(['/jornadas']);
              }

              this.loadingLogin = false;
          })
          break;
      case FormControlStatus.INVALID:
          this.shakeInputsError(f.form);
    }
  }

  /**
   * Reproduce animation for invalid inputs
   * @param form
   */
  shakeInputsError(form: FormGroup) {
    const keys = Object.keys(form.controls);
          keys.forEach(key => {
            if (form.controls[key].status == FormControlStatus.INVALID) {
              (this.error as any)[key] = true;
            }
          })
          setTimeout(() => {
            keys.forEach(key => {
              (this.error as any)[key] = false;
            })
          }, 300)
  }

  resetPassword(f: FormValue<{email: string}>) {
    if (f.form.status === FormControlStatus.VALID) {
      this.loadingResetPassword = true;
      this.userService.resetPassword(f.value.email)
        .pipe(catchError(err => of(err)))
        .subscribe(rta => {
          if (rta instanceof HttpErrorResponse) {
            alert('Ha ocurrido un error al enviar el email de recuperación de contraseña. Por favor, intente nuevamente.');
          } else {
            alert('Le hemos enviado un correo con un enlace para que pueda recuperar su contraseña.');
          }

          this.loadingResetPassword = false;
        })
    }
  }
}
