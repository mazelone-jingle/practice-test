import { environment } from './../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService, ITokenResponse, TOKEN_KEY } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';

const MOCK_SUCC_RESPONSE: ITokenResponse = {
  depart: '',
  domain: 'KFHI',
  email: 'mazelone',
  expires_in: 120,
  name: '마젤원',
  refresh_token: 'JHLfvRDnA/2ALYFosY5m01ppq+cSkf67a+zWp2iuzwE=',
  role: 'ADMIN',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJtYXplbG9uZSIsInVuaXF1ZV9uYW1lIjoi66eI7KCk7JuQIiwicm9sZSI6IkFETUlOIiwidGlkIjoiS0ZISSIsIm5iZiI6MTY0MDA2MzczNywiZXhwIjoxNjQwMDcwOTM3LCJpYXQiOjE2NDAwNjM3Mzd9.hO-jR-zbtxcFZxuwHLLGaZx9YrVkrE18QUyO75BJCag',
  type: 'BUYER',
}

const MOCK_FAIL_RESPONSE = {
  code: 'Unauthorized',
  message: 'Invalid password or expired token.'
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: 'BASE_API_URL', useValue: environment.apiUrl },
      ],
      imports: [HttpClientModule]
    })
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`'login' function mock testing`, () => {
    it('#login success response', (done) => {
      const id = 'mazelone';
      const pwd = 'mazelone';
      service.login(id, pwd).subscribe({
        next: (response) => {
          expect(response.email).toEqual(id);
          expect(response.name).toEqual('마젤원');
          done();
        }
      })
    })

    it('#login failed response', (done) => {
      const id = 'mazelone';
      const pwd = '0000';
      service.login(id, pwd).subscribe({
        next: () => {},
        error: (error) => {
          console.log(error)
          expect(error.error.code).toBe('Unauthorized');
          expect(error.error.message).toBe('Invalid password or expired token.');
          done();
        }
      })
    })
  });

});
