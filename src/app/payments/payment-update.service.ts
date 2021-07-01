import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {State} from "../core/payment.reducers";
import {Observable, of} from "rxjs";
import {Payment} from "./payment.model";
import {paymentSelector} from "../core/payment.selectors";

/**
 * This service helps us update the state without calling the backend API
 */
@Injectable({providedIn: 'root'})
export class PaymentUpdateService {
  constructor(private store: Store<State>) {
  }

  getPaymentPostUpdate(id: number): Observable<Payment[]> {
    let previousList: Payment[] = [];

    this.store.pipe(select(paymentSelector)).subscribe(payments => previousList =payments);

    return of(this.removePayment(previousList, id));
  }

  /**
   * Remove payment of the deletedId from the array
   *
   * @param payments
   * @param deletedId
   */
  removePayment(payments: Payment[], deletedId: number): Payment[] {
    let updatedPayments: Payment[] = [];
    payments.forEach((item, index) => {
      if (item.id !== deletedId) {
        updatedPayments.push(item)
      }
    });
    return updatedPayments;
  }
}
