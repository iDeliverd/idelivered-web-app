
import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";
import { StyleVariables } from "../../../../../core/theme/styleVariables.model";
import { AppSettings } from "../../../../../shared/models/appSettings.model";
import { UtilityService } from "../../../../../services/utility/utility.service";
import { MessagingService } from "../../../../../services/messaging/messaging.service";
import { DialogService } from 'primeng/dynamicdialog';
import { CartService } from '../../../../../services/cart/cart.service';
import { LocalizationPipe } from '../../../../../shared/pipes/localization.pipe';
import { AddOnComponent } from './../../../../../layout/shared/product/components/add-on/add-on.component';
import { TranslateService } from '@ngx-translate/core';
import { GlobalVariable } from './../../../../../core/global';
import { Currency } from 'src/app/shared/models/apiKeys.model';
import { HttpService } from "src/app/services/http/http.service";
import { ApiUrl } from 'src/app/core/apiUrl';
import * as _ from 'underscore';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-cart-suggetion-list',
  templateUrl: './cart-suggetion-list.component.html',
  styleUrls: ['./cart-suggetion-list.component.scss']
})
export class CartSuggetionListComponent implements OnInit, OnDestroy {

  cartSubscription: Subscription;
  
  @Input() products: Array<any>;

  @Input() totalItems: number = 0;

  @Input() darkTheme: boolean = false;

  @Input() style: StyleVariables;
  @Input() settings: AppSettings;

  allProducts: any = [];
  suggestions: any = [];
  cartProductIds: any = [];
  cartSupplierIds: any = [];
  no_data: boolean = false;
  supplier_ids: string = '';

  cart: Array<any> = [];

  decimalQuantityStep: number = GlobalVariable.decimal_quantity_step;

  constructor(
    public util: UtilityService,
    private cartService: CartService,
    private message: MessagingService,
    private dialogService: DialogService,
    private localization: LocalizationPipe,
    private translate: TranslateService,
    public http: HttpService,
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this.util.getCart.subscribe(cart => {
      if (cart) {
        this.cart = cart;
    //     this.cart.forEach(product => {
    //       if (!this.supplier_ids.includes(product.supplier_id)) {
    //         this.supplier_ids += product.supplier_id //  + ','
    //       }

    //     });

    //     if (!!this.supplier_ids) {
    //       this.getSuggestedData();
    //     }
      }
    });
    // this.products.forEach(ele => {
    //   ele.freeQuantity = 0;
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cartSubscription = this.util.getCart.subscribe(cart => {
      if (cart) {
        this.cart = cart;
      }
    });
    const check: any = changes
    // .products['currentValue'];
    
    if (!!check.totalItems) {
      this.cartProductIds = [];
      this.cartSupplierIds = [];
      this.cart.forEach(product => {
        if (!this.cartSupplierIds.includes(product.supplier_id)) {
          // this.supplier_ids += product.supplier_id //+ ','

          this.cartSupplierIds.push(parseInt(product.supplier_id));
        }
        this.cartProductIds.push(parseInt(product.productId));
      });

      if (!!this.cartSupplierIds && this.cartSupplierIds.length) {
        this.getSuggestedData();
      }
    }
  }


  openAddOnDialog(product) {
    const dialogRef = this.dialogService.open(AddOnComponent, {
      header: product['name'],
      width: '50%',
      showHeader: false,
      // contentStyle: { "max-height": "350px", "overflow": "auto" },
      transitionOptions: '600ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      data: {
        product: Object.assign({}, product),
        addOnItems: product['adds_on']
      }
    })

