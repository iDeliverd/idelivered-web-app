import { GlobalVariable } from './../../../../../core/global';
import { WINDOW } from './../../../../../services/window/window.service';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { UtilityService } from '../../../../../services/utility/utility.service';
import { ScriptService } from '../../../../../services/script/script.service';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { Subscription } from 'rxjs';
import { PaymentBaseComponent } from '../payment-base.component';
import { HttpService } from '../../../../../services/http/http.service';
import { ApiUrl } from 'src/app/core/apiUrl';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { ScriptModel } from 'src/app/shared/models/script.model';
import { Currency } from 'src/app/shared/models/apiKeys.model';

declare var $: any;
declare var FlutterwaveCheckout: any;

@Component({
    selector: 'app-flutter-wave-gateway',
    template: `<app-processing-indicator *ngIf="isLoading"></app-processing-indicator>`,

})
export class FlutterWaveGatewayComponent extends PaymentBaseComponent implements OnInit, OnDestroy {


    style: StyleVariables;
    showAddCard: boolean = false;
    disabled: boolean = false;

    styleSubscription: Subscription;

    public isLoading: boolean = false;

    public selected_currency: Currency = new Currency();
    public currency: string = '';


    constructor(
        private utilService: UtilityService,
        private scriptService: ScriptService,
        @Inject(WINDOW) private window: Window,
        @Inject(DOCUMENT) public document,
        private http: HttpService,
        private message: MessagingService,

    ) {
        super();
        this.style = new StyleVariables();
    }

    ngOnInit() {
        this.styleSubscription = this.utilService.getStyles.subscribe((style: StyleVariables) => {
            this.style = style;
            this.continue();
            this.isLoading = true;
        })
    }

    continue() {
        const payhereScript = new ScriptModel('flutter_wave', 'https://checkout.flutterwave.com/v3.js');
        this.scriptService.loadScript(payhereScript).then((script: ScriptModel) => {
            if (!script.isLoaded) {
                this.onError.emit('unable to load payhere script');
                return;
            }
            this.getCurrency();
            this.initializeGateway();
            this.isLoading = false;
        })
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



    initializeGateway() {

        const { key, value } = this.gateway.key_value_front.find((item) => item.for_front == 1 && item.key == 'flutterwave_publicKey');

        var self = this;
        FlutterwaveCheckout({
            public_key: value,
            tx_ref: (Math.random().toString(16) + "000000000").substr(2, 8),
            amount: Math.round(((Number)(this.order.amount) * (Number)(this.selected_currency.conversion_rate) + Number.EPSILON) * 100) / 100,
            currency: this.currency ? this.currency : GlobalVariable.CURRENCY_NAME,
            country: this.order.address.country_code,
            payment_options: "",
            redirect_url: "",
            meta: {
                consumer_id: this.order.user.id,
                consumer_mac: "92a3-912ba-1192a",
            },
            customer: {
                email: this.order.user.email,
                phone_number: this.order.user.mobile_no,
                name: this.order.user.firstname,
            },
            callback: function (data) {
                console.log(data);
                if (data.status == 'successful') {
                    self.onSuccess.emit({
                        'paymentGatewayId': 'flutterwave',
                        'token': data.transaction_id ? data.transaction_id.toString() : ''
                    });
                    self.document.activeElement.style.display = 'none'
                }
            },
            onclose: function () {
                self.document.activeElement.style.display = 'none'
            },
            customizations: {
                title: GlobalVariable.SITE_NAME,
                description: "",
                logo: "",
            },
        });

    }





    ngOnDestroy(): void {
        if (this.styleSubscription) this.styleSubscription.unsubscribe();
    }

}
