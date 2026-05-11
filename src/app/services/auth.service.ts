import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  access_token: string;
  username: string;
  scope: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backendHost}/auth/login`, { username, password })
      .pipe(tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('scope', res.scope);
      }));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('scope');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getRoles(): string[] {
    const scope = localStorage.getItem('scope') || '';
    return scope.split(' ').filter(r => !!r);
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
