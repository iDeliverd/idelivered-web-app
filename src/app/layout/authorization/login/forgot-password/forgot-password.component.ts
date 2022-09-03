import { AppSettings } from './../../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { StyleConstants } from './../../../../core/theme/styleConstants.model';
import { MessagingService } from './../../../../services/messaging/messaging.service';
import { ApiUrl } from './../../../../core/apiUrl';
import { HttpService } from './../../../../services/http/http.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { AppHandler } from './../../../../shared/models/appHandler.model';
import { GlobalVariable } from './../../../../core/global';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();
  @Output() eventUpdatePswd = new EventEmitter<boolean>();
  @Output() forgotPswdMobileNo = new EventEmitter<string>();


  loginForm: FormGroup;
  submitted: boolean = false;
  emailPattern: RegExp;
  handler: AppHandler;
  primaryButton: StyleConstants;
  style: StyleVariables;
  styleSubscription: Subscription;
  siteName: string = '';
  settings: AppSettings;
  image_paths: string = '';

  isLoading: boolean = false;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  countryISO: CountryISO | string = CountryISO.UnitedStates;
  preferredCountries: Array<any> | Array<any> = [];
  countryCodeString: string = '';
  countryCodeFlag: string = '';
  mobile_number: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private http: HttpService,
    private message: MessagingService,
    private translate: TranslateService) {

    this.siteName = GlobalVariable.SITE_NAME;
    // this.emailPattern = new RegExp(GlobalVariable.PATTERNS.email);
    this.style = new StyleVariables();
    this.primaryButton = new StyleConstants();
  }

  ngOnInit() {

    this.styleSubscription = this.util.getStyles
      .subscribe((style: StyleVariables) => {
        this.style = style;
        this.primaryButton.backgroundColor = style.primaryColor;
        this.primaryButton.color = '#ffffff';
      });

    this.util.getSettings.subscribe((settings: AppSettings) => {
      if (!!settings) {
        this.settings = settings;
        this.image_paths = settings.site_logo;

        if (settings.countryCodes.length > 0) {
          settings.countryCodes.forEach(item => {
            if (settings.cutom_country_code == 1) {
              this.preferredCountries.push(item)
            } else {
              this.preferredCountries.push(item.iso.toLowerCase())
            }
          });
        }
        if (!!settings.countryISO && !settings.cutom_country_code) {
          this.countryISO = (settings.countryISO).toLowerCase();
          this.preferredCountries = [(settings.countryISO).toLowerCase()];
        }
      }
    });

    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
    });

    if (this.settings.enable_forgot_password_via_phone_number != 1) {
      this.loginForm.addControl('emailId', new FormControl('', [Validators.required, Validators.email]));
    } else {
      this.loginForm.addControl('mobile_no', new FormControl('', [Validators.required]));
    }

  }

  get userForm() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 10000);
      return;
    }

    this.isLoading = true;
    var api = (this.settings.enable_forgot_password_via_phone_number ? ApiUrl.auth.forgetPasswordMobileNo : ApiUrl.auth.forgotPassword);
    var passcodeMode = (this.settings.enable_forgot_password_via_phone_number ? 'Text' : 'Email');
    const payload = { ...this.loginForm.value };


    if (this.settings.enable_forgot_password_via_phone_number == 1) {
      this.mobile_number = payload['mobile_no'].number.replace(/[^\d]/g, '');
      payload.mobile_no = this.mobile_number;
    }

    this.http.postData(api, payload)
      .subscribe(response => {
        if (!!response && response.data) {
          if (this.settings.enable_forgot_password_via_phone_number != 1) {
          this.closeModal.emit(true);
          }
          if (this.settings.enable_forgot_password_via_phone_number == 1) {
          this.openUpdatePassword();
          this.sendMobileNoToAuth(this.mobile_number);
          }
          this.message.toast('success', this.translate.instant(`${passcodeMode} With Password Sent Successfully`));
        }
        this.isLoading = false;
      }, (err) => this.isLoading = false);
  }

  openUpdatePassword() {
    this.eventUpdatePswd.emit(true);
  }

  sendMobileNoToAuth(value: string) {
    this.forgotPswdMobileNo.emit(value);
  }

  ngOnDestroy() {
    this.styleSubscription.unsubscribe();
  }

}
