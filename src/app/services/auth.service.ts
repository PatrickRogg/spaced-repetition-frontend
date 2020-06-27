import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { UserSignInRequestData } from '../components/sign-in/models/user-sign-in.request-model';
import { map } from 'rxjs/operators';
import { UserSignUpRequestData } from '../components/sign-up/models/user-sign-up.request-model';
import { AuthToken } from '../models/auth-token.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private router: Router,
        private authApiService: AuthApiService,
    ) { }

    public signIn(signInData: UserSignInRequestData) {
        return this.authApiService.signIn(signInData)
            .pipe(map((authToken: AuthToken) => {
                if (authToken) {
                    localStorage.setItem('token', JSON.stringify(authToken.token));
                }
                return authToken;
            }));
    }

    public signUp(signUpData: UserSignUpRequestData) {
        return this.authApiService.signUp(signUpData)
            .pipe(map((authToken: AuthToken) => {
                if (authToken) {
                    localStorage.setItem('token', JSON.stringify(authToken.token));
                }
                return authToken;
            }));
    }

    public signOut() {
        localStorage.removeItem('token');
        this.router.navigate(['/sign-in']);
    }

    public isSignedIn() {
        return !!localStorage.getItem('token');
    }

    public getToken() {
        const token: string = JSON.parse(localStorage.getItem('token'));
        if (token) {
          return token;
        }
        return '';
      }
}
