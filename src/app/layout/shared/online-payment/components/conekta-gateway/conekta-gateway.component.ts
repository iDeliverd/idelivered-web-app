import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { UtilityService } from '../../../../../services/utility/utility.service';
import { ScriptService } from '../../../../../services/script/script.service';
import { ScriptModel } from '../../../../../shared/models/script.model';
import { PaymentBaseComponent } from '../payment-base.component';

import { UserService } from './../../../../../services/user/user.service';
import { ApiUrl } from './../../../../../core/apiUrl';
import { HttpService } from './../../../../../services/http/http.service';
import { MessagingService } from './../../../../../services/messaging/messaging.service';
import { TranslateService } from '@ngx-translate/core';

declare const Conekta: any;

@Component({
  selector: 'app-conekta-gateway',
  templateUrl: './conekta-gateway.component.html',
  styleUrls: ['./conekta-gateway.component.scss']
})
export class ConektaGatewayComponent extends PaymentBaseComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;
  showAddCard: boolean = false;
  showCard = 1;

  paymentForm: FormGroup;
  submitted: boolean = false;
  style: StyleVariables;
  user: any;

  styleSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private message: MessagingService,
    private http: HttpService,
    private userService: UserService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private scriptService: ScriptService,
    private utilService: UtilityService
  ) {
    super();
    this.style = new StyleVariables();
  }

  ngOnInit() {
    this.makeSubscription();

    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      if (!!user) {
        this.user = user;
        if(!this.user.customer_payment_id) {
          this.showCard = 0;
        }
      }
    });

    this.showAddCard = true;
    if (this.settings.card_gateway['conekta'] == 1) {
    } else {
      const { key, value } = this.gateway.key_value_front.find((item) => item.for_front == 1);

      const script = new ScriptModel('conekta', 'https://cdn.conekta.io/js/latest/conekta.js');

      this.scriptService.loadScript(script).then((script: ScriptModel) => {
        if (!script.isLoaded) {
          this.onError.emit('unable to load conekta script');
          return;
        }
        Conekta.setPublicKey(value);
        this.createPaymentForm();
        this.isLoading = false;
      });
    }
  }

  makeSubscription() {
    this.styleSubscription = this.utilService.getStyles.subscribe((style: StyleVariables) => {
      this.style = style;
    })
  }

  private validateCardNumber(control: FormControl): { [key: string]: boolean } | null {
    if (Conekta.card.validateNumber(control.value)) {
      return null;
    } else {
      return { 'cardNumber': true };
    }
  }

  private validateCVC(control: FormControl): { [key: string]: boolean } | null {
    if (Conekta.card.validateCVC(control.value)) {
      return null;
    } else {
      return { 'cvc': true };
    }
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      exp_year: ['', [Validators.required, Validators.minLength(4)]],
      exp_month: ['', [Validators.required]],
      cvc: ['', [Validators.required, this.validateCVC]],
      number: ['', [Validators.required, this.validateCardNumber]]
    })
  }

  addCard() {
    if (this.paymentForm.invalid) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
      }, 1000 * 60 * 10);
      return;
    }

    const self = this;

    const successResponseHandler = (token) => {
      this.onSave(token);
      // self.onSuccess.emit({ 'paymentGatewayId': 'conekta', 'token': token.id });
    };

    const errorResponseHandler = function (error) {
      self.onError.emit(error.message);
    };

    Conekta.Token.create({
      card: this.paymentForm.value,
    }, successResponseHandler, errorResponseHandler);

  }

  onSave(token) {
    // if (this.form.valid) {
    const obj = { ...this.paymentForm.value };

    obj.card_holder_name = obj.name;
    obj.card_number = obj.number;
    obj.card_token = token.id;
    obj['card_type'] = 'VISA';
    delete obj.name;
    delete obj.number;
    delete obj.device_fingerprint;

    // if (obj.card_number.length < 14) {
    //   this.message.toast('success', `${this.translate.instant('Please Enter Valid Card Number')}!`);
    //   return;
    // }

    const payload: any = {
      ...obj,
      gateway_unique_id: 'conekta',
      user_id: this.user.id
    };
    this.isLoading = true;
    // this.isNativeLoading = true;
    this.http.postData(ApiUrl.addCard, payload)
      .subscribe(response => {
        if (!!response && response.data) {
          this.message.toast('success', `${this.translate.instant('Card Added Successfully')}!`);
          // this.form.reset();
          this.submitted = false;
          this.user.customer_payment_id = response.data.customer_payment_id;
          this.showCard = 1;
          this.userService.setUserLocalData({...this.user});
          // this.showAddCard = false;
          // this.getSaveCards();
        }
        this.isLoading = false
        // this.isNativeLoading = false;
      }, err => {
        this.isLoading = false;
        // this.isNativeLoading = false;
      });
    // }
  }

  onCardSelect($event) {
    this.onSuccess.emit($event);
  }

  ngOnDestroy(): void {
    if (this.styleSubscription) this.styleSubscription.unsubscribe();
  }

}

