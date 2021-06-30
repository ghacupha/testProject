import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PaymentService} from "../payments/payment.service";
import {
  createPayment, createPaymentFailure,
  createPaymentSuccess,
  loadPayments,
  paymentsLoadFailure,
  paymentsLoadSuccess
} from "./payment.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class paymentEffects{

  loadEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPayments),
      switchMap(
        () => this.service.getPayments().pipe(
          map(payments => paymentsLoadSuccess({payments})),
          catchError(error => of(paymentsLoadFailure({error})))
        )
      )
    )
  );

  createEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(createPayment),
      switchMap(
        (action) => this.service.createPayment(action.payment).pipe(
          map(payment => createPaymentSuccess({payment})),
          catchError(error => of(createPaymentFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: PaymentService) {
  }
}
