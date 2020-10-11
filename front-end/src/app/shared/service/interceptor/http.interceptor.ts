import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${sessionToken}`
        }
      });
    }
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
