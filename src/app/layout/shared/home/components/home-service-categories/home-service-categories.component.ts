import { UtilityService } from './../../../../../services/utility/utility.service';
import { CategoryFilter } from './../../../../../shared/models/categoryFilter';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { StyleVariables } from './../../../../../core/theme/styleVariables.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { QuestionsComponent } from '../../../layout-shared/components/questions/questions.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home-service-categories',
  templateUrl: './home-service-categories.component.html',
  styleUrls: ['./home-service-categories.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeServiceCategoriesComponent implements OnInit {

  categoryName: string = '';

  @Input() style: StyleVariables = new StyleVariables();
  @Input() settings: AppSettings;
  @Input() categories: Array<any> = [];
  @Input() selectedIds: CategoryFilter = new CategoryFilter();

  public isDefaultCatTemp: boolean = true;

  constructor(
    private util: UtilityService,
    private router: Router,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    if (this.settings.enable_wala_theme) {
      if (this.router.url == '/') {
        this.isDefaultCatTemp = false;
      }
      else {
        this.isDefaultCatTemp = true;
      }
    }
  }

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
      if (isQuestion && !n_lvl)
        this.openQuestions(catId, subCatId, childCatId);
      else
        this.navigate(catId, n_lvl, subCatId, childCatId);
    }
  }

  openQuestions(catId: number, subCatId?: number, childCatId?: number): void {
    const dialogRef = this.dialogService.open(QuestionsComponent, {
      width: '60%',
      showHeader: false,
      transitionOptions: '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      data: {
        cat_id: childCatId || subCatId || catId,
      }
    });

    dialogRef.onClose.subscribe((navigate: boolean) => {
      if (navigate) {
        this.navigate(catId, 0, subCatId, childCatId);
      }
    });
  }

  navigate(catId: number, n_lvl: number, subCatId?: number, childCatId?: number): void {
    if (!!this.settings.is_single_vendor || !!this.settings.hide_supplier_detail) {
      const param_obj = new Object();
      param_obj['agent'] = 1;
      param_obj['subCatId'] = [childCatId ? childCatId : (subCatId ? subCatId : catId)];
      param_obj['n_lvl'] = n_lvl;
      if (!this.settings.hide_supplier_detail) {
        param_obj['supplierId'] = [this.settings.single_vendor_id];
      }
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


  viewMore() {
    this.navigateToSupplierList(0, this.categories[0].id);
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
}
