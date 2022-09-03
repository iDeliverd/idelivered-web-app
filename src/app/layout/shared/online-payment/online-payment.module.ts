import { PaymentBaseComponent } from './components/payment-base.component';
/************************ CORE MODULES ***************************/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/************************** MODULES *************************/
import { LayoutSharedModule } from './../layout-shared/layout-shared.module';

/************************* DRIVECTIVES **************************/
// import { CreditCardDirectivesModule } from 'angular-cc-library';
import { BlockCopyPasteDirective } from './../layout-shared/directives/block-copy-paste.directive';

/********************** COMPONENTS *******************************/
import { OnlinePaymentComponent } from './online-payment.component';
import { StripeGatewayComponent } from './components/stripe-gateway/stripe-gateway.component';
import { ConektaGatewayComponent } from './components/conekta-gateway/conekta-gateway.component';
import { RazorpayGatewayComponent } from './components/razorpay-gateway/razorpay-gateway.component';
import { PaystackGatewayComponent } from './components/paystack-gateway/paystack-gateway.component';
import { PaypalGatewayComponent } from './components/paypal-gateway/paypal-gateway.component';
import { VenmoGatewayComponent } from './components/venmo-gateway/venmo-gateway.component';
import { ZelleGatewayComponent } from './components/zelle-gateway/zelle-gateway.component';
import { CybersourceGatewayComponent } from './components/cybersource-gateway/cybersource-gateway.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CheckoutGatewayComponent } from './components/checkout-gateway/checkout-gateway.component';
import { MyFatoorahGatewayComponent } from './components/my-fatoorah-gateway/my-fatoorah-gateway.component';
import { SadadGatewayComponent } from './components/sadad-gateway/sadad-gateway.component';
import { MumybeneGatewayComponent } from './components/mumybene-gateway/mumybene-gateway.component';
import { SquareGatewayComponent } from './components/square-gateway/square-gateway.component';
import { TapGatewayComponent } from './components/tap-gateway/tap-gateway.component';
import { PaytabsGatewayComponent } from './components/paytabs-gateway/paytabs-gateway.component';
import { ElavonConvergeGatewayComponent } from './components/elavon-converge-gateway/elavon-converge-gateway.component';
import { WindcaveGatewayComponent } from './components/windcave-gateway/windcave-gateway.component';
import { MpaisaGatewayComponent } from './components/mpaisa-gateway/mpaisa-gateway.component';
import { PayhereGatewayComponent } from './components/payhere-gateway/payhere-gateway.component';
import { CashappGatewayComponent } from './components/cashapp-gateway/cashapp-gateway.component';
import { PeachGatewayComponent } from './components/peach-gateway/peach-gateway.component';
import { BraintreeGatewayComponent } from './components/braintree-gateway/braintree-gateway.component';
import { AamarPayGatewayComponent } from './components/aamarpay-gateway/aamarpay-gateway.component';
import { DatatransGatewayComponent } from './components/datatrans-gateway/datatrans-gateway.component';
import { AuthorizeNetGatewayComponent } from './components/authorize-net-gateway/authorize-net-gateway.component';
import { CredMovilGatewayComponent } from './components/cred-movil-gateway/cred-movil-gateway.component';
import { PagoFacilGatewayComponent } from './components/pago-facil-gateway/pago-facil-gateway.component';
import { TelrGatewayComponent } from './components/telr-gateway/telr-gateway.component';
import { HyperPayGatewayComponent } from './components/hyper-pay-gateway/hyper-pay-gateway.component';
import { RedPayGatewayComponent } from './components/red-pay-gateway/red-pay-gateway.component';
import { ThawaniGatewayComponent } from './components/thawani-gateway/thawani-gateway.component';
import { SadadOneGatewayComponent } from './components/sadad-1-gateway/sadad-one-gateway.component';
import { TransbankGatewayComponent } from './components/transbank-gateway/transbank-gateway.component';
import { PaymayaGatewayComponent } from './components/paymaya-gateway/paymaya-gateway.component';
import { PayuLatamGatewayComponent } from './components/payu-latam-gateway/payu-latam-gateway.component';
import { OxxoGatewayComponent } from './components/oxxo-gateway/oxxo-gateway.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipolPayGatewayComponent } from './components/pipol-pay-gateway/pipol-pay-gateway.component';
import { Safe2payGatewayComponent } from './components/safe2pay-gateway/safe2pay-gateway.component';
import { UrwayGatewayComponent } from './components/urway-gateway/urway-gateway.component';
import { SaferPayComponent } from './components/safer-pay/safer-pay.component';
import { KPayGatewayComponent } from './components/k-pay-gateway/k-pay-gateway.component';
import { LoaderSharedModule } from '../layout-shared/components/processing-indicator/loader-shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TakepaymentsGatewayComponent } from './components/takepayments-gateway/takepayments-gateway.component';
import { OzowpayComponent } from './components/ozowpay-gateway/ozowpay/ozowpay.component';
import { ZitopayGatewayComponent } from './components/zitopay-gateway/zitopay-gateway.component';
import { FlutterWaveGatewayComponent } from './components/flutter-wave-gateway/flutter-wave-gateway.component';
import { TahseelComponent } from './components/tahseel/tahseel.component';


const components = [
  PaymentBaseComponent,
  OnlinePaymentComponent,
  StripeGatewayComponent,
  ConektaGatewayComponent,
  RazorpayGatewayComponent,
  PaystackGatewayComponent,
  PaypalGatewayComponent,
  VenmoGatewayComponent,
  ZelleGatewayComponent,
  AddCardComponent,
  CybersourceGatewayComponent,
  CheckoutGatewayComponent,
  BlockCopyPasteDirective,
  PaytabsGatewayComponent,
  MyFatoorahGatewayComponent,
  SadadGatewayComponent,
  MumybeneGatewayComponent,
  TapGatewayComponent,
  SquareGatewayComponent,
  ElavonConvergeGatewayComponent,
  WindcaveGatewayComponent,
  MpaisaGatewayComponent,
  CashappGatewayComponent,
  PayhereGatewayComponent,
  PeachGatewayComponent,
  BraintreeGatewayComponent,
  AamarPayGatewayComponent,
  AuthorizeNetGatewayComponent,
  PagoFacilGatewayComponent,
  TelrGatewayComponent,
  HyperPayGatewayComponent,
  RedPayGatewayComponent,
  ThawaniGatewayComponent,
  SadadOneGatewayComponent,
  TransbankGatewayComponent,
  PaymayaGatewayComponent,
  PayuLatamGatewayComponent,
  OxxoGatewayComponent,
  SaferPayComponent,
  FlutterWaveGatewayComponent,
  DatatransGatewayComponent,
  CredMovilGatewayComponent,
  PipolPayGatewayComponent,
  Safe2payGatewayComponent,
  UrwayGatewayComponent,
  KPayGatewayComponent,
  TakepaymentsGatewayComponent,
  OzowpayComponent,
  ZitopayGatewayComponent,
  TahseelComponent,

]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    // LayoutSharedModule
    SharedModule,
    LoaderSharedModule,
    NgxIntlTelInputModule

  ],
  entryComponents: [
    OnlinePaymentComponent
  ],
  exports: [
    ...components
  ]
})
export class OnlinePaymentModule { }
