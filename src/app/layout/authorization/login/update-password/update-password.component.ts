import { Subscription } from 'rxjs';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiUrl } from './../../../../core/apiUrl';
import { HttpService } from './../../../../services/http/http.service';
import { MessagingService } from './../../../../services/messaging/messaging.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { UserService } from './../../../../services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  form: FormGroup;
  showError: boolean = false;
  btnDisabled: boolean = false;
  id: string = '';
  styleSubscription: Subscription;
  style: StyleVariables;
  isLoading: boolean = false;

  @Input() mobile_no = '';
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private http: HttpService,
    private message: MessagingService, private util: UtilityService,
    private userService: UserService, private translate: TranslateService
  ) { }

  ngOnInit() {
    this.styleSubscription = this.util.getStyles.subscribe(style => {
      this.style = style;
    });

    this.makeForm();
  }

  makeForm() {
    this.form = this.fb.group({
      'oldPassword': ['', Validators.compose([Validators.required])],
      'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
      'languageId': [this.util.handler.languageId],
      'confirmPassword': ['', Validators.compose([Validators.required])],
      // 'accessToken': [this.userService.getUserToken],
    });
  }

  onSubmit(value) {
    this.showError = true;
    if (this.form.valid) {
      if (value.newPassword == value.confirmPassword) {
        this.isLoading = true;
        delete value['confirmPassword'];
        value['mobile_no'] = this.mobile_no;
        this.http.postData(ApiUrl.auth.changePasswordMobileNo, value)
          .subscribe(response => {
            this.isLoading = false;
            if (!!response && response.data) {
              this.message.toast('success', `${this.translate.instant('Password Changed Successfully')}!`);
              this.form.reset();
              this.showError = false;
              this.closeModal.emit(true);
            }
          }, error => { this.isLoading = false });
      } else {
        this.message.toast('info', this.translate.instant('New Password And Confirm Password Not Matched'));
      }
    }
  }

  ngOnDestroy() {
    this.styleSubscription.unsubscribe();
  }

}