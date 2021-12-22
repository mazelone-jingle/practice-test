import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { IResponse } from 'src/models/i-response';
export const TOKEN_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string;
  userSubject: BehaviorSubject<ITokenResponse>;
  user$: Observable<ITokenResponse>;

  constructor(
    private http: HttpClient,
    @Inject('BASE_API_URL') baseUrl
  ) {
    this.apiUrl = `${baseUrl}api/Token`;
  }

  login(id: string, password: string) {
    const authReq = <ITokenRequest>{
      grantType: GrantType.password,
      id: id,
      password: password,
      refreshToken: '',
    };
    return this.loginInternal(authReq);
  }

  private loginInternal(authReq: ITokenRequest) {
    return this.http.post(this.apiUrl, authReq).pipe(
      catchError((err) => {

        throw err;
      }),
      map((res: IResponse<ITokenResponse>) => {
        this.handleTokenResponse(res.result);
        return res.result;
      })
    );
  }

  private handleTokenResponse(token: ITokenResponse) {
    // localStorage.clear();
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }
}

export enum GrantType {
  password = 'password',
  refresh = 'refresh',
}

export interface ITokenRequest {
  id: string;
  password?: string;
  grantType: GrantType;
  refreshToken?: string;
}

export interface ITokenResponse {
  depart: string;
  domain: string;
  email: string;
  expires_in: number;
  name: string;
  refresh_token: string;
  role: string;
  token: string;
  type: string;
}
