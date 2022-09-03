import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../../../core/global';
import { StyleConstants } from '../../../../../core/theme/styleConstants.model';
import { UtilityService } from 'src/app/services/utility/utility.service';
import * as moment from 'moment';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['../../order-listing/order-listing.component.scss'],
})
export class OrderListItemComponent implements OnInit, OnChanges {

  @Input() style: StyleVariables;

  @Input() settings: AppSettings;

  @Input() order: any;

  @Output() cancel: EventEmitter<null> = new EventEmitter<null>();

  currency: string;
  cancelButton: StyleConstants;

  orderCreatedOn:string = "";
  orderDeliveredOn:string = "";

  constructor(
    private router: Router,
    private util: UtilityService
  ) {
    this.currency = GlobalVariable.CURRENCY;
    this.cancelButton = new StyleConstants();
  }

  ngOnInit() {
    this.cancelButton.color = this.style.primaryColor;
    this.cancelButton.borderColor = this.style.primaryColor;
    this.cancelButton.backgroundColor = '#ffffff';

    
    if (this.settings.is_multicurrency_enable) {
      this.getCurrency();
    }

    this.translateThroughMoment();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style) {
      this.cancelButton.color = this.style.primaryColor;
      this.cancelButton.borderColor = this.style.primaryColor;
    }
  }

  
  getCurrency() {
    this.util.getSelectedCurrency.subscribe((res: any) => {
        if (res) {
            let selected_currency = res;
            this.currency = selected_currency.currency_symbol ? selected_currency.currency_symbol : selected_currency.currency_name;
        }
    })
  }

  makeProductCount(data) {
    let count = 0;
    for (let value in data) {
      count = count + data[value].quantity;
    }
    return count;
  }

  orderPrice(order) {
    let price = parseFloat(order.net_amount);
    price = (parseFloat(order.net_amount) + parseFloat(order.tip_agent)) - parseFloat(order.discountAmount) - parseFloat(order.referral_amount);
    if (this.settings.supplier_service_fee == 1 && order.user_service_charge) {
      let charge_amount = (order.user_service_charge / 100) * price;
      price += charge_amount;
    }
    return price ? price.toFixed(2) : price;
  }

  orderDetail(data) {
    let obj = {
      orderId: [data.order_id],
    }
    this.router.navigate(['/orders/order-detail'], { queryParams: obj });
  }
  trackByProductFn(id, index) {
    return index;
  }


  checkAccAppType(type, status) {
    if ((type == 1 || this.settings?.app_type == 1) && [11, 10, 3].includes(status))
      return false;

    if ((type == 8 || this.settings?.app_type == 8) && [3].includes(status))
      return false;

    return true;
  }

  getDeliverySlot(delivery_date_time) {
    if (delivery_date_time.includes('16:00')) {
      return '04:00 PM - 08:00 PM'
    }
    else {
      return '12:00 PM - 04:00 PM'
    }
  }

  translateThroughMoment(){
    if(this.util.getLocalData('langData'))
    {
      if(this.order.created_on && this.order.delivered_on){
        this.orderCreatedOn = moment(this.order.created_on.replace('+00:00','')).format('MMM D YYYY, h:mm:ss A');
        this.orderDeliveredOn=moment(this.order.delivered_on.replace('+00:00','')).format('MMM D YYYY, h:mm:ss A');;
      }
     const lanCode = JSON.parse(this.util.getLocalData('langData')).language_code
     if(lanCode == 'ar')
     {
      moment.locale(lanCode)
     }
    }
  }

}
