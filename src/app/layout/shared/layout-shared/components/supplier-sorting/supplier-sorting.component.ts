import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppSettings } from 'src/app/shared/models/appSettings.model';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { Subscription } from 'rxjs';
import { UtilityService } from './../../../../../services/utility/utility.service';

@Component({
  selector: 'app-supplier-sorting',
  templateUrl: './supplier-sorting.component.html',
  styleUrls: ['./supplier-sorting.component.scss']
})
export class SupplierSortingComponent implements OnInit {

  selectedSorting: string = '';

  @Input() style: StyleVariables;
  @Input() sortValue: number = 0;
  @Input() showLabel: boolean = true;
  @Input() labelText: string = 'Sort by';
  settings: any;
  settingsSubscription: Subscription;


  @Output() onSort: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private util: UtilityService,
  ) {
   }

  ngOnInit() {
    this.settingsSubscription = this.util.getSettings.subscribe(
      (settings: AppSettings) => {
        if (settings) {
          this.settings = settings;
        }
      }
    );
    
    if(this.settings.app_type == 8){
      this.sortValue = 1;
    }
    this.setSelectedSorting();
  }

  setSelectedSorting() {
    switch (this.sortValue) {
      case 0:
        this.selectedSorting = 'New';
        break;
      case 1:
        this.selectedSorting = 'Distance';
        break;
      case 2:
        this.selectedSorting = 'Rating';
        break;
      case 3:
        this.selectedSorting = 'Alphabetically';
        break;
      case 5:
        this.selectedSorting = 'Open';
        break;
      case 6:
        this.selectedSorting = 'Closed';
        break;
      default:
        this.selectedSorting = 'New';
    }
  }

  onSortBy(value: number) {
    this.sortValue = value;
    this.setSelectedSorting();
    this.onSort.emit(value);
  }

  ngOnDestroy() {
    if (!!this.settingsSubscription) this.settingsSubscription.unsubscribe();
  }

}
