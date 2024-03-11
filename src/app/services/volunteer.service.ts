import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST } from '../common/constants';
import { CreateVolunteerDTO, GetVolunteerDTO } from '../models/volunteer.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private host = HOST + '/volunteer'

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getByIdentification(identification: number) {
    return this.http.get<GetVolunteerDTO>(this.host + `?identification=${identification}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }

  create(volunteer: CreateVolunteerDTO) {
    return this.http.post<GetVolunteerDTO>(this.host, volunteer, {
      headers: {
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }
}
