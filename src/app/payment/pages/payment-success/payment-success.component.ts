import { MessagingService } from './../../../services/messaging/messaging.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUrl } from './../../../core/apiUrl';
import { HttpService } from './../../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/shared/models/appSettings.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  orderId: any = '';
  isLoading: boolean = false;
  settings: AppSettings
  constructor(
    private utilityService: UtilityService,
    private message: MessagingService,
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkError();
  }

  ngOnInit() {
    let payload: any = this.utilityService.getLocalData('gop', true);
    this.utilityService.getSettings.subscribe(settings => this.settings = settings);
    if (payload) {
      switch (payload['gateway_unique_id']) {
        case 'myfatoorah':
          payload['payment_token'] = this.route.snapshot.queryParams['paymentId'];
          break;

        case 'tap':
          payload['payment_token'] = this.route.snapshot.queryParams['tap_id'];
          break;

        case 'converge':
          payload['payment_token'] = this.route.snapshot.queryParams['ssl_txn_id'];
          break;

        case 'windcave':
          payload['payment_token'] = this.route.snapshot.queryParams['result'];
          break;

        case 'mpaisa':
          payload['payment_token'] = this.route.snapshot.queryParams['tID'];
          break;
        case 'telr':
          payload['payment_token'] = this.route.snapshot.queryParams['tran_id'];
          break;
        case 'tahseel':
          payload['payment_token'] = this.route.snapshot.queryParams['TP_RefNo'];
          break;
        case 'hyperpay':
          payload['payment_token'] = this.route.snapshot.queryParams['id'];
          break;
        case 'thawani':
          payload['payment_token'] = this.route.snapshot.queryParams['id'];
          break;
        case 'sadadqa':
          payload['payment_token'] = this.route.snapshot.queryParams['tran_id'];
          break;
        case 'transbank':
          var res = JSON.stringify(this.route.snapshot.queryParams['response'])
          payload['payment_token'] = res['buyOrder'];
          break;
        case 'paymaya':
          payload['payment_token'] = this.route.snapshot.queryParams['ref_id'];
          break;
        case 'saferpay':
          payload['payment_token'] = this.route.snapshot.queryParams['requestId'];
          break;
        case 'urway':
          payload['payment_token'] = this.route.snapshot.queryParams['TranId'];
          break;
        case 'kpay':
          payload['payment_token'] = this.route.snapshot.queryParams['tid'];
          break;
        case 'zitopay':
          payload['zitopay_reference_id'] = this.route.snapshot.queryParams['ref_id'];
          break;
      }

      let transactionType = this.utilityService.getLocalData('transactionType')

      if (transactionType == 'wallet') {
        this.isLoading = true;
        this.httpService.postData(ApiUrl.addWalletMoney, payload).subscribe((response) => {
          this.router.navigate(['/', 'account', 'my-wallet']).then(() => {
            if (response && response.status == 200) {
              this.message.toast('success', 'money added');
            } else {
              this.message.toast('success', 'payment failed');
            }
            this.utilityService.setLocalData('transactionType', null);
            this.utilityService.setLocalData('gop', null);
          });
        }, (err) => {
          this.router.navigate(['/', 'account', 'my-wallet']).then(() => {
            this.message.toast('success', 'payment failed');
            this.utilityService.setLocalData('transactionType', null);
            this.utilityService.setLocalData('gop', null);
          });
        })
      } else if (transactionType == 'subscription') {
        this.httpService.postData(ApiUrl.buySubscription, payload).subscribe((response) => {
          if (response) {
            this.router.navigate(['/', 'account', 'subscriptions']).then(() => {
              if (response && response.status == 200) {
                this.message.toast('success', 'subscription added');
              } else {
                this.message.toast('success', 'payment failed');
              }
              this.utilityService.setLocalData('transactionType', null);
              this.utilityService.setLocalData('gop', null);
            });
          }
          this.isLoading = false;
        }, (err) => this.router.navigate(['/', 'account', 'subscriptions']).then(() => {
          this.message.toast('success', 'payment failed');
          this.utilityService.setLocalData('transactionType', null);
          this.utilityService.setLocalData('gop', null);
        }))
      }
      else {
        let url = ApiUrl.generateOrder;
        if (this.settings.enable_pay_agent_extra_charge == 1) {
          url = ApiUrl.payAgentExtraCharge
          let newObj = {};
          let temp = payload;
          newObj['payment_token'] = payload.payment_token;
          newObj['order_id'] = payload.order_id;
          payload = newObj;
          this.orderId = newObj['order_id'];
        }
        this.httpService.postData(url, payload, false)
          .subscribe(response => {
            if (!!response && response.data) {
              if (Object.keys(response.data).length != 0) {
                this.orderId = response.data;
              }
              localStorage.removeItem('gop');
              this.utilityService.setCart([]);
              setTimeout(() => {
                this.onViewOrder();
              }, 2000);
            }
          });
      }
    }
  }

  onViewOrder(): void {
    this.router.navigate(['/orders/order-detail'], { queryParams: { orderId: this.orderId } });
  }

  checkError() {
    if (this.route.snapshot.queryParams['rCode'] == 111) {
      return this.router.navigate(['/', 'failure']);
    }
  }

}
