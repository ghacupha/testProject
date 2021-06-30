import {createFeatureSelector, createSelector} from "@ngrx/store";
import {paymentStateSelectorKey, State} from "./payment.reducers";

export const paymentFeatureSelector = createFeatureSelector<State>(paymentStateSelectorKey);

export const paymentSelector = createSelector(
  paymentFeatureSelector,
  state => state.payments
);
