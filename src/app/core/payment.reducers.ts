import {Action, createReducer, on} from "@ngrx/store";
import {
  createPayment,
  createPaymentFailure, createPaymentSuccess, loadPayments,
  paymentsLoadFailure,
  paymentsLoadSuccess
} from "./payment.actions";
import {Payment} from "../payments/payment.model";

export const paymentStateSelectorKey = 'payments';

export interface State {
  payments: Payment[];
}


export const initialState: State = {
  payments: []
}

const _reducer = createReducer(
  initialState,

  // todo modify after effects
  on(loadPayments, state=> state),

  on(paymentsLoadSuccess, (state, {payments}) => ({
    ...state,
    // todo do not duplicate
    payments: [...payments]
  })),

  on(paymentsLoadFailure, state => state),

  // todo modify after effects to do nothing
  on(createPayment, state => state),

  // todo modify after effects to add array
  on(createPaymentSuccess, (state, {payment}) => ({
    ...state,
    payments: [...state.payments, payment]
  })),

  on(createPaymentFailure, state => state)
);

export function reducer(state: State, action: Action): State {
  return _reducer(state, action);
}
