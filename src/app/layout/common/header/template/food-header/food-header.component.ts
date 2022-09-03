import { UtilityService } from './../../../../../services/utility/utility.service';
import { ThemeService } from './../../../../../services/theme/theme.service';
import { Router } from '@angular/router';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../../../core/theme/styleVariables.model';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GlobalVariable } from 'src/app/core/global';
import { WINDOW } from "./../../../../../services/window/window.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-header',
  templateUrl: './food-header.component.html',
  styleUrls: ['./food-header.component.scss']
})
export class FoodHeaderComponent implements OnInit {

  sidenav: 0 | 1 | 2 = 0;

  @Input() style: StyleVariables;
  @Input() showSearchbar: boolean = false;
  @Input() settings: AppSettings;
  @Input() loggedIn: boolean = false;
  @Input() openAuth: boolean = false;
  @Input() userData: any;
  @Input() fix_search: boolean = false;
  @Input() langInput: any;
  @Input() isNavigating: boolean = false;
  @Input() isNavFixed: boolean = false;

  @Input() isHomepage: boolean = false;
  @Input() userWalletBalance: number = 0;

  @Output() authType: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() triggerAuthModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public whatsTrending: string = "What's Trending";

  site_name: string = GlobalVariable.SITE_NAME;
  client_code: string = GlobalVariable.UNIQUE_ID;
  appLink: any = {};



  categorySubscription: Subscription;
  categories: Array<any> = [];
  homeCategoryList: Array<any> = [];

  constructor(
    public router: Router,
    private theme: ThemeService,
    private util: UtilityService,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.appLink = {
      android: this.settings.android_app_url,
      ios: this.settings.ios_app_url,
      android_agent: this.settings.agent_android_app_url,
      ios_agent: this.settings.agent_ios_app_url
    }

    this.categorySubscription = this.util.getLanguageCategoryData.subscribe((data) => {
      if (data && data.english) {
        this.categories = data.english;
        if (this.settings.isCustomFlow) {
          // let categoryId = this.route.snapshot.queryParams['cat_flow_id'];
          // if (categoryId) {
          //   let category = this.categories.find(c => c.type == this.settings.app_type && categoryId == c.id);
          //   if (category) this.homeCategoryList = category.sub_category;
          // }
        } else {
          this.homeCategoryList = this.categories;
        }
      }
    })
  }

  openAuthModal(type: string) {
    this.openAuth = true;
    this.triggerAuthModal.emit(true);
    this.authType.emit(type);
  }

  onLogo() {
    this.router.navigate(['']);
    this.util.goToTop();
  }

  setTextColor() {
    var color = "";
    if (this.settings.is_custom_category_template === '1') {
      return color = "#fff";
    }
    else {
      return color = this.style.topHeaderTextColor || this.style.headerTextColor
    }
  }
}
