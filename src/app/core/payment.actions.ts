import {ActionCreator, createAction, props} from "@ngrx/store";
import {Payment} from "../payments/payment.model";

export enum paymentActionTypes {
  createPayment= 'payments/create',
  createPaymentSuccess= 'payments/create success',
  createPaymentFailure= 'payments/create failure',

  loadPayments= 'payments/load',
  loadPaymentsSuccess= 'payments/load success',
  loadPaymentsFailure= 'payments/load failure',

  deletePayment = 'payments/delete',
  deletePaymentSuccess = 'payments/delete success',
  deletePaymentFailure = 'payments/delete failure',

  updatePayment = 'payments/update',
  updatePaymentSuccess = 'payments/update success',
  updatePaymentFailure = 'payments/update failure',
}

export const updatePayment = createAction(
  paymentActionTypes.updatePayment,
  props<{payment: Payment}>()
);

export const updatePaymentSuccess = createAction(
  paymentActionTypes.updatePaymentSuccess,
  props<{payments: Payment[]}>()
);

export const updatePaymentFailure = createAction(
  paymentActionTypes.updatePaymentFailure,
  props<{error: string}>()
);

export const deletePayment = createAction(
  paymentActionTypes.deletePayment,
  props<{id: number}>()
);

export const deletePaymentSuccess = createAction(
  paymentActionTypes.deletePaymentSuccess,
  props<{payments: Payment[]}>()
);

export const deletePaymentFailure = createAction(
  paymentActionTypes.deletePaymentFailure,
  props<{error: string}>()
);

export const createPayment = createAction(
  paymentActionTypes.createPayment,
  props<{payment: Payment}>()
);

export const createPaymentSuccess = createAction(
  paymentActionTypes.createPaymentSuccess,
  props<{payment: Payment}>()
);

export const createPaymentFailure = createAction(
  paymentActionTypes.createPaymentFailure,
  props<{error: string}>()
);

export const loadPayments = createAction(
  paymentActionTypes.loadPayments
);

// todo modify after effects
export const paymentsLoadSuccess = createAction(
  paymentActionTypes.loadPaymentsSuccess,
  props<{payments: Payment[]}>()
);

export const paymentsLoadFailure = createAction(
  paymentActionTypes.loadPaymentsFailure,
  props<{error: string}>()
);
