import { UtilityService } from './../../../../../services/utility/utility.service';
import { AppSettings } from './../../../../../shared/models/appSettings.model';
import { ApiUrl } from './../../../../../core/apiUrl';
import { HttpService } from './../../../../../services/http/http.service';
import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { StyleVariables } from '../../../../../core/theme/styleVariables.model';
import { GlobalVariable } from './../../../../../core/global';

declare const $: any;
@Component({
  selector: 'app-order-review-extra-product',
  templateUrl: './order-review-extra-product.component.html',
  styleUrls: ['./order-review-extra-product.component.scss']
})
export class OrderReviewExtraProductComponent implements OnInit {

  // close() {
  //   this.dialogRef.close();
  // }


  @Input() style: StyleVariables;
  @Input() details: any = {};

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @Output() closeExtraProductViewer = new EventEmitter<boolean>();
  settings: AppSettings;

  extra_products: any = [];
  currency = '';
  selectedObj: any = {};
  selectedExtraData: any = {};
  selectedProducts: any = [];
  selectedIds: any = [];
  totalAmount = 0;

  isLoading: boolean = true;

  constructor(private util: UtilityService,
    private http: HttpService) {
    this.currency = GlobalVariable.CURRENCY;
  }
  ngOnInit() {
    this.util.getSettings.subscribe(settings => {
      if (settings) {
        this.settings = settings;
      }
    });
    this.openModal();
    
    if (!!this.details) {
      this.extra_products = this.details.extra_product;
      this.extra_products.forEach(col => {
        // this.selectedProducts.push({ id: col.id , quantity: col.quantity })
        this.totalAmount += (col.quantity * col.price);
      })
      this.fetchSelectedProducts();
      
      this.isLoading = false;
    } 

  }

  fetchSelectedProducts() {
    this.isLoading = true;
    let selected_extra_product = this.details.extra_product;
    for (let i = 0; i < selected_extra_product.length; i++) {
      let col = selected_extra_product[i];
      this.selectedObj[col.extra_product_id] = col.quantity;
      this.selectedIds.push(col.extra_product_id);
      
      this.selectedProducts.push({
        extra_product_id:col.extra_product_id,
        quantity:col.quantity,
        serial:[]
      })
      for(let j =0; j<col.serial.length; j++){
        let val = col.serial[j];
        this.selectedProducts[i].serial.push({
          extra_product_serial_id  : val.extra_product_serial_id,
        // quantity : val.quantity,
        
        })
      }
    }

    if (this.selectedIds.length) {
      // this.getExtraProductList();
    } else {
      this.isLoading = false;
    }
  }

  close() {
    this.closeModal.nativeElement.click();
    this.closeExtraProductViewer.emit(false);
  }

  openModal() {
    $("#auth").modal('show');
  }

  submitExtraProductList(status) {
    let obj = {
      status,
      id: parseInt(this.details.id),
      orderId: parseInt(this.details.orderId),
      order_updated_by: this.details.order_updated_by,
    }
    if(status == 1) {
      obj['extra_product_price'] = this.totalAmount;
      obj['extra_products']= this.selectedProducts;
    }

    this.http.putData(ApiUrl.updateOrderWithExtraProduct, obj)
      .subscribe(response => {
        this.close();
        this.isLoading = false;
      });
  }


}
