import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../common/constants';
import { LocalStorageService } from './local-storage.service';
import { CreateUserDTO, GetUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private HOST = HOST + '/user';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getAll() {
    return this.httpClient.get<GetUserDTO[]>(this.HOST, {
      headers: {
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }

  create(data: CreateUserDTO) {
    return this.httpClient.post<GetUserDTO>(this.HOST, data, {
      headers: {
        'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
      }
    });
  }
}
