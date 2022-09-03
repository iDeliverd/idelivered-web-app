import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from 'src/app/core/global';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Currency } from 'src/app/shared/models/apiKeys.model';
import { ScriptService } from '../../../../../services/script/script.service';
import { ScriptModel } from '../../../../../shared/models/script.model';
import { PaymentBaseComponent } from '../payment-base.component';

declare const PaystackPop: any;

@Component({
  selector: 'app-paystack-gateway',
  templateUrl: './paystack-gateway.component.html',
  styleUrls: ['./paystack-gateway.component.scss']
})
export class PaystackGatewayComponent extends PaymentBaseComponent implements OnInit {

  public selected_currency: Currency = new Currency();
  public currency: string = '';

  constructor(
    private scriptService: ScriptService,
    private utilService: UtilityService,
  ) {
    super();
  }

  ngOnInit() {
    const paystackScript = new ScriptModel('paystack', 'https://js.paystack.co/v1/inline.js');
    this.scriptService.loadScript(paystackScript).then((script: ScriptModel) => {
      if (!script.isLoaded) {
        this.onError.emit('unable to load paystack script');
        return;
      }
      this.getCurrency();
      this.initializeGateway();
    })
  }

  initializeGateway() {
    var key;
    this.gateway.key_value_front.forEach(element => {
      if (element.key == "paystack_publish_key" && element.for_front == 1) {
        key = element['value'];
      }
    });


    var handler = PaystackPop.setup({
      key: key || '',
      email: this.order.user.email,
      amount: Math.round(((Number)(this.order.amount) * (Number)(this.selected_currency.conversion_rate))),
      currency: this.currency ? this.currency : GlobalVariable.CURRENCY_NAME,
      callback: (response: any) => {
        if (response.status === 'success') {
          this.onSuccess.emit({
            'paymentGatewayId': 'paystack',
            'token': response['reference']
          });
        } else {
          this.onError.emit('Payment Failed');
        }
      },
      onClose: () => {
        this.onClose.emit(false);
      }
    });
    handler.openIframe();
  }



  getCurrency() {
    this.utilService.getSelectedCurrency.subscribe((res: any) => {
      if (res) {
        this.selected_currency = Object.assign({}, res);
        if (this.selected_currency.currency_name) {
          this.currency = this.selected_currency.currency_name;
        }
      }
    })
  }
}
