import { GlobalVariable } from 'src/app/core/global';
import { ApiUrl } from 'src/app/core/apiUrl';
import { HttpService } from 'src/app/services/http/http.service';
import { ScriptService } from './../../../../../services/script/script.service';
import { ScriptModel } from './../../../../../shared/models/script.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { PaymentBaseComponent } from './../payment-base.component';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-tahseel',
    template: `<app-processing-indicator *ngIf="isLoading"></app-processing-indicator>`,
    styles: []
})
export class TahseelComponent extends PaymentBaseComponent implements OnInit {


  isLoading: boolean = false;

  constructor(
    private util: UtilityService,
    // private scriptService: ScriptService,
    private http: HttpService
  ) {
    super();
  }

  ngOnInit() {
  this.init();
  }
  // {"payment_token": TP_RefNo, tahseel_amount : TP_Amount, "gateway_unique_id":'tahseel' }
  // send this data in generate order api after the payment is successfull
  init() {
    this.isLoading = true;

    let params = {
            amount: this.order.amount.toString(),
            name: this.order.user.firstname,
            language:"en-US" || "ar-AE",
         
    }

    this.http.postData(ApiUrl.getTahseelPaymentUrl, params)
      .subscribe(response => {
        this.isLoading = true;
       if (!!response && response.data) {
          this.onSuccess.emit({
            'paymentGatewayId': 'tahseel',
            'token': 'xxxx',
            'waitForSuccess': true,
            'paymentUrl': response.data.url
            });


        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
      });

 

}
}
