import { WINDOW } from './../../../../services/window/window.service';
import { AppSettings } from './../../../../shared/models/appSettings.model';
import { Subscription } from 'rxjs';
import { GlobalVariable } from './../../../../core/global';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { UtilityService } from './../../../../services/utility/utility.service';
import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EmailComponent } from '../../../shared/layout-shared/components/email/email.component';
import { UserService } from './../../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-service-footer',
  templateUrl: './home-service-footer.component.html',
  styleUrls: ['./home-service-footer.component.scss']
})
export class HomeServiceFooterComponent implements OnInit, OnDestroy {


  @Input() settings: AppSettings;
  @Input() style: StyleVariables;

  siteName: string = '';
  registrationUrl: string = '';
  userSubscription: Subscription;

  image_paths: string = '';
  client_code: string = GlobalVariable.UNIQUE_ID;

  contact: {
    phoneNumber: string;
    email: string;
    country: string;
    whatsAppNumber: string;
  };

  appLink: {
    android: string,
    ios: string;
  }

  is_mobile: boolean = GlobalVariable.IS_MOBILE;

  loggedIn: boolean = false;
  coming_soon_flow: number = 0;

  constructor(
    public util: UtilityService,
    public dialogService: DialogService,
    @Inject(WINDOW) private window: Window,
    private user: UserService,
    private router: Router
  ) {

    this.siteName = GlobalVariable.SITE_NAME;
    this.registrationUrl = `${GlobalVariable.admin_domain}/#!/supplier-registration`;

    this.contact = {
      phoneNumber: (GlobalVariable.PHONE_NUMBER).startsWith('+') ? GlobalVariable.PHONE_NUMBER : (`${(GlobalVariable.COUNTRY_CODE).startsWith('+') ? '' : '+'}${GlobalVariable.COUNTRY_CODE} ${GlobalVariable.PHONE_NUMBER}`),
      email: GlobalVariable.EMAIL,
      country: GlobalVariable.COUNTRY,
      whatsAppNumber: ''
    }
    this.contact['whatsAppNumber'] = GlobalVariable.WHATSAPP_NUMBER ? (`${(GlobalVariable.WHATSAPP_NUMBER_CODE).startsWith('+') ? '' : '+'}${GlobalVariable.WHATSAPP_NUMBER_CODE} ${GlobalVariable.WHATSAPP_NUMBER}`) : '';

    this.style = new StyleVariables();
  }

  ngOnInit() {
    if (this.coming_soon_flow) {
      this.userSubscription = this.user.currentUser
        .subscribe(userData => {
          if (!!userData && userData[this.settings.phone_registration_flag != 1 ? 'access_token' : 'accessToken']) {
            this.loggedIn = true;
          } else {
            this.loggedIn = false;
          }
        });
    }

  }

  onHelp() {
    const dialogRef = this.dialogService.open(EmailComponent, {
      width: '50%',
      style: { 'background-color': `${this.style.primaryColor} !important` },
      showHeader: false,
      transitionOptions: '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
    })

    dialogRef.onClose.subscribe(() => {
    })
  }

  mailTo() {
    this.window.location.href = `mailto:${this.contact.email}`;
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  onWhatsApp() {
    window.open(`https://api.whatsapp.com/send?phone=${this.contact.whatsAppNumber}`, '_blank');
  }
  viewSuppliers() {
    this.router.navigate(['/supplier', 'supplier-list'], {
      queryParams: {
        all: 1,
        search: '',
        searchBy: 1
      }
    })

  }
}
