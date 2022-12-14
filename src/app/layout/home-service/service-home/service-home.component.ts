import { SeoService } from './../../../services/seo/seo.service';
import { skip } from 'rxjs/operators';
import { ApiUrl } from '../../../core/apiUrl';
import { GlobalVariable } from './../../../core/global';
import { DataCacheService } from './../../../services/data-cache/data-cache.service';
import { UtilityService } from './../../../services/utility/utility.service';
import { HttpService } from './../../../services/http/http.service';
import { StyleVariables } from './../../../core/theme/styleVariables.model';
import { AppSettings } from './../../../shared/models/appSettings.model';
import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../../services/window/window.service';
import { SingleVendorComponent } from '../../shared/home/components/single-vendor/single-vendor.component';
import { CategoryFilter } from 'src/app/shared/models/categoryFilter';

@Component({
  selector: 'app-service-home',
  templateUrl: './service-home.component.html',
  styleUrls: ['./service-home.component.scss']
})
export class ServiceHomeComponent implements OnInit {

  @ViewChild(SingleVendorComponent, { static: false }) single_vendor: SingleVendorComponent;
  settingsSubscription: Subscription;
  offerSubscription: Subscription;
  styleSubscription: Subscription;
  selfPickSubscription: Subscription;
  locationSubscription: Subscription;
  categorySubscription: Subscription;
  cartSubscription: Subscription

  settings: AppSettings;
  homeData: any;
  categories: Array<any> = [];
  recentlyViewed: Array<any> = [];
  topBanner: any = [];
  bannerImage: string = "";
  style: StyleVariables;
  selectedTab: number = 1;

  siteName: string = '';

  tabOffset: number = 0;
  zero: number = 0;
  one: number = 0;
  two: number = 0;
  three: number = 0;
  four: number = 0;
  cart: Array<any> = [];

  categroyId: number = 0;
  isLoading: boolean = false; 

  is_mobile: boolean = GlobalVariable.IS_MOBILE;

