import { Observable, of, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';
import { IResponse } from 'src/models/i-response';

const SERVICE_KEY = 'gUIuyoiduIhOxw84pizEUh1aRMBIfRtS6vjdlor2m6CW18hg1iC86%2Bdds%2Bp9OSAgTODdzZcfw0vUqOmllj7c1Q%3D%3D';

@Injectable()
export class HttpService {

  protected baseUrl: string;

  protected get headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*')
    return headers;
  }

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject('BASE_API_URL') baseUrl: string,
    protected route: ActivatedRoute,
    protected router: Router) {

    this.baseUrl = baseUrl;
  }

  get<T>(url: string, params: any): Observable<T[]> {
    return this.http.get<IResponse<T>>(`${this.baseUrl}`, {headers: this.headers, params: params})
      .pipe(
        // tap((data) => { this.logger.log('HTTP GET data: ', data); }),
        catchError((err: HttpErrorResponse) => this.handleError(err))
      );
  }

  protected handleError(err: HttpErrorResponse): Observable<any> {
    return throwError(err);
  }
}
