import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PaymentService} from "../payments/payment.service";
import {
  createPayment, createPaymentFailure,
  createPaymentSuccess, deletePayment, deletePaymentFailure, deletePaymentSuccess, deletionComplete,
  loadPayments, onDeletionCompleteFailure, onDeletionCompleteSuccess,
  paymentsLoadFailure,
  paymentsLoadSuccess, updatePayment, updatePaymentFailure, updatePaymentSuccess
} from "./payment.actions";
import {catchError, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {PaymentUpdateService} from "../payments/payment-update.service";

@Injectable()
export class paymentEffects{

  // todo deletion-complete without triggering the http-client
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

  // todo deletion-complete without triggering the http-client
  deletionCompleteEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(deletionComplete),
      switchMap(
        (action) => this.updateService.getPaymentPostUpdate(action.id).pipe(
          map(payments => onDeletionCompleteSuccess({payments})),
          catchError(error => of(onDeletionCompleteFailure({error})))
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

  deleteEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(deletePayment),
      switchMap(
        action => this.service.deletePayment(action.id).pipe(
          map(payment => deletePaymentSuccess({payment})),
          catchError(error => of(deletePaymentFailure({error})))
        )
      )
    )
  );

  updateEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(updatePayment),
      switchMap(
        action => this.service.updatePayment(action.payment).pipe(
          map(payment => updatePaymentSuccess({payment})),
          catchError(error => of(updatePaymentFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions,
              private service: PaymentService,
              private updateService: PaymentUpdateService) {
  }
}
