import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiUrl } from './../../../../../core/apiUrl';
import { HttpService } from './../../../../../services/http/http.service';
import { PaymentBaseComponent } from '../payment-base.component';
import { WINDOW } from 'src/app/services/window/window.service';
import value from '*.json';
import { GlobalVariable } from 'src/app/core/global';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessagingService } from '../../../../../services/messaging/messaging.service';

@Component({
  selector: 'app-k-pay-gateway',
  templateUrl: './k-pay-gateway.component.html',
  styleUrls: ['./k-pay-gateway.component.scss']
})
export class KPayGatewayComponent extends PaymentBaseComponent implements OnInit {
  paymentInformation: FormGroup;
  submitted = false;
  access_token
  selectedPaymentMethod = '';
  CompleteOrder = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Rwanda, CountryISO.UnitedKingdom];
  refernceId: any;
  constructor(private formBuilder: FormBuilder, private http: HttpService, @Inject(WINDOW) private window: Window,    private message: MessagingService,
  ) {
    super();

  }

  ngOnInit() {
    this.paymentInformation = this.formBuilder.group({
      cnumber: [''],
      details: ['buy services'],
      cname: ['', Validators.required],
      pmethod: ['', Validators.required],
      amount: [localStorage.getItem('Net_Total')],
      bankid: ['000', Validators.required],
      returl: ['https://api.royostaging1.com/kpay-payment-success'],
      msisdn: ['', Validators.required],
      redirecturl: this.window.origin + '/success',
      currency: ['RWF']
    });


    // var user = JSON.parse(localStorage.getItem('web_user'));
    // this.paymentInformation.get("cnumber").patchValue(user.mobile_no);


  }

  get f() { return this.paymentInformation.controls; }

  getPaymentmethodValue(value,bankid){
  this.selectedPaymentMethod = value ;
    if(value == 'cc'){
      this.paymentInformation.controls['pmethod'].patchValue(value);
    }else{
      this.paymentInformation.controls['pmethod'].patchValue('momo');
      this.http.postData(ApiUrl.mtntoken,this.paymentInformation.value.pmethod).subscribe((res) =>{
        this.access_token = res.data.access_token;
      });
      this.paymentInformation.controls['bankid'].patchValue(bankid);    
    }
  }
  onSubmit() {
    this.submitted = true;

    var user = JSON.parse(localStorage.getItem('web_user'));
    this.paymentInformation.get("cnumber").patchValue(user.mobile_no);

    if(this.paymentInformation.value.pmethod == 'cc'){
      if (this.paymentInformation.value.msisdn == undefined ||this.paymentInformation.value.msisdn == "" ) {
        this.paymentInformation.controls['msisdn'].patchValue(user.country_code + user.mobile_no)
      }
    }
    

  
    // stop here if form is invalid
    if (this.paymentInformation.invalid) {
      return;
    }

    if(this.paymentInformation.value.pmethod == 'momo'){
      this.paymentInformation.controls['msisdn'].patchValue(this.paymentInformation.value.msisdn.e164Number)
      //  let correctNumber = this.paymentInformation.value.msisdn;
      //  correctNumber.substr(1,1);
      //  console.log(correctNumber);
       let mtnData  = {
         amount: this.paymentInformation.value.amount,
         currency: 'RWF',
         mobile_number: this.paymentInformation.value.msisdn,
         mtn_token: this.access_token 
       }
       
       this.http.postData(ApiUrl.mtnLink, mtnData).subscribe((res)=>{
         console.log(res);
               if(res.status == 200){
                 this.CompleteOrder = true;
                 this.refernceId = res.data.refid;
                 this.message.alert("info", 'please check your mobile to complete your Transaction');
               }
            
       },(err) =>{
        this.submitted = false;
        this.paymentInformation.reset();
        this.onClose.emit(false)});

    }else{
      this.http.postData(ApiUrl.paymentInformation, this.paymentInformation.value).subscribe((res) => {
        if (res.status == 200) {
          if(this.paymentInformation.value.pmethod == "cc"){
            this.onSuccess.emit({
              'paymentGatewayId': "kpay-"+this.paymentInformation.value.pmethod,
              "transaction_id": res.data.tid,
              "refid": res.data.refid,
              'waitForSuccess': true,
              'paymentUrl': res.data.url
            });
          }
          this.submitted = false;
          this.paymentInformation.reset();
        }
      }, (err) => this.onClose.emit(false));
      
    }
  }

completeOrder(){
  this.onSuccess.emit({
    'paymentGatewayId': "mtn-"+this.paymentInformation.value.pmethod,
    "refid": this.refernceId,
    "mobile_number":this.paymentInformation.value.msisdn.e164Number,
    "mtn_token":this.access_token,
     "amount":this.paymentInformation.value.amount,
    'waitForSuccess': false,
  });

  this.submitted = false;
  this.paymentInformation.reset();
}

}
