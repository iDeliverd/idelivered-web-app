import { StyleConstants } from './../../../core/theme/styleConstants.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ApiUrl } from './../../../core/apiUrl';
import { HttpService } from './../../../services/http/http.service';
import { UserService } from './../../../services/user/user.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { MessagingService } from './../../../services/messaging/messaging.service';
import { StyleVariables } from './../../../core/theme/styleVariables.model';
import { ValidationService } from './../../../services/validation/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { W3WSettings, What3wordsService } from 'src/app/services/what3words/what3words.service';

declare const google: any;
declare const what3words: any;

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit, AfterViewInit {
  addEdit: string = 'Add New';
  private subscription: Subscription;
  getDataSubscription: Subscription;
  private getSettingSubscription: Subscription;

  style: StyleVariables;
  cancelBtn: StyleConstants;
  saveBtn: StyleConstants;

  form: FormGroup;
  manualAddressForm: FormGroup;
  showError: boolean = false;
  btnDisabled: boolean = false;
  id: string = '';
  location: any = {};
  setting: any = {};

  isLoading: boolean = false;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  countryISO: CountryISO | string = CountryISO.UnitedStates;
  preferredCountries: Array<CountryISO> | Array<string> = [];

  countryCodeString: string = '';
  countryCodeFlag: string = '';

  isWhat3Words: boolean;
  square: any;
  searchText = new FormControl('', Validators.required);
  foundWords: any[] = [];
  map: any = {};
  marker: any;
  searchSubscription: Subscription;
  isSuggest: boolean = false;
  styleSettings: W3WSettings = {
    rounded: false,
    width: "calc(100% - 45px)",
    visible: false

  }

  usingManualForm: boolean = false;

  editable_address_obj = {};


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private user: UserService,
    private http: HttpService,
    private message: MessagingService,
    public util: UtilityService,
    private validator: ValidationService,
    private translate: TranslateService,
    private w3wService: What3wordsService,
  ) {

    this.style = new StyleVariables();
    this.cancelBtn = new StyleConstants();
    this.saveBtn = new StyleConstants();
  }

  ngOnInit() {
    if (this.setting.enable_what3words_map == 1) {
      this.w3wService.loadWhat3WordsScript();
    }

    this.util.getStyles
      .subscribe(style => {
        this.style = style;
        this.cancelBtn.color = style.defaultColor;
        this.cancelBtn.borderColor = style.defaultColor;
        this.saveBtn.backgroundColor = style.primaryColor;
        this.saveBtn.borderColor = style.primaryColor;
        this.saveBtn.color = '#ffffff';
      })


    this.getSettingSubscription = this.util.getSettings.
      subscribe((data) => {
        if (data) {
          this.setting = data;
          if (!this.setting.cutom_country_code && !!this.setting.countryISO) {
            this.countryISO = (this.setting.countryISO).toLowerCase();
            this.preferredCountries = [(this.setting.countryISO).toLowerCase()];
          }
          if (this.setting.cutom_country_code == 1 && this.setting.countryCodes.length > 0) {
            this.setting.countryCodes.forEach(item => {
              if (this.setting.cutom_country_code == 1) {
                this.preferredCountries.push(item)
              } else {
                this.preferredCountries.push(item.iso.toLowerCase())
              }
            });
          }
        }
      });

    this.makeForm();
    this.subscribeRoute();
  }



  ngAfterViewInit() {

    if (this.setting.enable_split_address == 1) {
      this.util.settingsLoaded.subscribe(loaded => {
        if (loaded && !!this.setting) {
          this.initMap();
        }
      })

    }

  }


  makeForm() {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, this.validator.noWhitespaceValidator, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      'houseNo': ['', Validators.compose([Validators.required])],
      'collectNo': ['', Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'addressLineFirst': ['', Validators.compose([Validators.required])],
      'latitude': ['', Validators.compose([Validators.required])],
      'longitude': ['', Validators.compose([Validators.required])],
      'phone_number': ['', Validators.compose([Validators.required])],
      'city': [''],
      'state': [''],
      'pincode': [''],
      'reference_address': ['', Validators.compose([Validators.maxLength(this.setting.address_reference_char_limit)])]
    });
    if (this.setting.cutom_country_code) {
      this.form.addControl('countryCode', new FormControl('', [Validators.required]))
    }

    if (this.setting.addCollectFieldInAddress == 0) {
      this.form.controls['collectNo'].setValidators(null);
      this.form.controls['collectNo'].updateValueAndValidity();
    }

    if (this.setting.enable_name_validation) {
      this.form.controls['name'].setValidators([Validators.required, this.validator.noWhitespaceValidator, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]);
      this.form.controls['name'].updateValueAndValidity();
    }

    if (this.setting.enable_split_address) {
      this.form.addControl('buildingName', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('streetName', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('streetNo', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('emirate', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('landmark', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
    }

    if (this.setting.enable_manual_address_fields) {
      this.form.addControl('building_no', new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]));
      this.form.addControl('street_no', new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,3}$/)]));
      this.form.addControl('zone_no', new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]));
      this.form.addControl('street_name', new FormControl('', [Validators.pattern(/^[A-Za-z]+$/)]));
      this.form.addControl('additional_directions', new FormControl(''));
    }


  }


  onAddressTypeChange() {
    this.usingManualForm = !this.usingManualForm;
    if (this.usingManualForm) {
      this.createManualAddressForm();
    }
    else {
      this.makeForm();
      this.getAddress();
    }

    if (this.id) {
      let data = this.util.getLocalData('locationData', true);
      this.manualAddressForm.patchValue({
        name: this.editable_address_obj['name'] ? this.editable_address_obj['name'] : '',
        houseNo: this.editable_address_obj['houseNo'] ? this.editable_address_obj['houseNo'] : '',
        phone_number: data['phone_number'] ? data['phone_number'] : '',
        city: data['city'] ? data['city'] : '',
        area: data['area'] ? data['area'] : '',
        pincode: data['pincode'] ? data['pincode'] : '',
        streetName: data['streetName'] ? data['streetName'] : '',
      })
    }
  }


  createManualAddressForm() {
    this.manualAddressForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, this.validator.noWhitespaceValidator, Validators.pattern(/^[a-zA-Z\s]*$/)])],
      'houseNo': ['', Validators.compose([Validators.required])],
      'latitude': [this.util.handler.latitude || 0],
      'longitude': [this.util.handler.longitude || 0],
      'streetName': ['', Validators.compose([Validators.required])],
      'area': [''],
      'city': ['', Validators.compose([Validators.required])],
      'pincode': ['', Validators.compose([Validators.required])],

      'phone_number': ['', Validators.compose([Validators.required])],

    });
  }



  initMap() {
    let data = this.util.getLocalData('user_location', true);
    let mapConfig = {
      zoom: 12,
      streetViewControl: false,
      mapTypeControl: false,
      center: { lat: data.lat, lng: data.lng },
      keyboardShortcuts: false
    }
    const self = this;
    if (this.addEdit == "Edit") {
      mapConfig = {
        ...mapConfig,
        center: { lat: this.form.controls['latitude'].value, lng: this.form.controls['latitude'].value }
      }
    }
    self.map = new google.maps.Map(document.getElementById('mapAddress'), mapConfig);
    self.marker = new google.maps.Marker({
      map: self.map,
      position: mapConfig.center
    });

  }
  // subscribe route
  subscribeRoute() {
    let self = this;
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['id']) {
        self.id = params['id'];
        self.getAddress();
        self.addEdit = 'Edit';
      }
      if (params['manual'] && params['manual'] == '1') {
        setTimeout(() => {
          this.onAddressTypeChange();
        }, 2000);
      }
    });
  }

  getAddress() {
    let data = this.util.getLocalData('locationData', true);
    this.form.controls.name.setValue(data.name);
    if (this.setting.enable_split_address == 1) {
      this.form.patchValue({
        houseNo: data.address_line_1,
        buildingName: data.buildingName,
        streetName: data.streetName,
        streetNo: data.streetNumber,
        emirate: data.emirate,
        landmark: data.landmark
      })
    } else if (this.setting.enable_manual_address_fields == 1) {
      this.form.patchValue({
        houseNo: data.address_line_1,
        building_no: data.building_no,
        street_name: data.street_name,
        street_no: data.street_no,
        zone_no: data.zone_no,
        additional_directions: data.additional_directions
      })
    } else {
      this.form.controls.houseNo.setValue(data.address_line_1);
    }

    if (this.setting.addCollectFieldInAddress == 1) {
      this.form.controls.collectNo.setValue(data.collectNumber);
    }
    this.form.controls.addressLineFirst.setValue(data.customer_address);
    this.form.controls.latitude.setValue(data.latitude);
    this.form.controls.longitude.setValue(data.longitude);
    this.form.controls.phone_number.setValue(data.phone_number);
    this.form.controls.reference_address.setValue(data.reference_address);

    if (this.setting.enable_what3words_map == 1) {
      this.w3wService.convertTo3Words(this.form.controls.latitude.value, this.form.controls.longitude.value).then((res: any) => {
        console.log(res.words);
        let styles = { ...this.styleSettings };
        styles.value = res.words;
        this.styleSettings = null;
        this.styleSettings = { ...styles };
      })
    }

    if (!this.setting.cutom_country_code) {
      this.countryISO = data.country_code;
    } else {
      let country_obj = this.preferredCountries.find(o => o['iso'] == data.country_code);
      console.log('country_obj', country_obj);
      if (!!country_obj) {
        this.setCountryCode(country_obj);
      }
      // this.form.controls.countryCode.setValue(data.country_code ? data.country_code : '');
    }
    this.getLatLong(data.customer_address);
    this.editable_address_obj = { ...this.form.value };
  }

  getLatLong(address) {
    let self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        self.form.controls.latitude.setValue(latitude);
        self.form.controls.longitude.setValue(longitude);
      }
    });
  }

  address(data: any) {
    this.form.controls.addressLineFirst.setValue(data.formatted_address);
    this.form.controls.latitude.setValue(data.lat);
    this.form.controls.longitude.setValue(data.lng);
    if (this.setting.enable_split_address == 1) {
      const center = { lat: data.lat, lng: data.lng };
      this.map.setCenter(center);
      this.marker.setPosition(center);
      this.marker.setMap(this.map)

    }
  }


  onSubmitManualForm() {
    if (this.manualAddressForm.invalid) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 10000);
      return;
    }
    var addressPayload = { ...this.manualAddressForm.value };
    var phnObj = addressPayload.phone_number;
    addressPayload['addressLineFirst'] = addressPayload.houseNo.trim();
    addressPayload['customer_address'] = (this.setting.send_null_in_customer_address == 0) ? addressPayload.houseNo.trim() : '';
    addressPayload['phone_number'] = !this.setting.cutom_country_code ? Number(phnObj.number.replace(/[^\d]/g, "")) : addressPayload.phone_number;
    addressPayload['country_code'] = !this.setting.cutom_country_code ? phnObj.countryCode.replace(/ +/g, "") : addressPayload.countryCode;
    addressPayload['accessToken'] = this.user.getUserToken;
    addressPayload['languageId'] = this.util.handler.languageId;
    this.addEditAddress(addressPayload);

  }



  onSubmit(value) {
    if (this.form.invalid) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 10000);
      return;
    }
    if (this.form.valid) {
      let obj = {
        name: value.name.trim(),
        addressLineFirst: value.houseNo.trim(),
        customer_address: this.setting.enable_what3words_map == 1 ? this.searchText.value : value.addressLineFirst.trim(),
        phone_number: !this.setting.cutom_country_code ? Number(value.phone_number.number.replace(/[^\d]/g, "")) : value.phone_number, // /-/g
        country_code: !this.setting.cutom_country_code ? value.phone_number.countryCode.replace(/ +/g, "") : value.countryCode,
        accessToken: this.user.getUserToken,
        latitude: value.latitude,
        longitude: value.longitude,
        languageId: this.util.handler.languageId,
        city: value.city.trim(),
        state: value.state.trim(),
        pincode: value.pincode.trim()
      };

      if (this.setting.addCollectFieldInAddress == 1) {
        obj['collectNumber'] = value.collectNo.trim();
      }
      if (this.setting.enable_address_reference) {
        obj['reference_address'] = value.reference_address
      }
      console.log(obj);
      if (this.setting.enable_split_address == 1) {
        let { buildingName, houseNo, streetName, streetNo, emirate, landmark } = value
        let newObj = {
          ...obj,
          buildingName: buildingName.trim(),
          apartmentNumber: houseNo.trim(),
          streetName: streetName.trim(),
          streetNumber: streetNo.trim(),
          emirate: emirate.trim(),
          landmark: landmark.trim()

        }
        this.addEditAddress(newObj);
      } else if (this.setting.enable_manual_address_fields == 1) {
        let { building_no, street_name, zone_no, street_no, additional_directions } = value
        let newObj = {
          ...obj,
          building_no: building_no,
          street_name: street_name,
          street_no: street_no,
          zone_no: zone_no,
          additional_directions: additional_directions
        }
        this.addEditAddress(newObj);
      } else {
        this.addEditAddress(obj);
      }

    }
  }

  addEditAddress(value) {
    this.isLoading = true;
    let url = ApiUrl.address.addAddress;
    if (this.setting.enable_split_address == 1) {
      url = ApiUrl.address.addAddressForSpiltAddress;
    }

    if (this.id) {
      value['addressId'] = this.id;
      url = this.setting.enable_split_address == 0 ? ApiUrl.address.editAddress : ApiUrl.address.editAddressForSpiltAddress;
    }

    if (this.setting.enable_manual_user_address) {
      url = ApiUrl.address.addAddressV3;
      if (this.id) {
        url = ApiUrl.address.editAddressV3;
      }
    }

    this.http.postData(url, value)
      .subscribe(response => {
        this.isLoading = false;

        if (response.status === 200) {
          this.resetCountryCode();
          this.message.toast('success', `${this.translate.instant('Address')} ${this.id ? this.translate.instant('Updated') : this.translate.instant('Added')} ${this.translate.instant('Successfully')}!`);
          this.util.goBack();
          this.util.clearLocalData('locationData');
        }

      }, error => {
        this.isLoading = false;
      });
  }

  resetCountryCode() {
    this.countryCodeString = '';
    this.countryCodeFlag = '';
  }

  setCountryCode(data) {
    console.log('data', data);

    this.form.controls.countryCode.setValue(data.iso);
    this.countryCodeString = data.country_code;
    this.countryCodeFlag = data.flag_image;
  }

  getGeoLocation(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    const request = { latLng: latlng };
    geocoder.geocode(request, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.form.patchValue({
            addressLineFirst: results[0].formatted_address,
            latitude: lat,
            longitude: lng
          });
        }
      }
    });
  }


  locateWord(word: string) {
    this.searchText.patchValue(word);
    this.foundWords = [];
    setTimeout(() => {
      this.isSuggest = false;
      this.w3wService.convertToCoordinates(word)
        .then((response) => {
          console.log("[convertToCoordinates]", response);
          let lat = response.coordinates.lat;
          let lng = response.coordinates.lng;
          this.getGeoLocation(lat, lng);

        });
    }, 500)

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (!!this.getDataSubscription) this.getDataSubscription.unsubscribe();
    if (!!this.getSettingSubscription) this.getSettingSubscription.unsubscribe();
  }

}
