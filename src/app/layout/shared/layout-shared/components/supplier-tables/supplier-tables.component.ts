import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ApiUrl } from '../../../../../core/apiUrl';
import { MessagingService } from '../../../../../services/messaging/messaging.service';
import { HttpService } from '../../../../../services/http/http.service';
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { AppSettings } from '../../../../../shared/models/appSettings.model';
import { PaginationModel } from "./../../../../../shared/models/pagination.model";
import * as moment from 'moment';

@Component({
    selector: 'app-supplier-tables',
    templateUrl: './supplier-tables.component.html',
    styleUrls: ['./supplier-tables.component.scss']
})
export class SupplierTablesComponent implements OnInit {
    supplierTables: Array<any> = [];
    selectedTable: any = {
        id: 0,
        qr_code: null,
        seating_capacity: 0,
        supplier_id: 0,
        table_name: '',
        table_number: '',
        multi_tables_data: [],
    };

    public dataLoaded: boolean;
    pagination: PaginationModel;

    @Input() style: StyleVariables;
    @Input() settings: AppSettings;
    @Input() tableRequestData: any = {};

    @Output() onTableSelect: EventEmitter<any> = new EventEmitter<any>();

    public tableRequest_params: {} = {};
    hover: any = {
        index: -1,
        tab: null
    };

    constructor(
        private message: MessagingService,
        private http: HttpService
    ) {
        this.pagination = new PaginationModel();
    }

    ngOnInit() {
        this.getSupplierTables();
    }


    getSupplierTables() {
        this.tableRequest_params['supplier_id'] = this.tableRequestData.supplier_id;
        this.tableRequest_params['branch_id'] = this.tableRequestData.branch_id;
        this.tableRequest_params['limit'] = this.pagination.perPage;
        this.tableRequest_params['offset'] = this.pagination.offset;
        this.tableRequest_params['slot_id'] = this.tableRequestData.slot_id;
        this.tableRequest_params['time'] = moment(this.tableRequestData.time , "h:mm A").format("HH:mm:ss");
        this.tableRequest_params['date'] = moment(this.tableRequestData.date).format('YYYY-MM-DD');
        this.http.getData(ApiUrl.getSupplierTableList, this.tableRequest_params).subscribe((response: any) => {
            if (!!response && response.data) {
                this.dataLoaded = true;
                this.supplierTables = response.data.list;
                this.pagination.count = response.data.count;
                this.supplierTables.forEach(element => {
                    element['checked'] = false;
                });
            }
        })
    }

    selectTable(table: any) {
        this.selectedTable.id = table.id;
        this.selectedTable.qr_code = table.qr_code
        this.selectedTable.seating_capacity = table.seating_capacity;
        this.selectedTable.supplier_id = table.supplier_id;
        this.selectedTable.table_name = table.table_name;
        this.selectedTable.table_number = table.table_number;

        if (this.settings.enable_multiple_table_booking_at_once) {
            table.checked = !table.checked;
            var findTable = this.supplierTables.find(x => x.id == table.id);
            this.supplierTables.forEach(element => {
                if (element.id == findTable.id) {
                    element['checked'] = table.checked;
                    if (table.checked) {
                        this.selectedTable['multi_tables_data'].push(table);
                    }
                    else {
                        const index = this.selectedTable['multi_tables_data'].findIndex(z => z.id == table.id);
                        if (index > -1) {
                            this.selectedTable['multi_tables_data'].splice(index, 1);
                        }
                    }
                }
            });
        }
        else {
            delete this.selectedTable['multi_tables_data'];
        }
    }

    proceedWithTable(withTable: boolean) {
        if (this.settings.enable_multiple_table_booking_at_once) {
            if (!this.selectedTable['multi_tables_data'] || !this.selectedTable['multi_tables_data'].length && withTable) {
                this.message.toast('info', 'Please select table');
                return;
            }
        }
        if (!this.selectedTable && withTable) {
            this.message.toast('info', 'Please select table');
            return;
        } else {
            if (withTable) {
                this.onTableSelect.emit(this.selectedTable);
            }
            else {
                this.onTableSelect.emit(false);
            }
        }
    }
    pageChange(event) {
        this.pagination.currentPage = event;
        this.pagination.offset = event > 1 ? (event - 1) * this.pagination.perPage : 0;
        this.getSupplierTables();
    }
    trackBySupplierTablesFn(id, index) {
        return index;
    }
}