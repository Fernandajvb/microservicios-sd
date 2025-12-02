import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(payload: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http.post(`${this.api}/auth/register`, payload);
  }

  login(payload: { email: string; password: string }) {
    return this.http.post(`${this.api}/auth/login`, payload);
  }
}
