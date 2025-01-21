import { Response } from 'express';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoginPayload, RegisterPayload, User } from '../model/common.model';
import { ApiEndpoint, LocalStorage } from '../constants/constants';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  register(payload: RegisterPayload) {
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.Register}`,
      payload
    );
  }

  login(payload: LoginPayload) {
    return this._http.post<ApiResponse<User>>(
      `${ApiEndpoint.Auth.Login}`,
      payload
    ).pipe(map((response) => {
      if (response.status && response.token) {
        localStorage.setItem(LocalStorage.token, response.token)
      }
      return Response;
    }));
  }

  me() {
    return this._http.get<ApiResponse<User>>(
      `${ApiEndpoint.Auth.Me}`
    );
  }
}
