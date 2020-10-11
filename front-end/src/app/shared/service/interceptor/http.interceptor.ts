import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionToken = localStorage.getItem('sessionToken');
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    if (sessionToken) {
      headers.set('authorization', `Bearer ${sessionToken}`);
    }
    req = req.clone({headers});
    return next.handle(req).pipe(
        catchError((error: any) => {
            if (error instanceof HttpErrorResponse) {
                console.log(error);
            }
            return of(error);
        })
    );
  }
}
