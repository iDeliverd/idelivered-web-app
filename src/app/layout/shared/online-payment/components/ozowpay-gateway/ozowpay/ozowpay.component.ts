import { GlobalVariable } from 'src/app/core/global';

import { Component, OnInit } from '@angular/core';
import { PaymentBaseComponent } from '../../payment-base.component';
import { ApiUrl } from 'src/app/core/apiUrl';
import { HttpService } from 'src/app/services/http/http.service';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
  selector: 'app-ozowpay',
  templateUrl: './ozowpay.component.html',
  styleUrls: ['./ozowpay.component.scss']
})
export class OzowpayComponent extends PaymentBaseComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private util: UtilityService,
    private http: HttpService) {
    super();
  }

  ngOnInit() {

    this.init();
  }

  init() {
    this.isLoading = true;

    let params = {
      countrycode: "ZA",
      currencycode: "ZAR",
      amount: this.order.amount.toString(),
      // currency: GlobalVariable.CURRENCY_NAME,
      notify_url: "https://api.royoorders1.com/ozow-callback",
      is_test: false,
      customer: this.order.user.firstname,
      success_url: "https://91179effd40e.ngrok.io//kpay-payment-success"
     
    }

    this.http.postData(ApiUrl.ozowPay, params)
      .subscribe(response => {
        if (!!response && response.data) {
          this.onSuccess.emit({
            'paymentGatewayId': 'ozowpay',
            'token': 'xxxx',
            'waitForSuccess': true,
            'paymentUrl': response.data.url,
            "transaction_id": response.data.PaymentRequestId,
          });
        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });
  }
}
