import { SeoService } from './../../../../services/seo/seo.service';
import { skip } from 'rxjs/operators';
import { ApiUrl } from '../../../../core/apiUrl';
import { GlobalVariable } from './../../../../core/global';
import { DataCacheService } from './../../../../services/data-cache/data-cache.service';
import { UtilityService } from './../../../../services/utility/utility.service';
import { HttpService } from './../../../../services/http/http.service';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { AppSettings } from './../../../../shared/models/appSettings.model';
import { Component, OnInit, ViewChild, Inject, HostListener, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../../../services/window/window.service';

@Component({
  selector: 'app-service-suppliers',
  templateUrl: './service-suppliers.component.html',
  styleUrls: ['./service-suppliers.component.scss']
})
export class ServiceSuppliersComponent implements OnInit {
  sortBy: number = 1;
  catSortValue: number;

  homeData: any;

  @Input() isLoading: boolean = false;
  @Input() all_supplier: number = 1;

  style: StyleVariables;
  styleSubscription: Subscription;
  settingsSubscription: Subscription;
  currency: string = "";
  supplier: any;
  showSupplier: boolean = false;
  suppliers: Array<any> = [];
  settings: AppSettings;
  parentIndex: number = -1;
  childIndex: number = -1;

  siteName: string = '';

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
      this.style = new StyleVariables();
    }

  ngOnInit() {
    if(this.all_supplier == 1)
    this.getFilteredSupplierData();
    else{
      this.getTopFilteredSupplierData();
    }

    this.styleSubscription = this.util.getStyles.subscribe(
      (style: StyleVariables) => {
        this.style = style;
      }
    );

    this.settingsSubscription = this.util.getSettings.subscribe(
      (settings: AppSettings) => {
        if (settings) {
          this.settings = settings;
        }
      }
    );
  }

  onSortBy(sortBy: number){
    this.sortBy = sortBy;
    this.getFilteredSupplierData();
  }
  onCatSortBy(value: number) {
    this.catSortValue = value;
    this.getFilteredSupplierData();
}
  getFilteredSupplierData() {
    this.isLoading = true;
    const params: any = {
      // languageId: this.util.handler.languageId,
      latitude: this.util.handler.latitude || 0,
      longitude: this.util.handler.longitude || 0,
      // search: "",
      service_pickup: (this.catSortValue || this.catSortValue == 0) ? this.catSortValue : 2,
      limit:10,
      offset:0,
      orderby: this.sortBy == 0 ? "DESC" : "ASC"
    };
    this.http.postData(ApiUrl.getFilteredSupplierList, params, true)
      .subscribe(response => {
        if (!!response && response.data) {
          this.homeData = response.data.supplierList;
        }
        this.isLoading = false;
      }, err => this.isLoading = false);
  }

  getTopFilteredSupplierData(){
    this.isLoading = true;
    const params: any = {
      // languageId: this.util.handler.languageId,
      latitude: this.util.handler.latitude || 0,
      longitude: this.util.handler.longitude || 0,
      search: "",
      sort_by: 0
    };
    this.http.postData(ApiUrl.getTopFilteredSupplierList, params, true)
      .subscribe(response => {
        if (!!response && response.data) {
          this.homeData = response.data.supplierList;
        }
        this.isLoading = false;
      }, err => this.isLoading = false);
  }

}
