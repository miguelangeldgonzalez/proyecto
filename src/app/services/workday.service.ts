import { Injectable } from '@angular/core';
import { HOST } from '../common/constants';
import { HttpClient } from '@angular/common/http';
import { CreateWorkdayDTO, GetWorkdayDTO, GetWorkdayMetadataDTO, UpdateWorkdayDTO } from '../models/workday.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WorkdayService {
  public HOST = HOST + '/workday';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  public getById(id: number) {
    return this.http.get<GetWorkdayDTO>(this.HOST + '/' + id, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getUserToken(),
      }
    })
  }

  public create(data: CreateWorkdayDTO) {
    return this.http.post<GetWorkdayDTO>(this.HOST, data, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getUserToken(),
      }
    });
  }

  public get() {
    return this.http.get<GetWorkdayDTO[]>(this.HOST, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getUserToken(),
      }
    });
  }

  public getMetadata() {
    return this.http.get<GetWorkdayMetadataDTO>(this.HOST + '/metadata', {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getUserToken(),
      }
    })
  }

  public patch(id: number, data: UpdateWorkdayDTO) {
    return this.http.patch<GetWorkdayDTO>(this.HOST + '/' + id, data, {
      headers: {
        'Authorization': 'Bearer ' + this.localStorageService.getUserToken(),
      }
    });
  }
}
