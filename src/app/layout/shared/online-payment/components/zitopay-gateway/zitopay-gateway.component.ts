import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../../../../services/utility/utility.service';
import { ScriptService } from '../../../../../services/script/script.service';
import { PaymentBaseComponent } from '../payment-base.component';
import { HttpService } from '../../../../../services/http/http.service';
import { ApiUrl } from './../../../../../core/apiUrl';
import { GlobalVariable } from './../../../../../core/global';
import { WINDOW } from '../../../../../services/window/window.service';

@Component({
  selector: 'app-zitopay-gateway',
  templateUrl: './zitopay-gateway.component.html',
  styleUrls: ['./zitopay-gateway.component.scss']
})

export class ZitopayGatewayComponent extends PaymentBaseComponent implements OnInit, OnDestroy {

    settings: AppSettings;
    style: StyleVariables;

    styleSubscription: Subscription;
    settingSubscription: Subscription;
    public showAddCard: boolean = false;
    constructor(
        private util: UtilityService,
        private scriptService: ScriptService,
        private http: HttpService,
        @Inject(WINDOW) private window: Window,
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
            })
        this.createPayment();
    }


    createPayment() {
        var obj = {
          is_web: 1,
          email: this.order.user.email,
          amount: this.order.amount.toFixed(2),
          currency: GlobalVariable.CURRENCY,
          success_url: this.window.origin + `/success`,
          cancel_url: this.window.origin + `/failure`
        }

        this.http.postData(ApiUrl.getZitoPayPaymentUrl, obj).subscribe((res: any) => {
            if (res.status == 200) {
                this.onSuccess.emit({
                  'paymentGatewayId': 'zitopay',
                  'token': 'zitopay',
                  'waitForSuccess': true,
                  'paymentUrl': res.data.redirect_url
                });
            }
        })
    }



    ngOnDestroy(): void {
        if (this.styleSubscription) this.styleSubscription.unsubscribe();
        if (this.settingSubscription) this.settingSubscription.unsubscribe();
    }

}


