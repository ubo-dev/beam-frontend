import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  baseUrl = 'http://localhost:8080';
  httpClient = inject(HttpClient);

  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/signup`, data);
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/login`, data)
      .pipe(tap(
        result => {
          localStorage.setItem('token', JSON.stringify(result));
        }
      ));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
