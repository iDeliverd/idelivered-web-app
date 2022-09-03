import { MessagingService } from './../../../../../services/messaging/messaging.service';
import { ScriptModel } from './../../../../../shared/models/script.model';
import { ScriptService } from './../../../../../services/script/script.service';
import { UtilityService } from './../../../../../services/utility/utility.service';
import { PaymentBaseComponent } from './../payment-base.component';
import { Subscription } from 'rxjs';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../../../core/theme/styleVariables.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare const Square: any;

@Component({
  selector: 'app-square-gateway',
  templateUrl: './square-gateway.component.html',
  styleUrls: ['./square-gateway.component.scss']
})
export class SquareGatewayComponent extends PaymentBaseComponent implements OnInit, OnDestroy {

  settings: AppSettings;
  style: StyleVariables;

  styleSubscription: Subscription;
  settingSubscription: Subscription;

  paymentForm: any;
  is_loaded: boolean = false;
  showAddCard: boolean = false;

  cardObj: any = {};

  constructor(
    private util: UtilityService,
    private scriptService: ScriptService,
    private message: MessagingService
  ) {
    super();
  }

  ngOnInit() {

    this.styleSubscription = this.util.getStyles
      .subscribe(style => {
        this.style = style;
      });

    this.settingSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
        this.settings = settings;
      });

    if (this.settings.card_gateway['squareup'] == 1) {
      this.showAddCard = true;
    } else {
      const { key, value } = this.gateway.key_value_front.find((item) => item.for_front == 1);
      if (value) {
        this.init(value);
      }
    }
  }

  init(app_id: any) {
    const squarePayScript = new ScriptModel('square',
      app_id.includes('sandbox') ? 'https://sandbox.web.squarecdn.com/v1/square.js' : 'https://web.squarecdn.com/v1/square.js');

    this.scriptService.loadScript(squarePayScript).then((script: ScriptModel) => {

      if (!script.isLoaded) {
        console.log('unable to load square script');
        this.onError.emit('unable to load square script');
        return;
      }

      const self = this;

      const payments = Square.payments(app_id, 'ffff123');

      (async () => {
        self.cardObj = await payments.card();
        this.is_loaded = true;
        await self.delay(2000);
        await self.cardObj.attach('#sq-card-number');
        const cardButton = document.getElementById('card-button');
        cardButton.addEventListener('click', function (event) {
          event.preventDefault();
          try {
            (async () => {
              const result = await self.cardObj.tokenize();
              if (result.status === 'OK') {
                self.message.toast('success', 'Payment success!');
                self.onSuccess.emit({
                  'paymentGatewayId': 'squareup',
                  'token': result.token
                });
              }
              else {
                self.message.toast('error', 'Payment failed');
              }
            })();
          } catch (e) {
            self.message.toast('error', 'Payment failed');
          }
        });
      })();

    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  ngOnDestroy(): void {
    if (this.styleSubscription) this.styleSubscription.unsubscribe();
    if (this.settingSubscription) this.settingSubscription.unsubscribe();
  }

}
