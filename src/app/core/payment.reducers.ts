import {Action, createReducer, on} from "@ngrx/store";
import {
  createPayment,
  createPaymentFailure, createPaymentSuccess, loadPayments,
  paymentsLoadFailure,
  paymentsLoadSuccess
} from "./payment.actions";
import {Payment} from "../payments/payment.model";
import {createDefaultLoadable, Loadable, onLoadableError, onLoadableLoad, onLoadableSuccess} from "loadable-state";

export const paymentStateSelectorKey = 'payments';

export interface State extends Loadable {
  payments: Payment[];
}

export const initialState: State = {
  ...createDefaultLoadable(),
  payments: []
}

const _reducer = createReducer(
  initialState,

  // todo modify after effects
  on(loadPayments, state=> ({
    ...onLoadableLoad(state)
  })),

  on(paymentsLoadSuccess, (state, {payments}) => ({
    ...onLoadableSuccess(state),
    // todo do not duplicate
    payments: [...payments]
  })),

  on(paymentsLoadFailure, (state, {error}) => ({
    ...onLoadableError(state, error)
  })),

  // todo modify after effects to do nothing
  on(createPayment, state => ({...onLoadableLoad(state)})),

  // todo modify after effects to add array
  on(createPaymentSuccess, (state, {payment}) => ({
    ...onLoadableSuccess(state),
    payments: [...onLoadableSuccess(state).payments, payment]
  })),

  on(createPaymentFailure, (state, {error}) => ({...onLoadableError(state, error)}))
);

export function reducer(state: State, action: Action): State {
  return _reducer(state, action);
}
