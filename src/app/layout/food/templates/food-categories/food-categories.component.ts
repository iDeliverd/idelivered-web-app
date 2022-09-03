import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { StyleVariables } from 'src/app/core/theme/styleVariables.model';
import { AppSettings } from 'src/app/shared/models/appSettings.model';
import { GlobalVariable } from 'src/app/core/global';
import { WINDOW } from "./../../../../services/window/window.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-categories',
  templateUrl: './food-categories.component.html',
  styleUrls: ['./food-categories.component.scss']
})
export class FoodCategoriesComponent implements OnInit {

  @Input() homeCategoryList: any = [];
  @Input() foodCategoryList: any
  @Input() style: StyleVariables;
  @Input() settings: AppSettings;
  @Input() selectedCategory: any = {}
  @Output() categorySelect = new EventEmitter<any>();

  currentUrl: string = "";

  slideConfig = {
    "slidesToShow": 10,
    "slidesToScroll": 1,
    "dots": false,
    "arrows": false,
    "infinite": false,
    "autoplay": true,
    "autoplaySpeed": 3000
  };
  slideConfig1 = {
    "slidesToShow": 8,
    "slidesToScroll": 1,
    "dots": false,
    "arrows": false,
    "infinite": false,
    "autoplay": true,
    "autoplaySpeed": 3000
  };


  constructor(
    @Inject(WINDOW) public window: Window,
    private router: Router,
    private route: ActivatedRoute

  ) {

  }

  ngOnInit() {
    if (this.settings.selected_template == 2) {
      this.slideConfig.slidesToShow = GlobalVariable.IS_MOBILE ? 1 : 3;
    }
    if (this.settings.selected_template == 4 && this.settings.app_type == 1) {
      this.slideConfig.slidesToShow = 3
    }

    this.checkWidth();
    this.checkUrl();

  }

  checkWidth() {
    if (screen.width <= 768 && screen.width >= 600) {
      this.slideConfig.slidesToShow = 4;
      this.slideConfig1.slidesToShow = 4;
    }
    if (screen.width <= 600) {
      this.slideConfig.slidesToShow = 3;
      this.slideConfig1.slidesToShow = 3;
    }
  }

  checkUrl() {
    this.currentUrl = this.router.url;
  }

  trackByHomeCatFn(id, index) {
    return index;
  };

  onCategorySelect(category) {
    this.categorySelect.emit(category);
  }
}