  home_search: boolean = true;
  selectedIds: CategoryFilter = new CategoryFilter();

  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private util: UtilityService,
    private http: HttpService,
    private data_cache: DataCacheService,
    private seo: SeoService,
    @Inject(DOCUMENT) private document,
    @Inject(WINDOW) private window: Window) {

    this.siteName = GlobalVariable.SITE_NAME;

    this.settingsSubscription = this.util.getSettings.subscribe(
      (settings: AppSettings) => {
        if (settings) {
          this.settings = settings;

          if (settings.isCustomFlow) {
            this.route.queryParams.subscribe(params => {
              this.categroyId = params.cat_flow_id ? parseInt(params.cat_flow_id) : 0;
            });
          }
        }
      }
    );
    this.navigateToHome();
  }

  @HostListener('window:resize', [])
  onResize() {
    if (!!this.settings && [1, 2].includes(this.settings.app_type)) {
      this.tabOffset = 0;
      this.zero = 0;
      this.one = 0;
      this.two = 0;
      this.three = 0;
      this.four = 0;
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll(refresh) {

    if (Math.ceil(this.window.pageYOffset) >= 500) this.home_search = false;
    else this.home_search = true;

    if (!!this.settings && [1, 2].includes(this.settings['app_type'])) {
      if (refresh) {
        this.window.scrollTo(0, 0);
      }

      if(this.settings.enable_service_pickup){
        this.zero = this.document.getElementById("0")
        ? this.zero < (this.document.getElementById("0").offsetTop + 300) ? this.document.getElementById("0").offsetTop + 300 : this.zero
        : null;
      }
      this.one = this.document.getElementById("1")
        ? this.one < (this.document.getElementById("1").offsetTop + 300) ? this.document.getElementById("1").offsetTop + 300 : this.one
        : null;
      this.two = this.document.getElementById("2")
        ? this.two < (this.document.getElementById("2").offsetTop + 300) ? this.document.getElementById("2").offsetTop + 300 : this.two
        : null;
      this.three = this.document.getElementById("3")
        ? this.three < (this.document.getElementById("3").offsetTop + 300) ? this.document.getElementById("3").offsetTop + 300 : this.three
        : null;
      this.four = this.document.getElementById("4")
        ? this.four < (this.document.getElementById("4").offsetTop + 300) ? this.document.getElementById("4").offsetTop + 300 : this.four
        : null;

      const offset = this.window.pageYOffset;

      // if (!!this.one && offset < this.two) {
      //   this.selectedTab = 1;
      // } else if (!!this.two && offset > this.two) {
      //   this.selectedTab = 2;
      // } else if (!!this.three && offset > this.three) {
      //   this.selectedTab = 3;
      // } else if (!!this.four && offset > this.four) {
      //   this.selectedTab = 4;
      // }
      if (!!this.zero && offset < this.one) {
        this.selectedTab = 0;
      } else if (!!this.one && offset > this.one) {
        this.selectedTab = 1;
      } else if (!!this.two && offset > this.two) {
        this.selectedTab = 2;
      } else if (!!this.three && offset > this.three) {
        this.selectedTab = 3;
      } else if (!!this.four && offset > this.four) {
        this.selectedTab = 4;
      }
    }

    // if (this.settings.app_type == 8 && !this.is_mobile) {
    //   let offset = this.document.getElementById("search").offsetTop;
    //   if (window.pageYOffset > offset) {
    //     this.router.navigate([], {
    //       relativeTo: this.route,
    //       fragment: 'search',
    //       queryParams: this.route.snapshot.queryParams
    //     })
    //   } else {
    //     this.navigateToHome();
    //   }
    // }
  }


  navigateToHome() {
    this.router.navigate([], { relativeTo: this.route, queryParams: this.route.snapshot.queryParams });
  }

  ngOnInit() {
    if(this.settings.enable_service_pickup){
      this.selectedTab = 0;
    }

    this.styleSubscription = this.util.getStyles.subscribe(
      (style: StyleVariables) => {
        this.style = style;
      }
    );

    this.cartSubscription = this.util.getCart.subscribe(cart => {
      if (cart) {
        this.cart = cart;
      }
    });

    this.categorySubscription = this.util.getLanguageCategoryData.subscribe((data) => {
      this.isLoading = true;
      if (data && data.english) {
        if (this.settings.isCustomFlow) {
          const category = data.english.find(c => c.type == this.settings['app_type'] && c.id == this.categroyId);
          if (category) {
            this.seo.updateTitle(`${category.name} | ${GlobalVariable.SITE_NAME}`);
            this.categories = category['sub_category'] || [];
          }
        } else {
          this.categories = data.english;
        }
        this.getHomeData();
        this.getRecent();
      }
    });

    this.locationSubscription = this.util.getUserLocation.pipe(skip(1)).subscribe((location) => {
      if (location) {
        this.data_cache.removeKey(ApiUrl.getSpecialOffers);
        this.data_cache.removeKey(ApiUrl.recentlyViewed);
        this.getHomeData();
        this.getRecent();
        if (this.settings.app_type == 1 && this.settings.is_single_vendor) {
          this.data_cache.removeKey(ApiUrl.getSupplierDetailProduct);
          this.single_vendor.getDetails();
        }
      }
    });
  }

  getHomeData() {
    this.isLoading = true;
    const params: any = {
      languageId: this.util.handler.languageId,
      latitude: this.util.handler.latitude || 0,
      longitude: this.util.handler.longitude || 0
    };
    if (this.settings.isCustomFlow) {
      let categoryId = this.route.snapshot.queryParams['cat_flow_id'];
      params.categoryId = categoryId || this.categroyId;
    }
    this.http.getData(ApiUrl.getSpecialOffers, params, true, !this.settings.isCustomFlow)
      .subscribe(response => {
        if (!!response && response.data) {
          this.homeData = response.data;
        }
        this.isLoading = false;
      }, err => this.isLoading = false);
  }

  getRecent() {
    let params = {
      latitude: this.util.handler.latitude || 0,
      longitude: this.util.handler.longitude || 0,
      languageId: this.util.handler.languageId,
      offset: 0
    }
    this.http.getData(ApiUrl.recentlyViewed, params, true, !this.settings.isCustomFlow)
      .subscribe(response => {
        if (!!response && response.data) {
          let services = response.data.recentActivity;
          this.recentlyViewed = services.map((item) => {
            item['avg_rating'] = Number.parseFloat(item['avg_rating']).toFixed(1);
            item['image'] = item['image_path'];
            item["selectedQuantity"] = 0;
            // if (this.cart.length) {
            //   this.cart.forEach(cartProduct => {
            //     if (cartProduct.productId == item.product_id) {
            //       item['selectedQuantity'] = cartProduct['selectedQuantity'];
            //     }
            //   });
            // }
            if (item['price_type']) {
              item['maxHour'] = item['hourly_price'][item['hourly_price'].length - 1]['max_hour'] - this.settings.interval;
              if (item['discount'] && item['hourly_price'][0]['discount_price']) {
                item['fixed_price'] = item['hourly_price'][0]['discount_price'];
                item['display_price'] = item['hourly_price'][0]['price_per_hour'];
                item["discountPercentage"] = parseFloat((((item.display_price - item.fixed_price) / item.display_price) * 100).toFixed(2));
              } else {
                item['fixed_price'] = item['hourly_price'][0]['price_per_hour'];
              }
            } else {
              this.util.productPriceToFloat(item);
              item["discountPercentage"] = parseFloat((((item.display_price - item.fixed_price) / item.display_price) * 100).toFixed(2));
              item["discount"] = Math.round(item.discountPercentage);
            }
            return item;
          });
        }
      });
  }


  scrollTo(elementId) {
    let element = this.document.getElementById(elementId);
    if(this.settings.enable_sidebar_selection){
      this.selectedTab = elementId
      let headerOffset = 92;
      if(elementId<3){
        headerOffset = 112;
      }
      window.scrollTo({
        top:element.getBoundingClientRect().top + window.scrollY - headerOffset,
        left:0,
        behavior:'smooth'
      });
    } else {
      window.scrollTo({
        top:element.getBoundingClientRect().top + window.scrollY,
        left:0,
        behavior:'smooth'
      });
    }
   
  }

  // navigateToSupplierList(catId: number) {
  //   this.router.navigate(['/', 'supplier', 'supplier-list'], { queryParams: { 'cat_id': catId } });
  // }


  navigateToSupplierList(isQuestion: number, catId: number, subCatId?: number, childCatId?: any, childCat?: any) {

    let n_lvl = 0;
    if (!!childCat && !!childCat.sub_category && childCat.sub_category.length) {
      n_lvl = 1;
    }

    if (this.settings.laundary_service_flow == 1 && this.settings.app_type == 8) {
      this.navigate(catId, n_lvl, subCatId, childCatId);
    } else {
      // this.util.clearLocalData('ques_data');
      // this.util.setCart([]);
      if (isQuestion && !n_lvl) { }
      // this.openQuestions(catId, subCatId, childCatId);
      else
        this.navigate(catId, n_lvl, subCatId, childCatId);
    }
  }

  // openQuestions(catId: number, subCatId?: number, childCatId?: number): void {
  //   const dialogRef = this.dialogService.open(QuestionsComponent, {
  //     width: '60%',
  //     showHeader: false,
  //     transitionOptions: '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
  //     data: {
  //       cat_id: childCatId || subCatId || catId,
  //     }
  //   });

  //   dialogRef.onClose.subscribe((navigate: boolean) => {
  //     if (navigate) {
  //       this.navigate(catId, 0, subCatId, childCatId);
  //     }
  //   });
  // }

  navigate(catId: number, n_lvl: number, subCatId?: number, childCatId?: number): void {
    if (!!this.settings.is_single_vendor) {
      const param_obj = new Object();
      param_obj['agent'] = 1;
      param_obj['subCatId'] = [childCatId ? childCatId : (subCatId ? subCatId : catId)];
      param_obj['supplierId'] = [this.settings.single_vendor_id];
      param_obj['n_lvl'] = n_lvl;
      this.router.navigate(['product-listing', this.categoryName], {
        queryParams: { f: this.util.encryptData(param_obj) }
      });
    } else {
      this.selectedIds = { catId, subCatId, childCatId };
      this.router.navigate(['/supplier', 'supplier-list'], {
        queryParams: {
          'cat_id': catId,
          'subCat_id': subCatId,
          'childCat_id': childCatId,
          'cat_name': this.categoryName,
          'n_lvl': n_lvl
        }
      });
    }
  }
  trackByCategoryFn(id, index) {
    return index;
  }
  trackBySubcatFn(id, index) {
    return index;
  }
  trackByChildCatFn(id, index) {
    return index;
  }

  ngOnDestroy() {
    if (!!this.settingsSubscription) this.settingsSubscription.unsubscribe();
    if (!!this.offerSubscription) this.offerSubscription.unsubscribe();
    if (!!this.styleSubscription) this.styleSubscription.unsubscribe();
    if (!!this.selfPickSubscription) this.selfPickSubscription.unsubscribe();
    if (!!this.locationSubscription) this.locationSubscription.unsubscribe();
    if (!!this.categorySubscription) this.categorySubscription.unsubscribe();
    if (!!this.cartSubscription) this.cartSubscription.unsubscribe();
  }
}
