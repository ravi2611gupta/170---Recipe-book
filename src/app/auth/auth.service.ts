import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered?: boolean; 
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBHbKU_31jzAAe_j9VSEZtUsREL-V1IJqw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown error occurred!';
          if (!error.error || !error.error.error) {
            return throwError(errorMessage);
          }
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'The email is exists already';
          }
          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHbKU_31jzAAe_j9VSEZtUsREL-V1IJqw", {
        email: email,
        password: password,
        returnSecureToken: true,
    })
  }
}
