import {Action, createReducer, on} from "@ngrx/store";
import {
  createPayment,
  createPaymentFailure, createPaymentSuccess, loadPayments, paymentActionTypes,
  paymentsLoadFailure,
  paymentsLoadSuccess
} from "./payment.actions";
import {Payment} from "../payments/payment.model";
import {
  createDefaultLoadable,
  Loadable,
  withLoadable
} from "loadable-state";

export const paymentStateSelectorKey = 'payments';

export interface State extends Loadable {
  payments: Payment[];
}

export const initialState: State = {
  ...createDefaultLoadable(),
  payments: []
}

const _baseReducer = createReducer(
  initialState,
  on(paymentsLoadSuccess, (state, {payments}) => ({
    ...state,
    payments: [ ...payments]
  })),

  on(createPaymentSuccess, (state, {payment}) => ({
    ...state,
    payments: [...state.payments, payment]
  }))
);

function _loadReducer ( state: State, action: Action): State {
  return withLoadable(_baseReducer, {
    loadingActionType: paymentActionTypes.loadPayments,
    successActionType: paymentActionTypes.loadPaymentsSuccess,
    errorActionType: paymentActionTypes.loadPaymentsFailure,
  })(state, action)
}

// Add payment function
function _paymentReducer ( state: State, action: Action): State {
  return withLoadable(_loadReducer, {
    loadingActionType: paymentActionTypes.createPayment,
    successActionType: paymentActionTypes.createPaymentSuccess,
    errorActionType: paymentActionTypes.createPaymentFailure,
  })(state, action)
}

export function reducer(state: State, action: Action): State {
  return _paymentReducer(state, action);
}
