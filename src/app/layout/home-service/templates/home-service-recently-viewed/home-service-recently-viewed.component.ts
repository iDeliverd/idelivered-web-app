import { UtilityService } from './../../../../services/utility/utility.service';
import { UserService } from './../../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { CartService } from './../../../../services/cart/cart.service';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { AppSettings } from './../../../../shared/models/appSettings.model';
import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { AddOnComponent } from './../../../shared/product/components/add-on/add-on.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-home-service-recently-viewed',
  templateUrl: './home-service-recently-viewed.component.html',
  styleUrls: ['./home-service-recently-viewed.component.scss']
})
export class HomeServiceRecentlyViewedComponent implements OnInit, OnChanges, OnDestroy {

  @Input() settings: AppSettings;
  @Input() style: StyleVariables;
  @Input() isLoading: boolean;
  @Input() recentlyViewed: Array<any> = [];

  userSubscription: Subscription;
  cartSubscription: Subscription;
  loggedIn: boolean = false;

  cart: Array<any> = [];


  constructor(
    private util: UtilityService,
    private cartService: CartService,
    private user: UserService,
    public dialogService: DialogService) { }

  ngOnInit() {

    this.cartSubscription = this.util.getCart.subscribe(cart => {
      if (cart) {
        this.cart = cart;
        this.mapProduct(this.recentlyViewed);
      }
    });

    this.userSubscription = this.user.currentUser
    .subscribe(user => {
      if (!!user && user['access_token']) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }


  mapProduct(products) {
    this.recentlyViewed = products.map((item) => {

      if (this.cart.length) {
        this.cart.forEach(cartProduct => {
          if (cartProduct.productId == item.product_id) {
            item['selectedQuantity'] = cartProduct['selectedQuantity'];
          }
        });
      }
      return item;
    });
  }

  ngOnChanges() {    
    if(this.settings.isCustomFlow) {
      let category = this.util.getLocalData('selected_category', true);
      this.recentlyViewed =this.recentlyViewed.filter(el => el.categories_id == category.id);
    }
  }

  addProduct(product) {
    // this.cartService.addToCart(product, this.recentlyViewed);
      
    if (product.adds_on && product.adds_on.length && this.settings.enable_services_customize_flow == 1) {
      this.openAddOnDialog(product);
    } else {
      this.cartService.addToCart(product, this.recentlyViewed);
      return;
    }
  }

  removeProduct(product) {
    this.cartService.removeFromCart(product)
  }

  openAddOnDialog(product) {
    let item = this.cart.find(p => p.productId == product.product_id);
    if (item) {
      product.customization = item.customization;
    }

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

    dialogRef.onClose.subscribe(() => {
      if (product.customization && product.customization.length) {
        delete product.customization;
      }
    })
  }
  
  trackByRecentlyViewedFn(id, index) {
    return index;
  };
  ngOnDestroy() {
    if(!!this.userSubscription) this.userSubscription.unsubscribe();
  }
}
