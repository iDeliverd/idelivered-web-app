import { HttpService } from './../../../../../../../services/http/http.service';
import { LocalizationPipe } from './../../../../../../../shared/pipes/localization.pipe';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from './../../../../../../../services/cart/cart.service';
import { MessagingService } from './../../../../../../../services/messaging/messaging.service';
import { UtilityService } from './../../../../../../../services/utility/utility.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { BaseProduct } from '../base-product.component';
import { UserService } from 'src/app/services/user/user.service';
import { AppSettings } from './../../../../../../../shared/models/appSettings.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FoodComponent extends BaseProduct{

  settingsSubscription: Subscription;
  settings: AppSettings;
  public disableAddButton: any;

  constructor(
    public http: HttpService,
    public util: UtilityService,
    public router: Router,
    public message: MessagingService,
    public cartService: CartService,
    public dialogService: DialogService,
    public localization: LocalizationPipe,
    public translate: TranslateService,
    public userSvc: UserService
  ) {
    super(http, util, router, message, cartService, dialogService, localization, translate, userSvc);
    
    // if (localStorage.getItem('table_booking_details')) {
    //   this.localTblBooking = localStorage.getItem('table_booking_details');
    // }
  }



ngOnInit(): void {
  this.getSettings();
  if (this.settings.enable_order_scheduling_for_closed_vendors == 1 && !!this.state.hideQuantity) {
    this.disableAddButton = false;
  }
  else {
    this.disableAddButton = this.state.hideQuantity;
  }
}

getSettings() {
  this.settingsSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
          if (settings) {
              this.settings = settings;
          }
      });
}


}
