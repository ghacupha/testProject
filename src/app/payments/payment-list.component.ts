import {Component, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {Payment} from "./payment.model";
import {select, Store} from "@ngrx/store";
import {State} from "../core/payment.reducers";
import {paymentSelector} from "../core/payment.selectors";
import {Router} from "@angular/router";
import {loadPayments} from "../core/payment.actions";

@Component({
  selector: 'payment-list-component',
  template: `
    <h4>Payments</h4>
    <ul>
      <li *ngFor="let payment of payments$ | async">
        {{payment.paymentNumber}}, {{payment.payee}}. {{payment.paymentAmount}}
      </li>
    </ul>
    <button (click)="update()">Create Payment...</button>
  `
})
export class PaymentListComponent implements OnInit {
  payments$: Observable<Payment[]>

  constructor(private store: Store<State>, private router: Router) {

    this.payments$ = this.store.pipe(select(paymentSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPayments());
  }

  update() {
    this.router.navigate(['payment-update'])
  }
}
