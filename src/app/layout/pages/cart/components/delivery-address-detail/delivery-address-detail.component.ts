import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { UtilityService } from '../../../../../services/utility/utility.service';
import { HttpService } from '../../../../../services/http/http.service';
import { UserService } from '../../../../../services/user/user.service';
import { MessagingService } from '../../../../../services/messaging/messaging.service';
import { ApiUrl } from '../../../../../core/apiUrl';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../../../services/validation/validation.service';
import { StyleConstants } from '../../../../../core/theme/styleConstants.model';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { W3WSettings, What3wordsService } from 'src/app/services/what3words/what3words.service';
import { GlobalVariable } from 'src/app/core/global';

declare const what3words: any;
declare const google: any;

@Component({
  selector: 'app-delivery-address-detail',
  templateUrl: './delivery-address-detail.component.html',
  styleUrls: ['./delivery-address-detail.component.scss']
})
export class DeliveryAddressDetailComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  isLoading: boolean = false;
  showError: boolean = false;
  is_self_pickup: number = 0;
  addressList: Array<any> = [];
  selectedAreaIndex: number = 0;
  localAreaIndex: number = 0;

  addressModel: any = {};
  form: FormGroup;
  display: string = "none";
  map: any = {};
  marker: any = {};

  countryCodeString: string = '';
  countryCodeFlag: string = '';

  @Input() cart: Array<any> = [];
  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input() loggedIn: boolean = false;
  @Input() addAddressModel: Observable<boolean>;
  @Input() isAddressHide: number = 0;
  @Input() calc_distance: number = 0;

  cancelBtn: StyleConstants;
  saveBtn: StyleConstants;
  routeSubscription: Subscription;

  @ViewChild('closeAddressModal', { static: false }) closeAddressModal: ElementRef;
  @ViewChild('closeNewAddress', { static: false }) closeNewAddress: ElementRef;

  @Output() addressDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() serviceCharge: EventEmitter<any> = new EventEmitter<any>(null);

  addressId: number = 0;

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  countryISO: CountryISO | string = CountryISO.UnitedStates;
  preferredCountries: Array<any> | Array<any> = [];

  isWhat3Words: boolean;
  searchText = new FormControl('', Validators.required);
  foundWords: any[] = [];
  searchSubscription: any;
  isSuggest: boolean = false;
  styleSettings: W3WSettings = {
    rounded: false,
    width: "100%",
    visible: false
  }
  client_code: string = GlobalVariable.UNIQUE_ID;



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    private user: UserService,
    private util: UtilityService,
    private message: MessagingService,
    private validator: ValidationService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private w3wService: What3wordsService
  ) {
    this.cancelBtn = new StyleConstants();
    this.saveBtn = new StyleConstants();

    this.routeSubscription = this.route.queryParams
      .subscribe(params => {
        if (params['place_order'] == 1 && params['adrs_id']) {
          this.addressId = parseInt(params['adrs_id']);
        }
      });
  }

  ngOnInit(): void {
    if (this.settings && this.settings.app_type == 7) {
      this.is_self_pickup = 1;
    }

    if (!!this.settings.countryISO) {
      this.countryISO = (this.settings.countryISO).toLowerCase();
      this.preferredCountries = [(this.settings.countryISO).toLowerCase()];
    }
    if (this.settings.countryCodes.length > 0) {
      this.settings.countryCodes.forEach(item => {
        if (this.settings.cutom_country_code == 1) {
          this.preferredCountries.push(item)
        } else {
          this.preferredCountries.push(item.iso.toLowerCase())
        }
      });
    }
    this.cancelBtn.color = this.style.defaultColor;
    this.cancelBtn.borderColor = this.style.defaultColor;
    this.saveBtn.backgroundColor = this.style.primaryColor;
    this.saveBtn.borderColor = this.style.primaryColor;
    this.saveBtn.color = '#ffffff';

    this.makeNewAddressForm();
    this.addAddressModel.subscribe(item => {
      if (item && this.settings.header_theme == 2) {
        this.display = 'block';
      }
    });

    // Load what3words script
    if (this.settings.enable_what3words_map == 1) {
      this.w3wService.loadWhat3WordsScript();
    }

  }

  ngAfterViewInit() {
    if (this.settings.enable_split_address == 1) {
      this.util.settingsLoaded.subscribe(loaded => {
        if (loaded && !!this.settings) {
          this.initMap();
        }
      })

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loggedIn && changes.loggedIn.currentValue) {
      this.getAddress();
    }
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

    self.map = new google.maps.Map(document.getElementById('mapAdd'), mapConfig);
    self.marker = new google.maps.Marker({
      map: self.map,
      position: mapConfig.center
    });

  }

  makeNewAddressForm() {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'houseNo': [''],
      'collectNo': ['', Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'addressLineFirst': ['', Validators.compose([Validators.required])],
      'latitude': ['', Validators.compose([Validators.required])],
      'longitude': ['', Validators.compose([Validators.required])],
      'phone_number': ['', Validators.compose([Validators.required])],
      'reference_address': ['', Validators.compose([Validators.maxLength(this.settings.address_reference_char_limit)])],
      'city': [''],
      'state': [''],
      'pincode': [''],
    });

    if (this.settings.cutom_country_code) {
      this.form.addControl('countryCode', new FormControl('', [Validators.required]))
    }

    if (this.settings.addCollectFieldInAddress == 0) {
      this.form.controls['collectNo'].setValidators(null);
      this.form.controls['collectNo'].updateValueAndValidity();
    }

    if (this.settings.enable_name_validation) {
      const lanvalue = JSON.parse(this.util.getLocalData('langData'));
      if(lanvalue.language_code == 'en'){
        this.form.controls['name'].setValidators([Validators.required, this.validator.noWhitespaceValidator, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]);
        this.form.controls['name'].updateValueAndValidity();
      }
      
    }

    if (this.settings.enable_split_address) {
      this.form.addControl('buildingName', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('streetName', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('streetNo', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('emirate', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
      this.form.addControl('landmark', new FormControl('', [Validators.required, this.validator.noWhitespaceValidator]));
    }

    if (this.settings.enable_manual_address_fields) {
      this.form.addControl('building_no', new FormControl('', [Validators.required]));
      this.form.addControl('street_no', new FormControl('', [Validators.required]));
      this.form.addControl('zone_no', new FormControl('', [Validators.required]));
      this.form.addControl('street_name', new FormControl(''));
      this.form.addControl('additional_directions', new FormControl(''));
    }
  }

  getAddress() {
    let obj = {
      accessToken: this.user.getUserToken,
      languageId: this.util.handler.languageId,
      latitude: this.util.handler.latitude,
      longitude: this.util.handler.longitude
    }
    if (this.cart.length) {
      obj['supplierBranchId'] = this.cart[0].supplier_branch_id;
    }

    this.http.postData(ApiUrl.address.getAddress, obj, true)
      .subscribe(response => {
        if (!!response && response.data) {
          this.addressModel = response.data;
          this.addressList = response.data.address;
          let index = -1;
          if (this.addressId) {
            index = response.data.address.findIndex((add) => add.id == this.addressId);
          } else {
            if (this.util.getLocalData('cart_address', true)) {
              let cart_address = this.util.getLocalData('cart_address', true);
              index = response.data.address.findIndex((add) => add.id == cart_address.id);
            } else {
              index = response.data.address.findIndex((add) => add.is_default == 1);
            }
          }
          if (index > -1) {
            this.selectedAreaIndex = index;
            this.localAreaIndex = index;
          }
          if (this.settings.supplier_service_fee == 1 && response.data.user_service_charge) {
            this.serviceCharge.emit(response.data.user_service_charge);
          }
          this.onAddressSelect();
        }
      });
  }

  onAddressSelect(): void {
    this.selectedAreaIndex = this.localAreaIndex;
    let completeInfo = Object.assign({}, this.addressModel);
    completeInfo.address = this.addressList[this.selectedAreaIndex];
    this.addressDetail.emit(completeInfo);
    this.closeAddressModal.nativeElement.click();

  }

  addAddress() {
    if (this.loggedIn) {
      this.router.navigate(['/account/address/add-edit-address']);
    } else {
      this.message.alert('info', `${this.translate.instant('Please Login First')}!`);
    }
  }

  openNewAddressDialog() {
    if (!this.loggedIn) {
      this.message.alert('info', `${this.translate.instant('Please Login First')}!`);
    } else {
      this.display = 'block';
    }
  }

  onAddressSearch(data) {
    this.form.controls.addressLineFirst.setValue(data.formatted_address);
    this.form.controls.latitude.setValue(data.lat);
    this.form.controls.longitude.setValue(data.lng);
    if (this.settings.enable_split_address == 1) {
      const center = { lat: data.lat, lng: data.lng };
      this.map.setCenter(center);
      this.marker.setPosition(center);
      this.marker.setMap(this.map)

    }
  }

  setCountryCode(data) {
    this.form.controls.countryCode.setValue(data.country_code);
    this.countryCodeString = data.country_code;
    this.countryCodeFlag = data.flag_image;
  }

  onAdd(value) {
    if (this.form.invalid) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 30000);
      return;
    }
    let payload = {
      name: value.name.trim(),
      addressLineFirst: value.houseNo.trim(),
      customer_address: this.settings.enable_what3words_map == 1 ? this.searchText.value : value.addressLineFirst.trim(),
      phone_number: !this.settings.cutom_country_code ? Number(value.phone_number.number.replace(/[^\d]/g, "")) : value.phone_number,
      country_code: !this.settings.cutom_country_code ? value.phone_number.countryCode.replace(/ +/g, "") : value.countryCode,
      accessToken: this.user.getUserToken,
      latitude: value.latitude,
      longitude: value.longitude,
      languageId: this.util.handler.languageId,
      city: value.city.trim(),
      state: value.state.trim(),
      pincode: value.pincode.trim()
    }

    if (this.settings.addCollectFieldInAddress == 1) {
      payload['collectNumber'] = value.collectNo.trim();
    }

    if (this.settings.enable_address_reference) {
      payload['reference_address'] = value.reference_address
    }
    let apiUrl = ApiUrl.address.addAddress
    if (this.settings.enable_split_address == 1) {
      let { buildingName, houseNo, streetName, streetNo, emirate, landmark } = value
      let newObj = {
        ...payload,
        buildingName: buildingName.trim(),
        apartmentNumber: houseNo.trim(),
        streetName: streetName.trim(),
        streetNumber: streetNo.trim(),
        emirate: emirate.trim(),
        landmark: landmark.trim()

      }
      apiUrl = ApiUrl.address.addAddressForSpiltAddress
      payload = newObj;
    }
    else if (this.settings.enable_manual_address_fields == 1) {
      let { building_no, street_name, zone_no, street_no, additional_directions } = value
      let newObj = {
        ...payload,
        building_no: building_no,
        street_name: street_name,
        street_no: street_no,
        zone_no: zone_no,
        additional_directions: additional_directions
      }
      payload = newObj;
    } 
    this.isLoading = true;
    this.http.postData(apiUrl, payload)
      .subscribe(response => {
        if (response && response.status === 200) {
          this.addressList.push(response.data);

          this.message.toast('success', `${this.translate.instant('Address Added Successfully')}!`);

          let completeInfo = Object.assign({}, this.addressModel);
          completeInfo.address = response.data;

          this.selectedAreaIndex = this.addressList.length - 1;
          this.addressDetail.emit(completeInfo);

          this.util.setLocalData('cart_address', response.data, true);

          this.countryCodeString = '';
          this.countryCodeFlag = '';
          this.form.reset();
          this.closeNewAddress.nativeElement.click();
        }
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
      });
  }

  changeAddress() {
    this.localAreaIndex = this.selectedAreaIndex;
    this.util.setLocalData('cart_address', this.addressList[this.localAreaIndex], true);
  }
  trackByAddressFn(id, index) {
    return index;
  }



  locateWord(word: string) {
    this.searchText.patchValue(word);
    this.foundWords = [];
    this.isSuggest = false;
    what3words.api.convertToCoordinates(word).then((response) => {
      console.log("[convertToCoordinates]", response);
      let lat = response.coordinates.lat;
      let lng = response.coordinates.lng;
      this.getGeoLocation(lat, lng);

    });
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

  onAddressTypeChange() {
    this.router.navigate(['/account/address/add-edit-address'], { queryParams: { manual: '1' } });
  }


  ngOnDestroy(): void {
    this.closeAddressModal.nativeElement.click();
    this.closeNewAddress.nativeElement.click();
    if (!!this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
