import { environment as ENV } from './../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        LoginModule, // has ReactiveFormModule
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
      ],
      providers: [
        AuthService,
        { provide: 'BASE_API_URL', useValue: ENV.apiUrl}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ///////////// DOM ////////////////////
  it('should create form', () => {
    const formDebugElement = fixture.debugElement.query(By.css('form'))
    const formEl = formDebugElement.nativeElement;
    expect(formEl).toBeTruthy();
  })

  it('should create login button', () => {
    const btnDebugElement = fixture.debugElement.query(By.css('#login-btn'))
    const btnEl = btnDebugElement.nativeElement;
    expect(btnEl).toBeTruthy();
  })
  //////////////////////////////////////

  ///////////// form ///////////////////
  describe('form with creation and validation', () => {
    it('should create a form with 2 controls', () => {
      expect(component.loginForm.contains('name')).toBeTruthy();
      expect(component.loginForm.contains('password')).toBeTruthy();
    });

    it ('should make name control required', () => {
      const nameControl = component.loginForm.get('name');
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
    })

    it ('should make password control required', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl.setValue('');
      expect(passwordControl.valid).toBeFalsy();
    })

    it ('should make password control with minimum 8 characters', () => {
      const passwordControl = component.loginForm.get('password');
      passwordControl.setValue('12345678');
      expect(passwordControl.valid).toBeTruthy();
    })
  });
  ///////////////////////////////////////////////////


});
