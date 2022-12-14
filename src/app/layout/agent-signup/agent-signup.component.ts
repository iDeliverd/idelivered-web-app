import { Component, OnInit, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiUrl } from './../../core/apiUrl';
import { Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { GlobalVariable } from './../../core/global';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './../../services/http/http.service';
import { AppSettings } from '../../shared/models/appSettings.model';
import { StyleVariables } from './../../core/theme/styleVariables.model';
import { UtilityService } from './../../services/utility/utility.service';
import { StyleConstants } from 'src/app/core/theme/styleConstants.model';
import { MessagingService } from './../../services/messaging/messaging.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.scss']
})
export class AgentSignupComponent implements OnInit {

  styleSubscription: Subscription;
  settingSubscription: Subscription;
  agentForm: FormGroup;
  submitted: boolean = false;
  style: StyleVariables;
  settings: AppSettings;
  isLoading: boolean = false;
  documents: Array<any> = [];
  imageType: Array<string> = [];
  image: any = '';
  imageToUpload: any;

  primaryButton: StyleConstants;
  siteName: string = "";

  countryISO: CountryISO | string = CountryISO.UnitedStates;
  preferredCountries: Array<any> | Array<any> = [];
  selectedIso: string = '';

  countryCodeString: string = '';
  countryCodeFlag: string = '';

  customData: any = [];

  @ViewChildren('customcontent') targetDiv;

  constructor(
    private formBuilder: FormBuilder,
    private util: UtilityService,
    private http: HttpService,
    private message: MessagingService,
    private router: Router,
    private translate: TranslateService
  ) {

    this.imageType = GlobalVariable.imageType;
    this.primaryButton = new StyleConstants();
    this.siteName = GlobalVariable.SITE_NAME;
  }

  ngOnInit() {
    this.styleSubscription = this.util.getStyles
      .subscribe((style: StyleVariables) => {
        this.style = style;
        this.primaryButton.backgroundColor = style.primaryColor;
        this.primaryButton.color = '#ffffff';
      });

    this.settingSubscription = this.util.getSettings.subscribe((settings: AppSettings) => {
      if (!!settings) {
        this.settings = settings;

        if (!!settings.countryISO) {
          this.countryISO = (settings.countryISO).toLowerCase();
          //this.preferredCountries = [(settings.countryISO).toLowerCase()];
        }
        if (this.settings.countryCodes.length > 0) {
          this.settings.countryCodes.forEach(item => {
            if (settings.cutom_country_code == 1) {
              this.preferredCountries.push(item)
            } else {
              this.preferredCountries.push(item.iso.toLowerCase())
            }
          });
        }
      }
    });
    this.setCustomData();
    this.initForm();
  }

