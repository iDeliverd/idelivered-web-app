import { Component, OnInit, ViewChildren } from '@angular/core';
import { EMPTY, Subscription } from 'rxjs';
import { ApiUrl } from './../../../core/apiUrl';
import { Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { GlobalVariable } from './../../../core/global';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './../../../services/http/http.service';
import { AppSettings } from '../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../core/theme/styleVariables.model';
import { UtilityService } from './../../../services/utility/utility.service';
import { StyleConstants } from 'src/app/core/theme/styleConstants.model';
import { MessagingService } from './../../../services/messaging/messaging.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {

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

  categoryData = [];
  categories = [];
  selectedCategories = [];


  selectedCategoryId = '';
  selectedSubCategory = [];

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
    this.getCategories();
    this.initForm();
  }

  initForm() {
    this.agentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      addressLineFirst: ['', [Validators.required]],
      latitude: '',
      longitude: '',
      is_multibranch: 0,
      is_agreeed: 1,
      city: ['', [this.settings.enable_town_in_address ? Validators.required : Validators.nullValidator]],
      state: ['', [this.settings.enable_state_in_address ? Validators.required : Validators.nullValidator]],
      pincode: ['', [this.settings.enable_pincode_in_address ? Validators.required : Validators.nullValidator]],
    });

    if (this.settings.cutom_country_code) {
      this.agentForm.addControl('countryCode', new FormControl('', [Validators.required]))
    }
  }


  address(data: any) {
    this.agentForm.controls.addressLineFirst.setValue(data.formatted_address);
    this.agentForm.controls.latitude.setValue(data.lat);
    this.agentForm.controls.longitude.setValue(data.lng);
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

    if (this.agentForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 15000);
      return;
    }

    this.getMarkedCategories();

    if (!this.selectedCategories.length) {
      this.message.toast('error', 'Please select category');
      return false;
    }


    // if (this.agentForm.value.is_agreeed == 0 && this.agentForm.value.is_car_insured == 1) return;

    // if (!this.documents.length && this.agentForm.value.is_car_insured == 1) {
    //   this.message.alert('warning', 'Please Select Insuarance Documents');
    //   return;
    // }

    // if (!this.agentForm.value.latitude || !this.agentForm.value.longitude) {
    //   this.message.alert('warning', 'Location invalid please try again');
    //   return;
    // }
    // this.agentForm.value.phone_number.number


    let details = { ...this.agentForm.value };
    let payload = {
      supplierName: this.agentForm.value.firstName + ' ' + (this.agentForm.value.lastName ? this.agentForm.value.lastName : ''),
      supplierEmail: this.agentForm.value.email,
      supplierMobileNo: !this.settings.cutom_country_code ? Number(this.agentForm.value.phone_number.number.replace(/[^\d]/g, "")) : this.agentForm.value.phone_number,
      iso: !this.settings.cutom_country_code ? this.agentForm.value.phone_number.countryCode : this.selectedIso,
      country_code: !this.settings.cutom_country_code ? this.agentForm.value.phone_number.dialCode : this.agentForm.value.countryCode,
      supplierAddress: details.addressLineFirst,
      latitude: details.latitude,
      longitude: details.longitude,
      is_multibranch: 0,
      self_pickup: 2,
      categoryIds: JSON.stringify(this.selectedCategories),
      city: details.city.trim(),
      state: details.state.trim(),
      pincode: details.pincode.trim()
    }

    let form_data = new FormData();
    for (let key in payload) {
      form_data.append(key, payload[key]);
    }

    // if (this.documents.length) {
    //   for (let document of this.documents) {
    //     form_data.append('documents', document);
    //   }
    // }


    this.isLoading = true;
    this.http.postData(ApiUrl.registerSupplier, form_data)
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
      let file = event.target.files[0];
      this.documents.push(file)
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

    this.http.getData(ApiUrl.getCustomPageData, { type: 'become_vendor' }, true, false).toPromise().then((response) => {
      this.customData = (response && response.data && response.data.list) ? response.data.list : [];
      // setTimeout(()=>{
      //   if(this.customData.length>0){
      //     if(this.targetDiv!=undefined){
      //       this.customData.forEach((element,index) => {
      //         // this.targetDiv.toArray()[index].nativeElement.children[0].style.fontSize = "20px";
      //         // this.targetDiv.toArray()[index].nativeElement.children[1].style.fontSize = "20px";

      //         this.targetDiv.toArray()[index].nativeElement.children.toArray().forEach(col => {
      //           console.log('rdfgdgf');

      //           col.style.fontSize = "20px";
      //         })
      //         this.targetDiv.toArray()[index].nativeElement.children[0].style.color = "#000";
      //       });
      //     }

      //   }
      // },1500)


    }).catch((err) => console.log(err));

  }


  markCat(cat, state) {
    if (cat.sub_category && (cat.sub_category).length) {
      (cat.sub_category).map(cat => {
        cat['checked'] = state;
        this.markCat(cat, state);
      });
    }
  }

  getCategories() {
    let params = {
      language_id: localStorage.getItem('lang') != 'en' ? 15 : 14
    };
    // services.GET_DATA(params, API.getAllCategories, function (response) {
    //   if (response.data.length) {
    //     this.categories = response.data;
    //     this.categories.map((cat, index) => {
    //       if (cat.id == 1) {
    //         this.categories.splice(index, 1);
    //       }
    //       cat['checked'] = false;
    //       this.markCat(cat, false);
    //     });
    //     this.categoryData = [{ arr: this.categories, mark_all: false }];
    //   }
    // });


    this.http.getData(ApiUrl.getCategoryList, params)
      .subscribe(response => {
        if (!!response && response.data) {
          this.categories = response.data;
          this.categories.map((cat, index) => {
            if (cat.id == 1) {
              this.categories.splice(index, 1);
            }
            cat['checked'] = false;
            this.markCat(cat, false);
          });
          this.categoryData = [{ arr: this.categories, mark_all: false }];
        }
      });
  };


  viewSubCat(parentIndex, category) {
    this.categoryData.splice(parentIndex + 1, this.categoryData.length);
    if (category.sub_category && (category.sub_category).length) {
      this.categoryData.push({ arr: category.sub_category, mark_all: false, category: category });
    }
  }

  selectCat(category) {
    category.checked = !category.checked;
    if (!category.checked && !!category.sub_category && category.sub_category.length) {
      (category.sub_category).forEach(cat => {
        cat['checked'] = false;
        this.markCat(cat, false);
      });
    }
  }

  makeDataArr(cat, selectedCat) {
    if (cat.sub_category && (cat.sub_category).length) {
      (cat.sub_category).map((cat1) => {
        if (cat1.checked && cat.id == selectedCat.id) {
          selectedCat.data.push({ id: cat1.id, data: [] });
          (selectedCat.data).forEach(el => {
            this.makeDataArr(cat1, el);
          });
        }
      });
    }
  }

  getMarkedCategories() {
    this.selectedCategories = [];
    this.categories.map((cat) => {
      if (cat.checked || cat.selectedAr) {
        this.selectedCategories.push({ id: cat.id, data: [] });
        this.selectedCategories.forEach(el => {
          this.makeDataArr(cat, el);
        });
      }
    });
  }

  markAll(index) {
    if (this.categoryData[index]) {
      this.categoryData[index].mark_all = !this.categoryData[index].mark_all;
      this.categoryData[index].arr.forEach(cat => {
        cat.checked = this.categoryData[index].mark_all;
        this.markCat(cat, this.categoryData[index].mark_all);
      });
    }
  }

  selectSubCategory(subCatId: any, catId?) {
    if (this.selectedCategoryId != catId) {
      this.selectedCategoryId = catId
      this.selectedSubCategory = [];
    }
    if (this.selectedSubCategory.includes(subCatId)) {
      this.selectedSubCategory.splice(this.selectedSubCategory.indexOf(subCatId), 1);
    } else {
      this.selectedSubCategory.push(subCatId);
    }

    // this.filterProducts();
    // this.addClass();
  }

  trackBySubCatFn(id, index) {
    return index;
  }

  checkSubCategory(data, cat?: any, subcat1?: any) {
    if (!!data.checked || !data.checked) {
      console.log(data.checked);
      data.checked = !data.checked;
      let subCatData = {};
      if (!!subcat1 && !!cat) {
        subCatData = subcat1;
      } else {
        subCatData = cat;
      }

      if (!subCatData['selectedAr']) {
        subCatData['selectedAr'] = [];
      }
      // subCatData['selectedAr'] = !!subCatData['selectedAr'] ? subCatData['selectedAr'] : [];
      this.categoryArrayMain(data, subCatData);
    } else {
      data.checked = true;
    }

  }

  categoryArrayMain(subCategory, subCatData) {
    if (subCatData.selectedAr.includes(subCategory.id)) {
      subCatData.selectedAr.splice(subCatData.selectedAr.indexOf(subCategory.id), 1);
    } else {
      subCatData.selectedAr.push(subCategory.id);
    }

    console.log('subCatData.selectedAr223232', subCatData.selectedAr);

    console.log('categories', this.categories);

  }

  selectMainCat(cat) {
    cat.checked = !cat.checked;
    var findCat = this.selectedCategories.find(x => x = cat.id);
    if (findCat) {
      const index = this.selectedCategories.indexOf(findCat.id);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    else {
      this.selectedCategories.push(cat.id);
    }
  }


}


