import { StyleVariables } from './../../../../../core/theme/styleVariables.model';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseAnalyticsService } from '../../../../../services/firebase-analytics/firebase-analytics.service';
import { GlobalVariable } from './../../../../../core/global';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from 'src/app/services/utility/utility.service';


@Component({
  selector: 'app-quantity-buttons',
  templateUrl: './quantity-buttons.component.html',
})
export class QuantityButtonsComponent implements OnInit {

  inputType: 'number' | 'text' = 'number';

  @Input() settings: AppSettings;

  @Input() style: StyleVariables;
  @Input() deafultView: boolean = false;

  timeInterval: number = 0;

  @Input() selectedQuantity: number = 0;

  @Input() selectedDistance: any = 0;
  @Input() disabled: boolean = false;

  @Input() priceType: 0 | 1 = 0;
  @Input() is_product_adds_on: 0 | 1 = 0;
  @Input() isProduct: 0 | 1 = 1;

  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

  @Output() onRemove: EventEmitter<any> = new EventEmitter<any>();

  @Output() quantityUpdate: EventEmitter<any> = new EventEmitter<any>(null);

  private positionInArabic: boolean = false;

  constructor(
    private fireBaseAnSvc: FirebaseAnalyticsService,
    private message: MessagingService,
    private translate: TranslateService,
    private util: UtilityService


  ) { }

  ngOnInit() {
    if (this.settings)
      this.timeInterval = this.settings['interval'];
    if (!this.isProduct) this.inputType = 'text';

    if (this.util.getLocalData('langData')) {
      const arname = JSON.parse(this.util.getLocalData('langData')).language_code
      if (arname == 'ar') {
        this.positionInArabic = true;
      }
    }
  }

  addQty(distance: any = 0) {
    if (this.settings.enable_success_popup_while_adding_to_cart == 1) {
      if (this.is_product_adds_on == 0) {
        const currentPagePath = (window.location.href).split('/');
        const path = currentPagePath[currentPagePath.length - 1];
        if (path !== 'cart') {
          this.message.alert('success', this.translate.instant('Added to cart successfully'));
        }
      }
    }

    const Distance = distance.toString().split('.')[0]
    if (this.settings.add_product_within_13km && Distance > 13000) {
      this.message.toast('warning', this.translate.instant('order is only deliver in 13 kilometre area'));
    } else {
      this.fireBaseAnSvc.firebaseAnalyticsEvents('add_to_cart', 'add_to_cart');
      this.onAdd.emit();
    }

  }

  quantityInput(quantity) {
    if (quantity < this.selectedQuantity) {
      this.onRemove.emit();
    }
    else {
      this.onAdd.emit();
    }
    let multiply = 1 / GlobalVariable.decimal_quantity_step;
    this.selectedQuantity = parseFloat(((Math.ceil(quantity * multiply) / multiply)).toFixed(2));
    this.quantityUpdate.emit(this.selectedQuantity);
  }

}