  initForm() {
    this.agentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      driver_license_number: [''],
      vehicle_plate_number: [''],
      vehicle_model: [''],
      vehicle_make: [''],
      vehicle_year: [''],
      vehicle_vin: [''],
      latitude: [''],
      longitude: [''],
      country: [''],
      state: [''],
      city: [''],
      is_agreeed: [1]
    });

    if (this.settings.cutom_country_code) {
      this.agentForm.addControl('countryCode', new FormControl('', [Validators.required]))
    }
  }

  get form() { return this.agentForm.controls; }
  onChangeCountry() {
    if (this.preferredCountries.length > 0) {
      this.preferredCountries.filter((x: any) => {
        if (x.country_code === this.agentForm.value.countryCode) {
          this.selectedIso = x.iso;
        }
      });
    }
  }

  setCountryCode(data) {
    this.agentForm.controls.countryCode.setValue(data.country_code);
    this.selectedIso = data.iso;
    this.countryCodeString = data.country_code;
    this.countryCodeFlag = data.flag_image;
  }

  onSubmit() {
    this.submitted = true;

    console.log('this.agentForm', this.agentForm);

    if (this.agentForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 15000);
      return;
    }


    let payload = {
      name: this.agentForm.value.firstName + ' ' + (this.agentForm.value.lastName ? this.agentForm.value.lastName : ''),
      email: this.agentForm.value.email,
      phone_number: !this.settings.cutom_country_code ? Number(this.agentForm.value.phone_number.number.replace(/[^\d]/g, "")) : this.agentForm.value.phone_number,
      iso: !this.settings.cutom_country_code ? this.agentForm.value.phone_number.countryCode : this.selectedIso,
      country_code: !this.settings.cutom_country_code ? this.agentForm.value.phone_number.dialCode : this.agentForm.value.countryCode,
      password: this.agentForm.value.password,
      vehicle_plate_number: this.agentForm.value.vehicle_plate_number,
      latitude: this.agentForm.value.latitude,
      longitude: this.agentForm.value.longitude,
      state: this.agentForm.value.state,
      city: this.agentForm.value.city,
      driver_license_number: this.agentForm.value.driver_license_number,
      vehicle_model: this.agentForm.value.vehicle_model,
      vehicle_make: this.agentForm.value.vehicle_make,
      vehicle_year: this.agentForm.value.vehicle_year,
      vehicle_vin: this.agentForm.value.vehicle_vin,
    }

    // if(this.settings.cutom_country_code) {
    // payload['country_code'] = !this.settings.cutom_country_code ? this.agentForm.value.countryCode;

    // payload.countryCode = !this.settings.cutom_country_code ? payload.mobileNumber.dialCode:  payload.countryCode;
    // }
    if (this.imageToUpload) {
      payload['file'] = this.imageToUpload;
    }

    console.log('payload', payload);

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }

    if (this.documents.length) {
      for (let document of this.documents) {
        form_data.append('documents', document);
      }
    }
    let headers = [{
      key: 'secret_key',
      value: GlobalVariable.AGENT_DB_KEY
    }];

    this.isLoading = true;
    this.http.postAgentData(ApiUrl.registerAgent, form_data, headers)
      .subscribe(response => {
        if (response) {
          this.message.toast('success', 'Registration Successfull');
          this.router.navigate(['/']);
        }
        this.isLoading = false;
      }, err => {
        this.isLoading = false;
      });

  }

  onDocumentSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      var obj = { file: event.target.files[0], fileToShow: '' }
      if (this.imageType.includes(obj.file.type)) {
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
          obj.fileToShow = e.target.result;
        }
        this.documents.push(obj);
      } else this.message.toast('warning', this.translate.instant('Invalid File Type'));
    }
  }

  removeDocument() {
    this.documents = [];
  }

  addressSearch(data) {
    this.agentForm.controls.address.setValue(data.formatted_address);
    this.agentForm.controls.country.setValue(data.country);
    this.agentForm.controls.city.setValue(data.locality);
    this.agentForm.controls.latitude.setValue(data.lat);
    this.agentForm.controls.longitude.setValue(data.lng);
  }
  trackBydocumentsFn(id, index) {
    return index;
  }
  onImageSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (this.imageType.includes(file.type)) {
        this.imageToUpload = event.target.files[0];
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => {
          this.image = e.target.result;
        }
      } else this.message.toast('warning', this.translate.instant('Invalid File Type'));
    }
  }


  setCustomData() {

    this.http.getData(ApiUrl.getCustomPageData, { type: 'become_driver' }, true, false).toPromise().then((response) => {
      this.customData = (response && response.data && response.data.list) ? response.data.list : [];
      // setTimeout(()=>{
      //   if(this.customData.length>0){
      //     // if(this.targetDiv!=undefined){
      //     //   this.customData.forEach((element,index) => {
      //     //     this.targetDiv.toArray()[index].nativeElement.children[0].style.fontSize = "20px";
      //     //     this.targetDiv.toArray()[index].nativeElement.children[0].style.color = "#000";
      //     //   });
      //     // }

      //   }
      // },1500)


    }).catch((err) => console.log(err));

  }


}

