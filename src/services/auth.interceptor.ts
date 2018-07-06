// src/app/auth/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.authenticated) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.getEncryptedCredentials()}`
        }
      });
    }
    return next.handle(request);
  }
}
