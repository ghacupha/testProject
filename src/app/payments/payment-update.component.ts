import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Payment} from "./payment.model";
import {Router} from "@angular/router";
import {State} from "../core/payment.reducers";
import {select, Store} from "@ngrx/store";
import {createPayment, updatePayment} from "../core/payment.actions";
import {selectSelectedPayment} from "../core/payment.selectors";
import {Observable} from "rxjs";

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
export class PaymentUpdateComponent implements OnInit {

  isUpdating: boolean = false;

  updatePayment: Observable<Payment | null> | undefined;

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

  ngOnInit(): void {
    this.updatePayment = this.store.pipe(select(selectSelectedPayment));

    if (this.updatePayment !== undefined) {
      this.isUpdating = true;
      this.updatePayment.subscribe(payment => {
        if (payment !== null)
          this.updateForm(payment)
      });
    }
  }

  save() {
    const payment = this.createFromForm(this.paymentsForm);

    if (this.isUpdating)
      this.store.dispatch(updatePayment({payment}));
    else
      this.store.dispatch(createPayment({payment}));

    this.router.navigate(['payment-list'])
  }

  private updateForm(payment: Payment): void {
    this.paymentsForm.patchValue({
      id: payment.id,
      paymentNumber: payment.paymentNumber,
      payee: payment.payee,
      paymentAmount: payment.paymentAmount
    });
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
