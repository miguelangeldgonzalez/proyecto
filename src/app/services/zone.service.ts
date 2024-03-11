import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HOST } from '../common/constants';
import { LocalStorageService } from './local-storage.service';
import { Borough, Municipality, State } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private host = HOST + '/zone'

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  getStates() {
    return this.http.get<Array<State>>(`${this.host}/states`, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }

  getMunicipalities(stateId: number) {
    return this.http.get<Array<Municipality>>(`${this.host}/municipalities/${stateId}`, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }

  getBoroughs(municipalityId: number) {
    return this.http.get<Array<Borough>>(`${this.host}/boroughs/${municipalityId}`, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }
}
