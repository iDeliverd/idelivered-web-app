import { AppSettings } from './../../../../shared/models/appSettings.model';
import { GlobalVariable } from './../../../../core/global';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { WINDOW } from './../../../../services/window/window.service';

import { ApiUrl } from './../../../../core/apiUrl';
import { HttpService } from './../../../../services/http/http.service';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss']
})
export class LandingFooterComponent implements OnInit {

  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Output() onHelp: EventEmitter<any> = new EventEmitter<any>();
  @Output() onContact: EventEmitter<any> = new EventEmitter<any>();


  registrationUrl: string = '';
  siteName: string = '';
  image_paths: string = '';

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


  additionalSections: any;

  constructor(@Inject(WINDOW) private window: Window,
  private http: HttpService) {
    this.contact = {
      phoneNumber: GlobalVariable.PHONE_NUMBER,
      email: GlobalVariable.EMAIL,
      country: GlobalVariable.COUNTRY,
      whatsAppNumber: GlobalVariable.WHATSAPP_NUMBER_CODE + GlobalVariable.WHATSAPP_NUMBER,
    }
  }

  ngOnInit() {
    this.registrationUrl = `${GlobalVariable.admin_domain}/#!/supplier-registration`;
    if (!!this.settings) {
      this.settings = this.settings;
      this.image_paths = this.settings.site_logo;
      this.appLink = {
        android: this.settings.android_app_url,
        ios: this.settings.ios_app_url
      }
    }

    if (this.settings.enable_adding_multiplefields_in_web == 1) {
      this.getAdditionalFooterLinkHeadings();
    }

  }
  mailTo() {
    this.window.location.href = `mailto:${this.contact.email}`;
  }
  onWhatsApp() {
    window.open(`https://api.whatsapp.com/send?phone=${this.contact.whatsAppNumber}`, '_blank');
  }

  getAdditionalFooterLinkHeadings() {
    this.http.getData(ApiUrl.getTermsConditions, {}, true, false).subscribe(response => {
      this.additionalSections = JSON.parse(response.data[0].additional_dynamic_fields) || [];
      console.log('additionalSections', this.additionalSections);
      
    })
  }
}
