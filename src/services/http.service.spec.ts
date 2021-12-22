import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../environments/environment';
import { AppModule } from './../app/app.module';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

const TEST_URL = ''

describe('HttpService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        { provide: 'BASE_API_URL', useValue: environment.apiUrl},
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(HttpService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // describe(`'get' function testing`, () => {
  //   it('#get should return success response', () => {
  //     const params = {}
  //     expect(service.get(environment.apiUrl + TEST_URL, params))
  //   })
  // })
});
