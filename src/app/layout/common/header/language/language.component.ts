import { AppSettings } from './../../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { UtilityService } from './../../../../services/utility/utility.service';
import { Component, Input, Inject, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { GlobalVariable } from 'src/app/core/global';

import { UserService } from './../../../../services/user/user.service';
import { HttpService } from './../../../../services/http/http.service';
import { ApiUrl } from './../../../../core/apiUrl';
import { Subscription } from 'rxjs';

export class Language {
  id: number;
  language_code: string;
  language_name: string;
  rtl: number;
  icon_code: string;
}

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnChanges {

  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  selectedLang: Language;
  langData: Array<Language> = [];

  userSubscription: Subscription;
  userDetails: any;
  settingsSubscription: Subscription;
  settingsData: AppSettings
  flag:boolean=false;
  reversed_langData: Array<Language> = [];

  constructor(
    private user: UserService,
    private http: HttpService,
    private util: UtilityService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document
  ) {
    this.settingsSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
        this.settingsData =settings;
      });
    this.langData.push({
      id: 14,
      language_code: "en",
      language_name: "English",
      rtl: 0,
      icon_code: this.settingsData.change_flag_of_country_in_language_name ? 'gb' : 'us',
    });

    this.userSubscription = this.user.currentUser.subscribe(user => {
      this.userDetails = user;
    });

    if(this.util.getLocalData('langData')){
      const arName = JSON.parse(this.util.getLocalData('langData')).language_code
         if (arName == 'ar'){
          this.flag=true;
         }
        }
  }

  setLanguage(langData: any) {
    this.util.handler.languageId = langData['id'] || this.util.handler.languageId;
    this.util.handler.rtl = langData['rtl'];
    this.selectedLang = langData;
    this.translate.setDefaultLang(langData['language_code']);
    this.document.getElementsByTagName('html')[0].setAttribute('lang', langData['language_code']);
    this.util.setLocalData('langData', langData, true);
    if(this.settings.change_currency_accordingTo_lang == 1){
      if(!!this.settings.secondary_language){
        let selectedCurrency = JSON.parse(this.util.getLocalData('selectedCurrency'));
        if(this.selectedLang.language_code != this.settings.secondary_language){
          GlobalVariable.CURRENCY = GlobalVariable.CURRENCY_NAME;
        } else {
          const { currency_symbol, currency_name } = selectedCurrency;
          GlobalVariable.CURRENCY = currency_symbol;
        } 
        
      }
    }
    
    
  }

  ngOnChanges() {
    if (!!this.settings.secondary_language) {
      let lang_obg = new Language();
      switch (this.settings.secondary_language) {
        case 'es':
          lang_obg.id = 15;
          lang_obg.language_code = 'es';
          lang_obg.language_name = 'Spanish (Español)';
          lang_obg.rtl = 0;
          lang_obg.icon_code = 'es';
          break;

        case 'ar':
          lang_obg.id = 15;
          lang_obg.language_code = 'ar';
          lang_obg.language_name = GlobalVariable.UNIQUE_ID == 'lubanah_0586' || GlobalVariable.UNIQUE_ID == 'saned_0092' ? 'عربي':'عربي';
          lang_obg.rtl = 1;
          lang_obg.icon_code = this.settings.change_argentina_to_saudi_arabia_flag_icon == 1 ? 'sa' : this.settings.change_flag_of_country_in_language_name ? 'ae' : 'ar';
          break;

        case 'fr':
          lang_obg.id = 15;
          lang_obg.language_code = 'fr';
          lang_obg.language_name = 'French (Français)';
          lang_obg.rtl = 0;
          lang_obg.icon_code = 'fr';
          break;

        case 'ml':
          lang_obg.id = 15;
          lang_obg.language_code = 'ml';
          lang_obg.language_name = 'Malayalam (മലയാളം)';
          lang_obg.rtl = 0;
          lang_obg.icon_code = 'ml';
          break;

        case 'alb':
          lang_obg.id = 15;
          lang_obg.language_code = 'alb';
          lang_obg.language_name = 'Albanian (Shqiptare)';
          lang_obg.rtl = 0;
          lang_obg.icon_code = 'alb';
          break;

        case 'th':
          lang_obg.id = 15;
          lang_obg.language_code = 'th';
          lang_obg.language_name = 'Thai';
          lang_obg.rtl = 0;
          lang_obg.icon_code = 'th';
          break;
      }
      
      this.langData.push(lang_obg);
      console.log('jkj',this.langData)
      this.reversed_langData= this.langData.reverse();
      let langObj = this.util.getLocalData('langData', true);
      if (this.settings.default_language == 1 && !langObj) {
        this.setLanguage(this.langData[1]);
      } else {
        this.setLanguage(langObj || this.langData[0]);
      }
    }
  }
  trackByFn(id, index) {
    return index;
  }
  trackBylangFn(id, index) {
    return index;
  }
  languageSelect(langData: any) {
    if (!!this.userDetails && this.userDetails['access_token']) {
        this.setUserLanguage(langData);
    } else {
      this.util.setLocalData('langData', langData, true);
      this.util.window.location.reload();
    }
  }

  setUserLanguage(langData) {
    let obj = {
      languageId: langData['id'] || this.util.handler.languageId,
      accessToken: this.user.getUserToken,
    }
    this.http.postData(ApiUrl.setNotificationLanguage, obj, true)
      .subscribe(response => {
          this.util.setLocalData('langData', langData, true);
          this.util.window.location.reload();
      });
  }

}