    dialogRef.onClose.subscribe(() => { });
  }


  addProduct(product) {
    this.cartService.addToCart(product);
    this.getSuggestedData();
  }

  add(product: any, index: any): void {
    if (this.settings.enable_in_out_network) {
      if (product.is_out_network) {
        if (product.selectedQuantity >= 1) {
          this.message.alert('info', this.translate.instant(`${this.localization.transform('product_inventory_limit')}`));
          return
        }
      }
    }
    if (product['customization'] && product['customization'].length) {
      return this.openAddOnDialog(product);
    } else {
      if (product.selectedQuantity >= (Number(product.quantity) - Number(product.purchased_quantity))) {
        this.message.alert('info', this.translate.instant(`${this.localization.transform('product_inventory_limit')}`));
        return;
      }
      if (product['price_type']) {
        product.selectedQuantity += product.duration / this.settings.interval;
        this.cartService.calculateProductHourlyPrice(product);
      } else {
        if (this.settings.is_decimal_quantity_allowed == 1) {
          this.products[index].selectedQuantity = this.cartService.decimalRoundOff(this.products[index].selectedQuantity + this.decimalQuantityStep);
        } else {
          this.products[index].selectedQuantity++;
        }
      }
      this.setCart();
    }
  }

  mins(product: any, index: any) {
    const minQty: number = product['price_type'] ? product.duration / this.settings.interval : (this.settings.is_decimal_quantity_allowed == 1 ? this.decimalQuantityStep : 1);
    if (product.selectedQuantity > minQty) {
      if (product['customization'] && product['customization'].length) {
        return this.openAddOnDialog(product);
      } else {
        if (product['price_type']) {
          product.selectedQuantity -= product.duration / this.settings.interval;
          this.cartService.calculateProductHourlyPrice(product);
        } else {
          if (this.settings.is_decimal_quantity_allowed == 1) {
            this.products[index].selectedQuantity = this.cartService.decimalRoundOff(this.products[index].selectedQuantity - this.decimalQuantityStep);
          } else {
            this.products[index].selectedQuantity--;
          }
        }
        this.setCart();
      }
    } else {
      this.message.confirm(`${this.translate.instant('Remove This')} ${this.localization.transform('product')}`, `${this.translate.instant('This')} ${this.localization.transform('product')} ${this.translate.instant('Will Get Removed From The Cart')}.`, true)
        .then(result => {
          if (result.value) {
            if (this.settings.is_decimal_quantity_allowed == 1) {
              this.products[index].selectedQuantity = this.cartService.decimalRoundOff(this.products[index].selectedQuantity - this.decimalQuantityStep);
            } else {
              this.products[index].selectedQuantity -= minQty;
            }
            if (this.products[index].selectedQuantity == 0) {
              this.products.splice(index, 1);
            }
            this.util.clearLocalData('ques_data');
            this.setCart();
          }
        });
    }
  }

  updateCustomizationQuantity($event: any, productIndex: any) {
    const custId = $event.id;
    const quantity = $event.value;
    const product = this.products[productIndex];
    if (quantity > 0 && product.selectedQuantity >= (Number(product.quantity) - Number(product.purchased_quantity))) {
      this.message.alert('info', this.translate.instant(`${this.localization.transform('product_inventory_limit')}`));
      return;
    }
    let item = product.customization.find(item => item.id == custId);

    let qty_to_set = 0;
    if (this.settings.is_decimal_quantity_allowed == 1) {
      let calculated_quantity = 0;
      if ($event.remove) {
        calculated_quantity = item.quantity + quantity;
      } else {
        calculated_quantity = item.quantity + (this.decimalQuantityStep * quantity);
      }
      qty_to_set = this.cartService.decimalRoundOff(calculated_quantity);
    } else {
      qty_to_set = item.quantity + quantity;
    }

    if (qty_to_set <= 0) {
      // let _addons = product.customization.filter(
      //   item => item.quantity > 0
      // );
      // if (_addons.length < 1) {
      this.removeFromCart(productIndex, true, custId);
      // } else {
      //   this.setProductCart(product);
      //   // this.totalPrice = this.cartService.calulateProductPrice(this.product);
      // }
    } else {
      item.quantity = qty_to_set;
      this.setProductCart(product);
      // this.totalPrice = this.cartService.calulateProductPrice(this.product);
    }
  }

  setProductCart(product: any) {
    this.cartService.addToCart(product);
  }

  setCart(): void {
    this.util.setCart(this.products);
  }

  removeFromCart(index: any, custom?: boolean, custId?: any) {
    this.message
      .confirm(`${this.translate.instant('Remove This' + ' ' + this.localization.transform('product'))}`, `${this.translate.instant('This' + ' ' + this.localization.transform('product'))} ${this.translate.instant('Will Get Removed From The Cart')}.`, true)
      .then(data => {
        if (data.value) {
          if (custom) {
            let product = this.products[index];
            let ind = product.customization.findIndex(item => item.id == custId);
            if (ind > -1) {
              if (product.customization.length > 1) {
                product.selectedQuantity = product.selectedQuantity - product.customization[ind].quantity;
                product.customization.splice(ind, 1);
              } else {
                this.products.splice(index, 1);
              }
            }
          } else {
            this.products.splice(index, 1);
          }
          this.setCart();
          this.util.clearLocalData('ques_data');
        }
      });
  }

  getSuggestedData() {
    let params = {
      limit: 10,
      offset: 0,
      latitude: this.util.handler.latitude,
      longitude: this.util.handler.longitude,
      languageId: this.util.handler.languageId,
      supplier_id: JSON.stringify(this.cartSupplierIds), // parseInt(this.supplier_ids),
      product_id: JSON.stringify(this.cartProductIds)
    }
    this.suggestions = [];

    this.http.getData(ApiUrl.getSuggetion, params)
      .subscribe(response => {
        if(response.data) {
          this.allProducts = response.data.product;
          this.allProducts.forEach(data => {

            data.value.map(product => {
              this.suggestions.push(this.updateProduct(product));
            });
            // }
          });
        }
        // this.suggestions = this.allProducts.slice();

        if (this.suggestions.length == 0) {
          this.no_data = true;
        } else {
          this.no_data = false;
        }
      })
  }

  updateProduct(product) {
    product['avg_rating'] = Number.parseFloat(product['avg_rating']).toFixed(1);
    if (product.display_price != product.fixed_price) {
      product["discount"] = Math.round(
        ((product.display_price - product.fixed_price) / product.display_price) * 100
      );
    }
    product["selectedQuantity"] = 0;
    product["customization"] = [];
    if (product.quantity > 0 && product.purchased_quantity < product.quantity) {
      product['isOutOfStock'] = false;
    } else {
      product['isOutOfStock'] = true;
    }
    // if (this.cart.length) {
    //     this.cart.forEach(cartProduct => {
    //         if (cartProduct.productId == product.product_id) {
    //             product['selectedQuantity'] = cartProduct['selectedQuantity'];
    //             product['customization'] = cartProduct['customization'];
    //         }
    //     });
    // }
    this.util.productPriceToFloat(product);
    product["discount"] = Math.round(((product.display_price - product.fixed_price) / product.display_price) * 100);

    if (this.settings.loyality_discount_on_product_listing == 1) {
      if (!!product['perProductLoyalityDiscount']) {
        product['isProductLoyalityDiscount'] = 1;
        product.fixed_price = product.fixed_price - (product['perProductLoyalityDiscount'] || 0);
      } else {
        product['isProductLoyalityDiscount'] = 0;
      }
    }

    return product;
  }

  trackByProductsFn(id, index) {
    return index;
  }
  trackByProduct2Fn(id, index) {
    return index;
  }
  ngOnDestroy(): void { }
}

