import { WINDOW } from './../../../services/window/window.service';
import { AppSettings } from './../../../shared/models/appSettings.model';
import { Subscription } from 'rxjs';
import { GlobalVariable } from './../../../core/global';
import { StyleVariables } from './../../../core/theme/styleVariables.model';
import { UtilityService } from './../../../services/utility/utility.service';
import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EmailComponent } from '../../shared/layout-shared/components/email/email.component';
import { UserService } from './../../../services/user/user.service';
import { ApiUrl } from './../../../core/apiUrl';
import { HttpService } from './../../../services/http/http.service';
import { ContactUsComponent } from './../../shared/layout-shared/components/contact-us/contact-us.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() is_mobile: boolean = GlobalVariable.IS_MOBILE;

  siteName: string = '';
  registrationUrl: string = '';
  styleSubscription: Subscription;
  settingsSubscription: Subscription;
  userSubscription: Subscription;

  style: StyleVariables;
  image_paths: string = '';
  settings: AppSettings;
  client_code: string = GlobalVariable.UNIQUE_ID;

  public is_cookies_accepted: boolean = false;


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

  lang_data: any = {};

  // is_mobile: boolean = GlobalVariable.IS_MOBILE;

  loggedIn: boolean = false;
  coming_soon_flow: number = 0;
  additionalFieldData: any;

  cookies_policy_contant: string = '';

  showWhatsappMsg: boolean = false;
  copyRightText: string = ''
  whataAppFloatingContant: string = '';

  constructor(
    public util: UtilityService,
    public dialogService: DialogService,
    @Inject(WINDOW) private window: Window,
    private user: UserService,
    private http: HttpService
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
    this.styleSubscription = this.util.getStyles
      .subscribe((style: StyleVariables) => {
        this.style = style;
      });

    this.settingsSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
        if (!!settings) {
          this.settings = settings;
          this.image_paths = settings.site_logo;
          this.appLink = {
            android: settings.android_app_url,
            ios: settings.ios_app_url
          }

          if (this.settings.hide_country_code_contact == 1) {
            this.contact.phoneNumber = (`${GlobalVariable.PHONE_NUMBER}`);
          }

          setTimeout(() => {
            if (localStorage.getItem('langData') && JSON.parse(localStorage.getItem('langData'))) {
              this.lang_data = JSON.parse(localStorage.getItem('langData'));
            }

            this.setCopyRight();
          }, 2000);
          
          this.coming_soon_flow = this.settings.enable_coming_soon_flow;
          if (this.settings.show_cookie_policy == 1) {
            this.setCookiesContant();
            this.checkCookiesStatus();
          }
        }
      });


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

    if (this.settings.enable_adding_multiplefields_in_web == 1) {
      this.getAdditionalFooterLinkHeadings();
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

  onContact() {
    const dialogRef = this.dialogService.open(ContactUsComponent, {
      width: '30%',
      style: { 'background-color': `${this.style.primaryColor}` },
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
    this.styleSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  onWhatsApp() {
    window.open(`https://api.whatsapp.com/send?phone=${this.contact.whatsAppNumber}`, '_blank');
  }

  showWhatsappContant() {
    this.showWhatsappMsg = !this.showWhatsappMsg;
  }

  getAdditionalFooterLinkHeadings() {
    this.http.getData(ApiUrl.getTermsConditions, {}, true, false).subscribe(response => {
      this.additionalFieldData = JSON.parse(response.data[0].additional_dynamic_fields);
    })
  }

  setCopyRight() {
    if (localStorage.getItem('langData') && JSON.parse(localStorage.getItem('langData'))) {
      var langData = JSON.parse(localStorage.getItem('langData'));
      switch (langData.language_code) {
        case 'en':
          this.copyRightText = `Copyright © 2021 ${this.siteName}. All Rights Reserved.`;
          this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
          break;
        case 'es':
          this.copyRightText = `${this.siteName} es una Marca Registrada ®️ Derechos Reservados.`;
          this.whataAppFloatingContant = `¡Hola, gracias por visitar ${this.siteName}! ¿Conoces las ofertas y descuentos de hoy?`;
          break;
        case 'ar':
          this.copyRightText = `حقوق النشر © 2021 ${this.siteName}. كل الحقوق محفوظة.`;
          this.whataAppFloatingContant = `مرحبًا ، شكرًا لزيارتك ${this.siteName}! هل تعرف عروضنا وخصوماتنا الحالية؟`;
          break;
          case 'fr':
          this.copyRightText = `droits d'auteur © 2021 ${this.siteName}. Tous les droits sont réservés.`;
          this.whataAppFloatingContant = `Salut, merci pour la visite ${this.siteName}! Connaissez-vous notre offre actuelle et nos réductions?`;
          break;
        default:
          this.copyRightText = `Copyright © 2021 ${this.siteName}. All Rights Reserved.`;
          this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
          break;
      }
    }
    else {
      this.copyRightText = `Copyright © 2021 ${this.siteName}. All Rights Reserved.`;
      this.whataAppFloatingContant = `Hi, thanks for visting ${this.siteName}! Do you know our current offer and discounts?`;
    }
  }

  setCookiesContant() {
    if (localStorage.getItem('langData') && JSON.parse(localStorage.getItem('langData'))) {
      var langData = JSON.parse(localStorage.getItem('langData'));
      switch (langData.language_code) {
        case 'en':
          this.cookies_policy_contant = this.settings.cookies_policy_contant;
          break;
        case 'es':
          this.cookies_policy_contant = this.settings.cookies_policy_contant_ol;
          break;
        default:
          this.cookies_policy_contant = this.settings.cookies_policy_contant;
          break;
      }
    }
    else {
      this.cookies_policy_contant = this.settings.cookies_policy_contant;
    }
  }


  acceptRejectCookies(action: string) {
    switch (action) {
      case 'accept':
        localStorage.setItem('cookies_status', action);
        break;
      case 'reject':
        sessionStorage.setItem('cookies_status', action);
        break;
    }
    this.checkCookiesStatus();
  }
  checkCookiesStatus() {
    this.is_cookies_accepted = ((localStorage.getItem('cookies_status') == 'accept' ||
      sessionStorage.getItem('cookies_status') == 'reject')) ? true : false;
  }

}
