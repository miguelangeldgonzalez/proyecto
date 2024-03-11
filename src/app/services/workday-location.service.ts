import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { HOST } from '../common/constants';
import { LocalStorageService } from './local-storage.service';
import { CreateWorkdayLocationDTO, GetWorkdayLocationDTO } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class WorkdayLocationService {
  private host = HOST + '/workday-location'

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  create(location: CreateWorkdayLocationDTO) {
    return this.http.post(this.host, location, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }

  get(boroughId?: number) {
    return this.http.get<GetWorkdayLocationDTO[]>(this.host, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      },
      params: boroughId ? new HttpParams().set('boroughId', boroughId) : undefined
    });
  }

  update(location: GetWorkdayLocationDTO) {
    const id = location.id;
    delete (location as any).id;

    return this.http.patch<GetWorkdayLocationDTO>(this.host + '/' + id, location, {
      headers: {
        Authorization: `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }
}
