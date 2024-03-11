import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST } from '../common/constants';
import { LoggedUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host = HOST + '/auth'

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<LoggedUser>(`${this.host}/login`, { email, password })
  }
}
