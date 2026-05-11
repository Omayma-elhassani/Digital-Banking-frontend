import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    if (token && !req.url.includes('/auth/login')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
      return throwError(() => err);
    }));
  }
}
