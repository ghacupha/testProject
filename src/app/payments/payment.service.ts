import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Payment} from "./payment.model";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class PaymentService{
  baseUrl = 'http://localhost:3000/payments';

  constructor(private http: HttpClient) {
  }

  getPayments(): Observable<Payment[]> {

    return this.http.get<Payment[]>(this.baseUrl);
  }

  createPayment(payment: Payment): Observable<Payment> {

    return this.http.post<Payment>(this.baseUrl, payment)
  }
}
