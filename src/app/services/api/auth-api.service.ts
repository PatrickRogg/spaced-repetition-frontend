import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CORE_API_URL } from 'src/app/app.constants';
import { UserSignInRequestData } from 'src/app/components/sign-in/models/user-sign-in.request-model';
import { UserSignUpRequestData } from 'src/app/components/sign-up/models/user-sign-up.request-model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private header = { headers: { 'Content-Type': 'application/json' } };
  private AUTH_API_URL = CORE_API_URL + 'authentication/';

  constructor(private httpClient: HttpClient) {}

  public signIn(userSignInRequestData: UserSignInRequestData) {
    return this.httpClient.post(
      this.AUTH_API_URL + 'sign-in',
      userSignInRequestData,
      this.header
    );
  }

  public signUp(userSignUpRequestData: UserSignUpRequestData) {
    return this.httpClient.post(
      this.AUTH_API_URL + 'sign-up',
      userSignUpRequestData,
      this.header
    );
  }
}
