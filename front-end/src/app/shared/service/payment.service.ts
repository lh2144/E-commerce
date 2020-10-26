import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    public constructor(private http: HttpClient) {}

    public getClientSecret(): Observable<any> {
      return this.http.get(environment.base + 'buyflow/paymentIntent');
    }

    public submitOrder(payload: any): Observable<any> {
      return this.http.post(environment.base + 'buyflow/placeorder', payload);
    }
}
