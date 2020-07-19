import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getDecodedToken() {
    const token = localStorage.getItem('token');
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  public getRoles(): string[] {
    const token: Jwt = this.getDecodedToken();
    if (token !== null && token.role !== undefined) {
      return token.role;
    }
    return [];
  }

  public getEmail(): string {
    const token: Jwt = this.getDecodedToken();
    if (token !== null && token.email !== undefined) {
      return token.email;
    }
    return '';
  }

  public getUserId(): number {
    const token: Jwt = this.getDecodedToken();
    if (token !== null && token.userId !== undefined) {
      return token.userId;
    }
    return -1;
  }

  public isJwtExpired(): boolean {
    const token: Jwt = this.getDecodedToken();

    if (token === null) {
      return true;
    }

    const currentUnixTime = new Date().getUTCDate();
    return currentUnixTime > token.exp;
  }
}

class Jwt {
  email: string;
  role: string[];
  userId: number;
  isEmailSubscriber: boolean;
  iat: number;
  exp: number;
}
