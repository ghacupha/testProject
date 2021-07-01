import {Injectable} from "@angular/core";
import {EMPTY, Observable, of} from "rxjs";
import {Payment} from "./payment.model";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {State} from "../core/payment.reducers";
import {deletionComplete, paymentUpdateCompleted} from "../core/payment.actions";


@Injectable({providedIn: 'root'})
export class PaymentService{
  baseUrl = 'http://localhost:3000/payments';

  constructor(private http: HttpClient, private store: Store<State>) {
  }

  getPayments(): Observable<Payment[]> {

    return this.http.get<Payment[]>(this.baseUrl);
  }

  createPayment(payment: Payment): Observable<Payment> {

    return this.http.post<Payment>(this.baseUrl, payment)
  }

  deletePayment(id: number): Observable<Payment> {
    let deletedPayment: Observable<Payment> = EMPTY;

    this.http.delete<Payment>(`${this.baseUrl}/${id}`).subscribe((deleted) => {
      this.store.dispatch(deletionComplete({id}))
      deletedPayment = of(deleted)
    })

    return deletedPayment;
  }

  updatePayment(payment: Payment): Observable<Payment> {
    let updatedPayment: Observable<Payment> = EMPTY;

    this.http.put<Payment>(`${this.baseUrl}/${payment.id}`, payment).subscribe(updated => {
      this.store.dispatch(paymentUpdateCompleted({payment}))
      updatedPayment = of(updated);
    });

    return updatedPayment;
  }
}
