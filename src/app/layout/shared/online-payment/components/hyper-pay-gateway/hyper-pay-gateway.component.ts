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

declare var $: any;

@Component({
    selector: 'app-hyper-pay-gateway',
    templateUrl: './hyper-pay-gateway.component.html',
    styleUrls: ['./hyper-pay-gateway.component.scss']
})
export class HyperPayGatewayComponent extends PaymentBaseComponent implements OnInit, OnDestroy {


    style: StyleVariables;
    showAddCard: boolean = false;
    disabled: boolean = false;

    styleSubscription: Subscription;

    public is_mada_entity_id: number = 0;
    public is_continue: boolean = false;

    constructor(
        private utilService: UtilityService,
        private scriptService: ScriptService,
        @Inject(WINDOW) private window: Window,
        @Inject(DOCUMENT) private document,
        private http: HttpService,
        private message: MessagingService,

    ) {
        super();
        this.style = new StyleVariables();
    }

    ngOnInit() {
        this.styleSubscription = this.utilService.getStyles.subscribe((style: StyleVariables) => {
            this.style = style;
        })
    }

    continue() {
        this.getPaymentUrl();
    }

    getPaymentUrl() {
        var data = {
            amount: this.order.amount,
            currency: GlobalVariable.CURRENCY_NAME,
            is_mada_entity_id: this.is_mada_entity_id ? 1 : 0
        }
        this.http.postData(ApiUrl.getHyperPaymentUrl, data).subscribe((res: any) => {
            if (res.status == 200) {
                this.is_continue = true;
                this.onSuccess.emit({
                    'paymentGatewayId': 'hyperpay',
                    'token': 'hyperpay',
                    'waitForSuccess': true,
                    'paymentUrl': ''
                });
                this.initializeHyperPay(res);
            }
            else {
                this.is_continue = false;
                this.message.toast("error", "Payment could not processed");
            }
        })
    }

    initializeHyperPay(res) {
        const scriptLink = this.document.createElement('script');
        scriptLink.id = `hyper-pay-checkout`;
        scriptLink.setAttribute("type", "text/javascript");
        scriptLink.setAttribute("src", res.data.baseUrl);

        this.document.body.appendChild(scriptLink);

        const body = this.document.getElementsByTagName('body')[0];
        const scriptLink1 = this.document.createElement('script');
        scriptLink1.id = `hyper-pay-checkout1`;
        scriptLink1.setAttribute("type", "text/javascript");
        scriptLink1.appendChild(document.createTextNode(this.payFormSettings()));
        body.appendChild(scriptLink1);

        const form = this.document.createElement('form');
        form.id = `hyper-pay-checkout-form`;
        form.setAttribute("action", this.window.origin + "/success?gateway='hyperpay'");
        form.setAttribute("class", "paymentWidgets");
        var selected_brand = this.is_mada_entity_id ? `MADA` : `VISA MASTER AMEX`
        form.setAttribute("data-brands", selected_brand);
        // form.action = "https://wordpresshyperpay.docs.oppwa.com/tutorials/integration-guide/advanced-options";
        form.class = "paymentWidgets";

        const ele = document.getElementById('card-element');

        ele.appendChild(form);

    }


    payFormSettings() {
        return `var wpwlOptions={
            billingAddress: {
                country: ${this.order.address.country_code ? '"' + this.order.address.country_code + '"' : '""'},
                state: "",
                city: ${this.order.address.city ? '"' + this.order.address.city + '"' : '""'},
                postcode: ${this.order.address.pincode ? '"' + this.order.address.pincode + '"' : '""'},
                street1: ${this.order.address.address_line_1 ? '"' + this.order.address.address_line_1 + '"' : '""'},
                street2: ${this.order.address.customer_address ? '"' + this.order.address.customer_address + '"' : '""'}
            },
            mandatoryBillingFields: {
                country: true,
                state: true,
                city: true,
                postcode: true,
                street1: true,
                street2: false
            },
            style: "card",
            onReady: function (e) {
                $('.wpwl-form-card').find('.wpwl-button-pay').on('click', function (e) {
                    validateHolder(e);
                });
            },
            onBeforeSubmitCard: function (e) {
                return validateHolder(e);
            }
        }
       function validateHolder(e) {
            var holder = $('.wpwl-control-cardHolder').val();
            if (holder.trim().length < 2) {
                $('.wpwl-control-cardHolder').addClass('wpwl-has-error').after('<div class="wpwl-hint wpwl-hint-cardHolderError">Invalid card holder</div>');
                return false;
            }
            return true;
        }
        `
    }




    ngOnDestroy(): void {
        if (this.styleSubscription) this.styleSubscription.unsubscribe();
    }

}
