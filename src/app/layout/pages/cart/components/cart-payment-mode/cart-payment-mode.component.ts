import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalVariable } from './../../../../../core/global';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { Currency } from 'src/app/shared/models/apiKeys.model';

@Component({
  selector: 'app-cart-payment-mode',
  templateUrl: './cart-payment-mode.component.html',
  styleUrls: ['./cart-payment-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPaymentModeComponent implements OnInit, OnChanges, OnDestroy {

  paymentType: '0' | '1' | '4' = '0';
  isSkip = false;
  currency: string = ''
  routeSubscription: Subscription;
  @Input() selfPickup: any;
  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input() walletAmount: number = 0;

  @Input() hidePaymentModeOption: boolean = false;
  @Input() order_type: number;

  @Output() paymentMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeInRequest: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hide_cod_on_dinin: boolean = false;
  public selected_currency: Currency = new Currency();

  constructor(
    private route: ActivatedRoute,
    private util: UtilityService,
    private ref: ChangeDetectorRef,
  ) {
    this.currency = GlobalVariable.CURRENCY;
    this.ref.detach();
    setInterval(() => { this.ref.detectChanges(); }, 2000);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams
      .subscribe(params => {
        if (params['p_mode']) {
          this.paymentType = params['p_mode'];
          this.paymentMode.emit(params['p_mode']);
        } else {
          if (this.settings.payment_method == '1') {
            this.paymentType = '1';
            this.paymentMode.emit(this.paymentType);
          } else {
            this.paymentMode.emit(this.paymentType);
          }
        }
      });
    if (this.settings.is_multicurrency_enable) {
      this.getCurrency();
    }
  }

  skipPayment(paymentType) {
    if (paymentType) {
      this.isSkip = true;
    } else {
      this.isSkip = false;
    }
    this.paymentMode.emit(paymentType ? '5' : '0');
  }

  ngOnChanges(change: SimpleChanges) {
    this.getOrderType();
  }

  getOrderType() {
    this.util.getOrderTypeData.subscribe((res: any) => {
      if (res) {
        res = (Number)(res);
        if (this.settings.hide_cod_on_dinin_order_type) {
          if (res == 2 && this.order_type == 2) {
            this.hide_cod_on_dinin = true;
            this.paymentType = "1";
            this.paymentMode.emit(this.paymentType);
          }
          else {
            this.hide_cod_on_dinin = false;
          }
        }
      }
    })
  }

  getCurrency() {
    this.util.getSelectedCurrency.subscribe((res: any) => {
      if (res) {
        this.selected_currency = Object.assign({}, res);
        if (this.selected_currency.currency_name) {
          this.currency = this.selected_currency.currency_symbol ? this.selected_currency.currency_symbol : this.selected_currency.currency_name;
        }
      }
    })
  }


  ngOnDestroy(): void {
    if (!!this.routeSubscription) this.routeSubscription.unsubscribe();
  }

}
