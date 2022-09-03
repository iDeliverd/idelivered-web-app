import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { ApiUrl } from 'src/app/core/apiUrl';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { BehaviorSubject } from 'rxjs';
import { MessagingService } from '../../../../services/messaging/messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariable } from 'src/app/core/global';

@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent implements OnInit {
  headers: any;

  constructor(private http: HttpService, private activatedRoute: ActivatedRoute, private util: UtilityService, private router: Router, private message: MessagingService, private translate: TranslateService) { }
  param1: any;
  param2: any;
  params: any;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.params = params;
    });

    if (!this.params) {
      this.router.navigateByUrl('/');
    } else if (!this.params.type) {
      this.http.postData(ApiUrl.auth.emailVerification, { email: this.params.email, otp: this.params.otp, languageId: this.util.handler.languageId })
        .subscribe((response) => {
          if (!!response && response.data) {
            this.message.toast('success', this.translate.instant('email is verified sucessfully please Continue with login'));
            this.router.navigateByUrl('/');
          }
        }, error => {
          this.router.navigateByUrl('/');
        })

    } else if (this.params.type) {
      this.getAgentSecretKey();

      this.http.postAgentData(ApiUrl.auth.emailVerificationForVendor, { email: this.params.email, otp: this.params.otp }, this.headers, false)
        .subscribe((response) => {
          if (!!response && response.data) {
            this.message.toast('success', this.translate.instant('Email is verified sucessfully. Please continue with login'));
            this.router.navigateByUrl('/');
          }
        }, error => {
          this.router.navigateByUrl('/');
        })
    }
  }

  getAgentSecretKey() {
    this.headers = [
      {
        "key": "secret_key",
        "value": GlobalVariable.AGENT_DB_KEY
      }
    ];
  }
}
