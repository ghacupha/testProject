import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {PaymentListComponent} from "./payment-list.component";
import {PaymentUpdateComponent} from "./payment-update.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {RouterModule, Routes} from "@angular/router";
import {paymentStateSelectorKey, reducer} from "../core/payment.reducers";
import {EffectsModule} from "@ngrx/effects";
import {paymentEffects} from "../core/payment.effects";

const routes: Routes = [
  {
    path: 'payment-list',
    component: PaymentListComponent
  },
  {
    path: 'payment-update',
    component: PaymentUpdateComponent
  }
]

@NgModule({
  declarations: [PaymentListComponent, PaymentUpdateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forFeature(paymentStateSelectorKey, reducer),
    EffectsModule.forFeature([paymentEffects])
  ],
  exports: [PaymentListComponent, PaymentUpdateComponent, RouterModule]
})
export class PaymentsModule{}
