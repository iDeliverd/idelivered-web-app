import { SignUpComponent } from './sign-up/sign-up.component';
import { AppSettings } from './../../shared/models/appSettings.model';
import { StyleVariables } from './../../core/theme/styleVariables.model';
import { GlobalVariable } from './../../core/global';
import { UtilityService } from './../../services/utility/utility.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, SimpleChanges, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiUrl } from 'src/app/core/apiUrl';
import { HttpService } from './../../services/http/http.service';

declare const $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnChanges, OnDestroy {

  @Output() closeAuth = new EventEmitter<boolean>();
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('openForgot', { static: false }) openForgot: ElementRef;
  @Input() authType: string;
  @ViewChild(SignUpComponent, { static: false }) signUpComponent: SignUpComponent;

  siteName: string = '';
  registrationUrl: string = '';
  styleSubscription: Subscription;
  settingSubscription: Subscription;
  style: StyleVariables;
  isLogin: boolean = true;
  forgotPassword: boolean = false;
  otherLogins: boolean = true;
  inCompleteProfile: any = {};
  settings: AppSettings;

  public is_tnc_checked: boolean = false;
  loginDisclaimer: '';
  updatePassword: boolean = false;
  mobileNoToUpdatePswd: string;

  constructor(private util: UtilityService, private router: Router, private http: HttpService) {

    this.style = new StyleVariables();
    this.siteName = GlobalVariable.SITE_NAME;
    this.registrationUrl = `${GlobalVariable.admin_domain}/#!/supplier-registration`;
  }

  ngOnInit() {
    this.authTypeCheck(this.authType);

    this.styleSubscription = this.util.getStyles
      .subscribe((style: StyleVariables) => {
        this.style = style;
      });

    this.settingSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
        if (settings) {
          this.settings = settings;
        }
      });

    if(this.settings.login_page_disclaimer == 1 && this.isLogin){
    this.getLoginDisclaimer();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.authType.currentValue;
    this.authTypeCheck(name);
  }

  authTypeCheck(type: any) {
    switch (type) {
      case 'LOGIN':
        this.isLogin = true;
        break;
      case 'SIGNUP':
        this.isLogin = false;
        break;
    }
  }

  getLoginDisclaimer(){
    this.http.getData(ApiUrl.getTermsConditions, {}, true, false).subscribe(response => {
      this.loginDisclaimer = response.data[0].terms_of_login;
    })
  }

  close() {
    this.closeModal.nativeElement.click();
  }

  openModal() {
    $("#auth").modal('show');
  }

  closeAuthModal() {
    this.closeAuth.emit(false);
  }

  closeModalFromChild(event: boolean) {
    if (event) this.close();
  }

  openForgotPassword() {
    this.forgotPassword = true;
  }

  openUpdatePassword() {
    this.updatePassword = true;
  }

  onInCompleteProfile(data?: any) {
    this.inCompleteProfile = data;
    this.isLogin = false;
  }

  onSocialLogin(userData) {
    this.isLogin = false;
    setTimeout(() => {
      this.signUpComponent.onSocialLogin(userData);
    }, 500);
  }

  setMobileNo(mobile_no: string) {
    this.mobileNoToUpdatePswd = mobile_no;
  }

  ngOnDestroy() {
    this.styleSubscription.unsubscribe();
    this.settingSubscription.unsubscribe();
    this.close();
    this.isLogin = false;
    this.forgotPassword = false;
    this.updatePassword = false;
  }

}
