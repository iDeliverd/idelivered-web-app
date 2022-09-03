import { Component, Inject, Input, OnInit } from '@angular/core';

import { MessagingService } from './../../../../../services/messaging/messaging.service';
import { GlobalVariable } from './../../../../../core/global';
import { ApiUrl } from './../../../../../core/apiUrl';
import { HttpService } from './../../../../../services/http/http.service';
import { ValidationService } from './../../../../../services/validation/validation.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { AppSettings } from 'src/app/shared/models/appSettings.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { StyleVariables } from 'src/app/core/theme/styleVariables.model';
import { WINDOW } from 'src/app/services/window/window.service';
import { UtilityService } from 'src/app/services/utility/utility.service';
import { TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  emailForm: FormGroup;
  isSubmitted: boolean = false;
  settingsSubscription: Subscription;
  styleSubscription: Subscription;
  @Input() position: any;

  settings: AppSettings;  
  style: StyleVariables;

  contact: {
    phoneNumber: string;
    email: string;
    country: string;
    whatsAppNumber: string;
  };

  constructor(
    public dialogRef: DynamicDialogRef,
    private validation: ValidationService,
    private httpService: HttpService,
    private messageService: MessagingService,
    private util:UtilityService,
    @Inject(WINDOW) private window: Window,
    private fb: FormBuilder,
    private translate: TranslateService
  ) { 
    this.contact = {
      phoneNumber: (GlobalVariable.PHONE_NUMBER).startsWith('+') ? GlobalVariable.PHONE_NUMBER : (`${GlobalVariable.PHONE_NUMBER}`),
      email: GlobalVariable.EMAIL,
      country: GlobalVariable.COUNTRY,
      whatsAppNumber: ''
    }
    this.contact['whatsAppNumber'] = GlobalVariable.WHATSAPP_NUMBER ? (`${(GlobalVariable.WHATSAPP_NUMBER_CODE).startsWith('+') ? '' : '+'}${GlobalVariable.WHATSAPP_NUMBER_CODE} ${GlobalVariable.WHATSAPP_NUMBER}`) : '';

    this.style = new StyleVariables();
  }

  
  ngOnInit() {
    console.log(this.contact) 
    this.styleSubscription = this.util.getStyles.subscribe((style: StyleVariables) => {
        this.style = style;
      });

    this.emailForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.validation.email)]),
      subject: new FormControl('', [Validators.required, Validators.maxLength(200),Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      body: new FormControl('', [Validators.required, Validators.maxLength(1000)])
    })

    
  }
  mailTo() {
    this.window.location.href = `mailto:${this.contact.email}`;
  }

  onSend(): void {
    this.isSubmitted = true;
    if (this.emailForm.invalid) { 
      setTimeout(() => {
        this.isSubmitted = false;
      }, 300000);
      return;
    }

    this.httpService.postData(ApiUrl.sendEmail, {
      receiverEmail: GlobalVariable.EMAIL,
      senderEmail: this.emailForm.controls.email.value,
      subject: this.emailForm.controls.subject.value,
      content: this.emailForm.controls.body.value
    }).subscribe((response) => {
      if (response && response.status == 200) {
        this.messageService.toast('success', this.translate.instant('Email Sent Successfully'))
      }
      this.close();
    }, (err) => {
    })

  }

  get controls() { return this.emailForm.controls; }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if(!!this.styleSubscription) this.styleSubscription.unsubscribe();
    if(!!this.settingsSubscription) this.settingsSubscription.unsubscribe();

  }

}
