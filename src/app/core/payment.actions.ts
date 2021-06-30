import {ActionCreator, createAction, props} from "@ngrx/store";
import {Payment} from "../payments/payment.model";

export const createPayment = createAction(
  'payments/create',
  props<{payment: Payment}>()
);

export const createPaymentSuccess = createAction(
  'payments/create success',
  props<{payment: Payment}>()
);

export const createPaymentFailure = createAction(
  'payments/create failure',
  props<{error: string}>()
);

export const loadPayments = createAction(
  'payments/load'
);

// todo modify after effects
export const paymentsLoadSuccess = createAction(
  'payments/load success',
  props<{payments: Payment[]}>()
);

export const paymentsLoadFailure = createAction(
  'payments/load failure',
  props<{error: string}>()
);
