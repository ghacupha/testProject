import {Action, createReducer, on} from "@ngrx/store";
import {
  createPaymentSuccess, deletePaymentSuccess,
  paymentActionTypes,
  paymentsLoadSuccess, selectUpdatePayment, updatePayment, updatePaymentFailure, updatePaymentSuccess
} from "./payment.actions";
import {Payment} from "../payments/payment.model";
import {
  createDefaultLoadable,
  Loadable, onLoadableSuccess,
  withLoadable
} from "loadable-state";

export const paymentStateSelectorKey = 'payments';

export interface State extends Loadable {
  payments: Payment[];
  selectedPayment: Payment | null,
  isUpdating: boolean;
}

export const initialState: State = {
  ...createDefaultLoadable(),
  payments: [],
  selectedPayment: null,
  isUpdating: false
}

const _baseReducer = createReducer(
  initialState,

  on(paymentsLoadSuccess, (state, {payments}) => ({
    ...state,
    payments: [...payments]
  })),

  on(createPaymentSuccess, (state, {payment}) => ({
    ...state,
    payments: [...state.payments, payment]
  })),

  on(deletePaymentSuccess, (state, {payment}) => ({
    ...state,
    payments: [...removePayment(state.payments,payment) ]
  })),

  on(selectUpdatePayment, (state, {payment}) => ({
    ...state,
    selectedPayment: payment,
    isUpdating: true
  })),

  on(updatePayment, (state) => ({
    ...state,
    selectedPayment: null,
    isUpdating: false
  })),

  on(updatePaymentSuccess, function (state, {payment}): State {
    const prevPayments = removePayment(state.payments, payment);
    return {
      ...onLoadableSuccess(state),
      payments: [...prevPayments, payment],
      selectedPayment: null,
      isUpdating: false
    }
  }),

  on(updatePaymentFailure, state => ({
    ...state,
    isUpdating: false
  }))
);

function removePayment(payments: Payment[], payment: Payment): Payment[] {
  let updatedPayments: Payment[] = [];
  payments.forEach((item, index) => {
    if (item.id !== payment.id) {
      updatedPayments.push(item)
    }
  });
  return updatedPayments;
}

function _loadReducer(state: State, action: Action): State {
  return withLoadable(_baseReducer, {
    loadingActionType: paymentActionTypes.loadPayments,
    successActionType: paymentActionTypes.loadPaymentsSuccess,
    errorActionType: paymentActionTypes.loadPaymentsFailure,
  })(state, action)
}

// Add payment function
function _paymentReducer(state: State, action: Action): State {
  return withLoadable(_loadReducer, {
    loadingActionType: paymentActionTypes.createPayment,
    successActionType: paymentActionTypes.createPaymentSuccess,
    errorActionType: paymentActionTypes.createPaymentFailure,
  })(state, action)
}

function _paymentDeleteReducer(state: State, action: Action): State {
  return withLoadable(_paymentReducer, {
    loadingActionType: paymentActionTypes.deletePayment,
    successActionType: paymentActionTypes.deletePaymentSuccess,
    errorActionType: paymentActionTypes.deletePaymentFailure
  })(state, action)
}

function _paymentUpdateReducer(state: State, action: Action): State {
  return withLoadable(_paymentDeleteReducer, {
    loadingActionType: paymentActionTypes.updatePayment,
    successActionType: paymentActionTypes.updatePaymentSuccess,
    errorActionType: paymentActionTypes.updatePaymentFailure
  })(state, action)
}

export function reducer(state: State, action: Action): State {
  return _paymentUpdateReducer(state, action);
}
