import { LocalizationPipe } from './../../../../../shared/pipes/localization.pipe';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { UtilityService } from 'src/app/services/utility/utility.service';

@Component({
    selector: 'app-supplier-cat-sorting',
    templateUrl: './supplier-cat-sorting.component.html',
    styleUrls: ['./supplier-cat-sorting.component.scss']
})
export class SupplierCatSortingComponent implements OnInit {

    selectedCatSorting: string = '';

    public catSortValue: number;
    @Input() style: StyleVariables;
    @Input() settings: AppSettings;
    @Input('catShortValue')
    set setCatSortValue(catSortValue: number) {
        this.catSortValue = catSortValue ? catSortValue : 0;
    }
    @Input() showLabel: boolean = true;
    @Input() labelText: string = 'Category by';

    @Output() onCatSort: EventEmitter<number> = new EventEmitter<number>();

    public is_hide_delivery: boolean = false;
    public is_hide_pickup: boolean = false;
    public is_hide_dinin: boolean = false;

    public selected_order_type: number = 0;


    constructor(
        private localization: LocalizationPipe,
        private util: UtilityService
    ) { }

    ngOnInit() {
        if (this.settings.app_type == 8) {
            this.catSortValue = 2;
        }
        // this.setSelectedCatSorting();
        // this.showHideOptions();
        this.getOrderType();
    }

    showHideOptions() {
        if (this.settings.dynamic_order_type_client_wise) {
            if (!this.settings.dynamic_order_type_client_wise_delivery) {
                this.is_hide_delivery = true;
            }
            if (!this.settings.dynamic_order_type_client_wise_pickup) {
                this.is_hide_pickup = true;
            }
            if (!this.settings.dynamic_order_type_client_wise_dinein) {
                this.is_hide_dinin = true;
            }
            if (this.settings.dynamic_order_type_client_wise_delivery) {
                this.selectedCatSorting = "Delivery";
                return;
            }
            if (this.settings.dynamic_order_type_client_wise_pickup) {
                this.selectedCatSorting = "PICK UP";
                return;
            }
            if (this.settings.dynamic_order_type_client_wise_dinein) {
                this.selectedCatSorting = "DININ";
                return;
            }
        }
    }


    setSelectedCatSorting() {
        switch (this.catSortValue) {
            case 0:
                this.settings.app_type != 8 ? (this.selectedCatSorting = 'Delivery') : (this.selectedCatSorting = 'Home Services');
                break;
            case 1:
                this.settings.app_type != 8 ? (this.selectedCatSorting = `${this.localization.transform('selfpickup')}`) : (this.selectedCatSorting = 'On Saloon');
                break;
            case 2:
                this.settings.app_type != 8 ? (this.selectedCatSorting = `${this.localization.transform('dining_table')}`) : (this.selectedCatSorting = 'All');
                break;
            default:
                this.settings.app_type != 8 ? (this.selectedCatSorting = 'Delivery') : (this.selectedCatSorting = 'All');
                break;
        }
    }

    onCatSortBy(value: number) {
        this.catSortValue = value;
        this.setSelectedCatSorting();
        if (this.catSortValue != this.selected_order_type) {
            this.setOrderType(this.catSortValue);
        }
        this.onCatSort.emit(value);
    }


    setOrderType(type?: number) {
        switch (type) {
            case 0:
                this.util.setOrderTypeData("0");
                break;
            case 1:
                this.util.setOrderTypeData("1");
                break;
            case 2:
                this.util.setOrderTypeData("2");
                break;
        }
    }
    getOrderType() {
        this.util.getOrderTypeData.subscribe((res: any) => {
            if (res) {
                this.selected_order_type = (Number)(res);
                this.onCatSortBy(this.selected_order_type);
            }
            else{
                this.onCatSortBy(0);
            }
        })
    }


}
