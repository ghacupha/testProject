import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Payment} from "./payment.model";
import {Router} from "@angular/router";
import {State} from "../core/payment.reducers";
import {Store} from "@ngrx/store";
import {createPayment} from "../core/payment.actions";

@Component({
  template: `
    <h4>Create Payment</h4>
    <div>
      <form (ngSubmit)="save()" [formGroup]="paymentsForm">
        <div>
          <label for="id">id:</label>
          <input formControlName="id" id="id">
        </div>
        <div>
          <label for="paymentNumber">payment Number:</label>
          <input formControlName="paymentNumber" id="paymentNumber">
        </div>
        <div>
          <label for="payee">Payee's Name:</label>
          <input formControlName="payee" id="payee">
        </div>
        <div>
          <label for="paymentAmount">Paid Amount:</label>
          <input formControlName="paymentAmount" id="paymentAmount">
        </div>
        <button type="submit">New Payment</button>
      </form>
    </div>
  `
})
export class PaymentUpdateComponent{

  paymentsForm = this.fb.group({
    id: [],
    paymentNumber: [],
    payee: ['', Validators.required],
    paymentAmount: []
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<State>) {
  }

  save(){
    const payment = this.createFromForm(this.paymentsForm);

    this.store.dispatch(createPayment({payment}));
    this.router.navigate(['payment-list'])
  }

  private createFromForm(paymentsForm: FormGroup): Payment {

      return {
        id: paymentsForm.get(['id'])?.value,
        paymentNumber: paymentsForm.get(['paymentNumber'])?.value,
        payee: paymentsForm.get(['payee'])?.value,
        paymentAmount: paymentsForm.get(['paymentAmount'])?.value,
      }
  }
}
