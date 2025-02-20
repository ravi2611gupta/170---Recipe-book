import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean;
}

const handleAuthentication = () => {};
const handleError = () => {}

@Injectable()
export class AuthEffects {
  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signUpAction: AuthActions.SignUpStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAPIKey,
            {
              email: signUpAction.payload.email,
              password: signUpAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.AuthenticateSuccess({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.AuthenticateFail(errorMessage));
              }
              console.log(errorRes.error.error);
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage =
                    'The email address is already in use by another account.';
                  break;
                case 'OPERATION_NOT_ALLOWED':
                  errorMessage =
                    'Password sign-in is disabled for this project.';
                  break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  errorMessage =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                  break;
                case 'INVALID_LOGIN_CREDENTIALS':
                  errorMessage =
                    'The credentials is invalid or the user does not have an account.';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage =
                    'The password is invalid or the user does not have a password.';
                  break;
                case 'USER_DISABLED':
                  errorMessage =
                    'The user account has been disabled by an administrator.';
                  break;
              }
              return of(new AuthActions.AuthenticateFail(errorMessage));
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              // ...
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return new AuthActions.AuthenticateSuccess({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.AuthenticateFail(errorMessage));
              }
              console.log(errorRes.error.error);
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage =
                    'The email address is already in use by another account.';
                  break;
                case 'OPERATION_NOT_ALLOWED':
                  errorMessage =
                    'Password sign-in is disabled for this project.';
                  break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  errorMessage =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage =
                    'There is no user record corresponding to this identifier. The user may have been deleted.';
                  break;
                case 'INVALID_LOGIN_CREDENTIALS':
                  errorMessage =
                    'The credentials is invalid or the user does not have an account.';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage =
                    'The password is invalid or the user does not have a password.';
                  break;
                case 'USER_DISABLED':
                  errorMessage =
                    'The user account has been disabled by an administrator.';
                  break;
              }
              return of(new AuthActions.AuthenticateFail(errorMessage));
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
