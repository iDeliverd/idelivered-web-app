import { CartService } from './../../../../services/cart/cart.service';
import { SeoService } from './../../../../services/seo/seo.service';
import { AppSettings } from './../../../../shared/models/appSettings.model';
import { ApiUrl } from './../../../../core/apiUrl';
import { UtilityService } from './../../../../services/utility/utility.service';
import { UserService } from './../../../../services/user/user.service';
import { HttpService } from './../../../../services/http/http.service';
import { StyleVariables } from './../../../../core/theme/styleVariables.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import _ from 'lodash';
import { GlobalVariable } from './../../../../core/global';
import { trigger, transition, style, animate } from '@angular/animations';
import { FcmService } from './../../../../services/fcm/fcm.service';
import { MessagingService } from '../../../../services/messaging/messaging.service';
import { LocalizationPipe } from '../../../../shared/pipes/localization.pipe';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseAnalyticsService } from '../../../../services/firebase-analytics/firebase-analytics.service';
import { LocationService } from '../../../../services/location/location.service';
import { Currency } from 'src/app/shared/models/apiKeys.model';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderReviewExtraProductComponent } from '../components/order-review-extra-product/order-review-extra-product.component';
import { DatePipe } from '@angular/common';

declare const $;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private getDataSubscribe: Subscription;
  styleSubscription: Subscription;
  settingsSubscription: Subscription;
  firebaseSubscription: Subscription;
  public userSubscription: Subscription;
  public currentUser: any;


  style: StyleVariables;
  orderIds: Array<any> = [];
  orderHistory: Array<any> = [];
  selectedOrder: number = 0;
  currency: string = '';
  settings: AppSettings
  showLine: any = {
    isPlaced: false,
    isShipped: false,
    isNear: false,
    isDelivered: false
  }
  status: Array<any> = [];

  isLoading: boolean = true;

  isPayOnline: boolean = false;
  refundToWallet: 0 | 1 = 0;
  productToReturn: any;
  isReturnProduct = false;
  returnProductReason: string = '';
  isEditOrder: boolean = false;
  isAddItems: boolean = false;
  editOrder: any;

  dhlData: any = '';
  userOrderStatus: number = 0;

  public openImageViewer: boolean;
  public imageToView: string;
  public openVideoPlayer: boolean;
  public videoToPlay: string;

  public total_delivery_charges: number = 0;

  public selected_currency: Currency = new Currency();

  public is_special_instruction: boolean = false;
  public special_instructions: string = '';

  freeProductQuantity = 0;
  expectedDeliveryTime: string;
  public openExtraProductUpdate: boolean;
  extra_product_details: any = {};
  payOnlineOrder: any = {};
  public isRatingReviews: boolean = false;
  public ratingReviews: any = [];


  counter = 300;
  interval = 1000;
  count: number = 0;
  public is_waiting_for_cancel: boolean = false;

  hideRefundPaymentOptions = false;
  public returnCategoryList: any = [];
  public returnCategory: string = "";
  updateCounter: string = "";
  public special_instructions_array: any = [];
  orderCreatedOn: string = "";
  orderDeliveredOn: string = "";

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private user: UserService,
    public util: UtilityService,
    private cartService: CartService,
    private firebaseService: FcmService,
    private router: Router,
    private localization: LocalizationPipe,
    private message: MessagingService,
    private seo: SeoService,
    private translate: TranslateService,
    private firebaseAnalyticsSvc: FirebaseAnalyticsService,
    private location: LocationService,
    private dialogService: DialogService,
    private datePipe: DatePipe
  ) {

    this.style = new StyleVariables();
    this.currency = GlobalVariable.CURRENCY;

  }

  ngOnInit() {
    this.seo.updateTitle(`${this.localization.transform('order')} Details | ${GlobalVariable.SITE_NAME}`);

    this.styleSubscription = this.util.getStyles
      .subscribe(style => {
        this.style = style;
      });

    this.settingsSubscription = this.util.getSettings
      .subscribe((settings: AppSettings) => {
        if (settings) {
          this.settings = settings;
        }
      });

    if (this.settings.disable_cancel_order_after_admin_provided_time == 1) {
      this.counter = this.settings.max_cancellation_waiting_time;
    }

    this.subscribeRoute();
    this.makeSubscribe();
    this.getCurrentUser();
    this.translateThroughMoment()

    if (this.settings.is_multicurrency_enable) {
      this.getCurrency();
    }
  }

  getCurrentUser() {
    this.userSubscription = this.user.currentUser
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  makeSubscribe() {
    this.getDataSubscribe = this.util.callGetData.
      subscribe((data) => {
        if (data && !this.getDataSubscribe) {
          this.getDetail();
        }
      });

    this.firebaseService.currentMessage.subscribe((message) => {
      console.log('wdwedewdw', message);

      if (message && this.orderHistory && this.orderHistory.length) {
        if (message.data.orderId == this.orderHistory[this.selectedOrder].order_id) {
          this.getDetail();
        }

      }
    })
  }

  /********* Route Subscription **********/
  subscribeRoute() {
    this.subscription = this.route.queryParams
      .subscribe(params => {
        this.orderIds = params.orderId;
      });
  }

  getDetail() {
    this.isLoading = true;
    let obj = {
      languageId: parseInt(this.util.handler.languageId),
      accessToken: this.user.getUserToken,
      orderId: this.orderIds,
      latitude: this.util.handler.latitude,
      longitude: this.util.handler.longitude
    };
    this.http.postData(ApiUrl.orders.getOrderDetail, obj)
      .subscribe(response => {
        if (!!response && response.data) {
          this.orderHistory = response.data.orderHistory;
          this.orderHistory.forEach(element => {
            this.total_delivery_charges += element.delivery_charges;
          });

          if (this.orderHistory) {

            if (this.settings.enable_cancel_order_after_confirmation) {
              if ([1,3,10,11].includes(this.orderHistory[0].status)) {
                  if (this.settings.disable_cancel_order_after_admin_provided_time == 1) {
                    this.count = this.settings.max_cancellation_waiting_time;

                    let orderConfirmDate = (this.orderHistory[this.selectedOrder].confirmed_on);
                    var offsetAdd = this.orderHistory[this.selectedOrder].zone_offset;
                    orderConfirmDate = orderConfirmDate.replace('+00:00', offsetAdd);
                    let orderConfirmTime = new Date(orderConfirmDate);
                    orderConfirmTime.setSeconds(this.count);


                    var disableCancelOrderAt = moment(new Date(orderConfirmTime));
                    var currentTime = moment();
                    var counterValue = moment.duration(disableCancelOrderAt.diff(currentTime)).asSeconds();
                  }
                  this.count = counterValue;
                  this.counter = this.count;
                
                this.getCounterValue(this.count || this.counter);
              }
              else {
                this.counter = 0;
                this.count = 0;
                this.is_waiting_for_cancel = false;
              }
            }
            if(this.orderHistory[this.selectedOrder].created_on && this.orderHistory[this.selectedOrder].delivered_on)
            {
            this.orderCreatedOn = moment(this.orderHistory[this.selectedOrder].created_on.replace('+00:00','')).format('MMM D YYYY, h:mm:ss A')
            this.orderDeliveredOn = moment(this.orderHistory[this.selectedOrder].delivered_on.replace('+00:00','')).format('MMM D YYYY, h:mm:ss A')
            }


            if (this.settings.preparation_time_adding_to_expected_delivery_time == 1) {
              var date = new Date(this.orderHistory[0].drop_off_date);
              var dropOffDate = date.toISOString().split("T")[1].split(".")[0];
              this.expectedDeliveryTime = moment(dropOffDate, '"hh:mm:ss"').add(moment.duration(this.orderHistory[0].preparation_time)).format('hh:mm:ss A');
            }

            this.orderHistory.map(order => {
              order['start_time'] = order.delivered_on;
              order['end_time'] = moment(order.delivered_on).add(order.duration, 'minutes');
            });
            this.orderHistory.forEach(order => {
              order.products = this.mapOrderProducts(order);
              order.products[0].is_appointment = 1;
              if (order.questions) order.questions = JSON.parse(order.questions);
              if (order['discountAmount'] || order['gift_amount'] || order['wallet_discount_amount']) {
                order['discountAmount'] = (parseFloat(order['discountAmount']) || parseFloat(order['gift_amount']) || parseFloat(order['wallet_discount_amount'])).toFixed(2);
              }
            });
          }

          if (this.settings.enable_refund_request_category == 1) {
            this.returnCategoryList = response.data.returnCategory;
          }

          this.isLoading = false;
        }
      }, (err) => this.isLoading = false);
  }

  checkAccAppType(type, status) {
    if ((type == 1 || this.settings?.app_type == 1) && [11, 10, 3].includes(status))
      return false;

    if ((type == 8 || this.settings?.app_type == 8) && [3].includes(status))
      return false;

    return true;
  }

  /**
   distinguish product on basis of customization
   */

  mapOrderProducts(order): Array<any> {
    let products = [];
    this.freeProductQuantity = 0;

    order.product.forEach(item => {
      if (item.adds_on && item.adds_on.length) {
        if (!!order.special_instructions){
          this.special_instructions_array = JSON.parse(order.special_instructions) != null ? JSON.parse(order.special_instructions) : [];
         }
        const groupObj = _.groupBy(item.adds_on, 'serial_number');
        if (Object.keys(groupObj).length > 1) {
          for (let key in groupObj) {
            let addOns = groupObj[key];
            const customization = {
              quantity: addOns[0].quantity,
              special_instructions: addOns[0].special_instructions,
              data: this.makeCustomizationModel(addOns)
            }
            let addOnPrice = 0;
            let customId = '';
            addOns.forEach(item => {
              addOnPrice += Number(item.price) * item.quantity;
              customId += item.adds_on_type_jd;
            })

            let obj = this.special_instructions_array.find(o => (o.addOnIds == customId && o.productId == item.product_id));
            if (!!obj) {
              customization.special_instructions = obj.special_instruction;
            }

            let productObj = Object.assign({}, item);
            productObj.customization = customization;
            productObj.quantity = addOns[0].quantity;
            productObj.freeQuantity = addOns[0].freeQuantity;
            productObj.totalPrice = parseFloat(productObj.fixed_price) * addOns[0].quantity + addOnPrice;
            products.push(productObj);
          }
        } else {
          item.customization = {
            quantity: item.adds_on[0].quantity,
            special_instructions: (this.special_instructions_array && this.special_instructions_array.length) ? this.special_instructions_array[0].special_instructions : '',
            data: this.makeCustomizationModel(item.adds_on)
          }
          let addOnPrice = 0;
          item.adds_on.forEach(item => {
            addOnPrice += Number(item.price) * item.quantity;
          })
          item.totalPrice = parseFloat(item.fixed_price) * item.quantity + addOnPrice;
          products.push(item);
        }
      } else {
        item.totalPrice = parseFloat(item.fixed_price) * item.quantity;
        products.push(item);
      }

      // for buy x get x
      if (item.freeQuantity) {
        // this.freeProductQuantity += (item.freeQuantity * item.fixed_price);
        this.freeProductQuantity += (item.freeQuantity);
      }
    })

    return products;
  }

  makeCustomizationModel(addons: Array<any>): any {
    let list = [];
    const groupObj = _.groupBy(addons, 'adds_on_name');
    for (let key in groupObj) {
      let obj = {
        name: key,
        value: []
      }

      obj.value = groupObj[key].map(item => {
        return {
          type_name: item['adds_on_type_name'],
          name: key,
          type_id: item['adds_on_type_jd'],
          // is_multiple: 0,
          // min_adds_on: 0,
          // max_adds_on: 0,
          id: item['id'],
          price: item['price'],
          // is_default: 0,
          adds_on_type_quantity: item['adds_on_type_quantity']
        }
      })
      list.push(obj);
    }

    return list;
  }

  addOnNames(values): string {
    if (values.adds_on_type_quantity == 0) {
      return values.map((addon) => `${addon.type_name}`).toString();
    } else {
      return values.map((addon) => `${addon.type_name} x ${addon.adds_on_type_quantity}`).toString();
    }
  }

  countAddOnItems(values: any[]): number {

    return values.reduce((acc, value) => acc + value.adds_on_type_quantity, 0)

  }

  toRateProduct(product) {
    let obj = {
      productId: product['product_id'],
      supplierBranchId: product['supplier_branch_id'],
      orderId: this.orderIds,
      type: 'product'
    }
    this.router.navigate(['orders/rating'], { queryParams: obj });
  }

  toRateSupplier(order) {
    this.router.navigate(['orders/rating'], {
      queryParams: {
        type: 'supplier',
        supplierId: order['supplier_id'],
        supplierBranchId: order['supplier_branch_id'],
        categoryId: order.product[0]['category_id'],
        orderId: order.order_id
      }
    })
  }

  toRateAgent(order) {
    this.router.navigate(['orders/rating'], {
      queryParams: {
        type: 'agent',
        agentId: order['agent'][0].id,
        agentName: order['agent'][0].name,
        agentImage: order['agent'][0].image,
        supplierBranchId: order['supplier_branch_id'],
        categoryId: order.product[0]['category_id'],
        orderId: order.order_id
      }
    })
  }

  trackOrder(order) {
    if ((this.settings.app_type == 2 || order.type) && this.settings.ecom_agent_module == 0) {
      this.message.alert('info', this.translate.instant('Coming Soon'));
      return;
    }
    this.router.navigate(['/orders/track-order'], {
      queryParams: {
        orderId: order['order_id'],
        lng: order['longitude'],
        lat: order['latitude'],
        a_lat: order.agent.length ? order.agent[0].latitude : 0,
        a_lng: order.agent.length ? order.agent[0].longitude : 0,
        selfPickup: order['self_pickup']
      }
    });
  }

  onCancel(order: any) {
    if (order.payment_type == 1 && this.settings.wallet_module == 1) {
      return this.showWalletRefund();
    }
    this.message.confirm(`${this.translate.instant('Cancel This')} ${this.translate.instant(this.localization.transform('order').toString())}`).then(data => {
      if (data.value) {
        this.cancelOrder(order);
      }
    });
  }

  cancelOrder(order: any) {
    this.isLoading = true

    let param_data = {
      languageId: this.util.handler.languageId,
      accessToken: this.user.getUserToken,
      orderId: order['order_id'],
      isScheduled: order['schedule_order']
    };

    if (order.payment_type != 1) {
      param_data['cancel_to_wallet'] = 1;
    } else {
      param_data['cancel_to_wallet'] = this.refundToWallet;
    }

    var CondApiUrl = (this.settings.order_statuswise_deduction_charges && this.settings.order_statuswise_deduction_charges == 1 ? ApiUrl.orders.cancelOrderOnStatuswiseDeduction : ApiUrl.orders.cancelOrder);

    this.http.postData(CondApiUrl, param_data)
      .subscribe(response => {
        this.isLoading = false;
        if (!!response && response.data) {
          this.message.toast('success', `${this.translate.instant(this.localization.transform('order').toString())}  ${this.translate.instant('Cancelled Successfully')}`);
          this.getDetail();
        }
      });

  }

  showWalletRefund() {
    $('#walletRefund').modal('toggle');
  }

  async returnRequest(product) {
    this.productToReturn = product;
    this.hideRefundPaymentOptions = false;

    if (this.settings.enable_refund_request_category == 1 && this.orderHistory[this.selectedOrder].payment_type != 1) {
      this.hideRefundPaymentOptions = true;
    }

    if (this.orderHistory[this.selectedOrder].payment_type == 1 || this.settings.enable_refund_request_category == 1) {
      this.isReturnProduct = true;
      this.showWalletRefund();
      return;
    }

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: this.translate.instant('Type your reason here...'),
      inputAttributes: {
        'aria-label': this.translate.instant('Type your reason here')
      },
      confirmButtonColor: this.style.primaryColor,
      cancelButtonColor: this.style.secondaryColor,
      showCancelButton: true
    })
    let request_text: any = text;
    if (request_text) {
      this.returnProductRequest(request_text);
    }
  }

  returnProductRequest(text?: string) {
    this.isReturnProduct = false;
    let param_data = {
      order_price_id: this.productToReturn['order_price_id'],
      product_id: this.productToReturn['product_id'],
      reason: text || this.returnProductReason
    }

    if (this.orderHistory[this.selectedOrder].payment_type.payment_type != 1) {
      param_data['refund_to_wallet'] = 1;
    } else {
      param_data['refund_to_wallet'] = this.refundToWallet;
    }

    if (this.settings.enable_refund_request_category == 1) {
      param_data['return_category'] = this.returnCategory;
    }

    this.http.postData(ApiUrl.orders.requestReturn, param_data)
      .subscribe(response => {
        if (!!response && response.data) {
          this.message.toast('success', `${this.localization.transform('product')} return request generated successfully`);
          this.getDetail();
        }
      });
  }

  async onStatusChange(status) {
    const payload = {
      order_id: this.orderHistory[this.selectedOrder].order_id,
      status: status,
      offset: moment().format('Z')
    }

    if (payload.status == 4) {
      const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: this.translate.instant('Type your parking instruction here...'),
        inputAttributes: {
          'aria-label': 'Type your parking instruction here'
        },
        confirmButtonColor: this.style.primaryColor,
        cancelButtonColor: this.style.secondaryColor,
        showCancelButton: true
      })

      payload['parking_instructions'] = text;
    }

    this.isLoading = true;

    this.http.postData(ApiUrl.orders.changeOrderStatus, payload).subscribe((response) => {
      if (response && response.status == 200) {
        this.getDetail();
        this.message.toast('success', `${this.localization.transform('order')} ${this.translate.instant('Status Updated!')}`);
      }
      this.isLoading = false;
    }, (err) => {
      this.message.toast('error', `${this.translate.instant('Failed To Update')} ${this.localization.transform('order')} ${this.translate.instant('status')}`);
      this.isLoading = false;
    })

  }

  download(product: any) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = product.recipe_pdf
    a.target = '_blank';
    a.setAttribute('style', 'display: none');
    a.download = product.name;
    a.click();
    document.body.removeChild(a);
  }

  onEditOrder(order: any) {
    this.isEditOrder = true;
    this.editOrder = Object.assign({}, order);
    this.editOrder.products = order.products.map(product => Object.assign({}, product));
    this.editOrder.products.forEach(element => {
      element['selectedQuantity'] = element['quantity'];
    });
    this.getGeofenceData();
  }

  getGeofenceData() {
    let product_ids = (this.orderHistory[this.selectedOrder].product).map((product) => product['product_id']);
    const payload = {
      product_ids: product_ids,
      latitude: this.orderHistory[this.selectedOrder].to_latitude,
      longitude: this.orderHistory[this.selectedOrder].to_longitude
    }

    this.http.postData(ApiUrl.checkProductList, payload)
      .subscribe(response => {
        if (!!response && response.data) {
          let products = response.data.result;
          this.orderHistory[this.selectedOrder].delivery_charges = response.data.region_delivery_charge;
          this.orderHistory[this.selectedOrder].handling_admin = 0;
          (this.orderHistory[this.selectedOrder].product).forEach(cart_item => {
            products.forEach(element => {
              if (cart_item['product_id'] == element['product_id']) {
                this.orderHistory[this.selectedOrder].handling_admin = +element['handling_admin']
                cart_item['handling_admin'] = element['handling_admin'];
              }
            });
          });
          this.getTotal();
        }
      });
  }

  increaseValue(data): void {
    if (this.settings.enable_item_purchase_limit) {
      if ((Number)(data.purchase_limit) > 0) {
        if (data.selectedQuantity >= (Number)(data.purchase_limit)) {
          this.message.alert('info', this.translate.instant(`${this.localization.transform('product_inventory_limit')}`));
          return;
        }
      }
    }

    if (this.editOrder.type == 8) {
      if (data['price_type']) {
        data.selectedQuantity += data.duration / this.settings.interval;
      } else {
        data.selectedQuantity = ++data.selectedQuantity;
      }
    } else {
      if (!data['selectedQuantity']) {
        data['selectedQuantity'] = data.quantity || 0;
      }

      if (data['selectedQuantity'] <= 0) {
        data['selectedQuantity'] = 1;
      } else {
        data['selectedQuantity']++;
      }
    }
  }

  decreaseValue(data): void {
    if (this.editOrder.type == 8) {
      if (data['price_type']) {
        data.selectedQuantity -= data.duration / this.settings.interval;
      } else {
        data.selectedQuantity = --data.selectedQuantity;
      }
      if (data['selectedQuantity'] < 1) {
        this.editOrder.products = this.editOrder.products.filter((product) => (product.product_id || product.productId) != (data.product_id || data.productId));
        return;
      }
    } else {
      if (!data['selectedQuantity']) {
        data['selectedQuantity'] = data.quantity || 0;
      }

      if (data['selectedQuantity'] <= 1) {
        this.editOrder.products = this.editOrder.products.filter((product) => (product.product_id || product.productId) != (data.product_id || data.productId));
        return;
      }
      data['selectedQuantity']--;
    }
  }

  onProductAdd(products) {
    this.editOrder.products = products;
    this.isAddItems = false;

    if (this.settings.app_type == 8) {
      this.editOrder.total_order_price = 0;
      this.editOrder.products.forEach(el => {
        this.editOrder.total_order_price += (parseFloat(el.fixed_price) * el.selectedQuantity);
      });
      this.getEditTotal();
    }
  }

  onAddItems() {
    const payload = {
      sectionId: 0,
      orderId: this.editOrder.order_id,
      handlingAdmin: this.editOrder.handling_admin,
      userServiceCharge: 0
    }

    const removalItems = [];
    this.orderHistory[this.selectedOrder].products.forEach((product) => {
      if (!this.editOrder.products.find((p) => ((p.product_id || p.productId) == (product.product_id || product.productId)))) {
        removalItems.push(product.order_price_id);
      } else if (this.settings.app_type == 8 && this.editOrder.products.find((p) => ((p.product_id || p.productId) != (product.product_id || product.productId)))) {
        removalItems.push(product.order_price_id);
      }
    });

    if (removalItems && removalItems.length) {
      payload['removalItems'] = removalItems
    }

    if (this.editOrder.type == 8 || this.settings.app_type == 8) {
      payload['duration'] = 0;
    }

    payload['items'] = this.editOrder.products.map((product) => {
      let obj = {
        price: product.fixed_price,
        quantity: product['selectedQuantity'],
        productName: product['product_name'] || product['name'],
        productId: product['product_id'] || product['productId'],
        branchId: this.editOrder.supplier_branch_id,
        productDesc: product['product_desc'],
        imagePath: product['image_path'],
        orderPriceId: product['order_price_id'],
        // deliveryCharge: 0
      }

      if (product['is_product'] == 0) {
        if (product['price_type']) {
          payload['pricing_type'] = 1;
          payload['duration'] += (this.settings.interval * product['selectedQuantity']);
        } else {
          payload['pricing_type'] = 0;
          payload['duration'] += (product['duration'] * product['selectedQuantity']);
        }
      } else {
        if (product['price_type'] == 1) {
          payload['pricing_type'] = 1;
          payload['duration'] += product['selectedQuantity'] * 60;
        }
      }

      return obj;
    })

    let totalAdminHandling = 0;
    this.editOrder.products.forEach((product) => {
      const productAmount = this.cartService.calulateProductPrice(product);
      totalAdminHandling += (productAmount * product.handling_admin) / 100;
    });
    if (this.settings.app_type == 8 && this.editOrder.addOn) {
      totalAdminHandling += (this.editOrder.addOn * this.editOrder.products[0].handling_admin) / 100;
    }
    payload['handlingAdmin'] = totalAdminHandling;

    const subTotal = payload['items'].reduce((total, item) => Number(item.price) + total, 0);

    if (this.settings.supplier_service_fee == 1 && this.editOrder.user_service_charge) {
      payload['userServiceCharge'] = (this.editOrder.user_service_charge / 100) * subTotal;
    }

    this.isLoading = true;
    this.http.postData(ApiUrl.orders.addItems, payload).subscribe((response) => {
      if (response && response.status == 200) {
        this.getDetail();
      }
      this.isLoading = false;
      this.isEditOrder = false;
    }, (err) => this.isLoading = false)
  }

  getTotal() {
    this.orderHistory[this.selectedOrder].net_amount =
      this.orderHistory[this.selectedOrder].total_order_price +
      this.orderHistory[this.selectedOrder].delivery_charges +
      this.orderHistory[this.selectedOrder].handling_admin +
      this.orderHistory[this.selectedOrder].user_service_charge +
      this.orderHistory[this.selectedOrder].tip_agent +
      this.orderHistory[this.selectedOrder].slot_price - (
        this.orderHistory[this.selectedOrder].loyality_point_discount +
        this.orderHistory[this.selectedOrder].wallet_discount_amount +
        this.orderHistory[this.selectedOrder].referral_amount +
        this.orderHistory[this.selectedOrder].discountAmount);
  }

  getEditTotal() {
    let totalAdminHandling = 0;
    this.editOrder.products.forEach((product) => {
      const productAmount = this.cartService.calulateProductPrice(product);
      totalAdminHandling += (productAmount * product.handling_admin) / 100;
    });
    if (this.settings.app_type == 8 && this.editOrder.addOn) {
      totalAdminHandling += (this.editOrder.addOn * this.editOrder.products[0].handling_admin) / 100;
    }
    this.editOrder.handling_admin = totalAdminHandling;

    this.editOrder.net_amount =
      this.editOrder.total_order_price +
      this.editOrder.delivery_charges +
      this.editOrder.handling_admin +
      this.editOrder.user_service_charge +
      this.editOrder.addOn +
      this.editOrder.tip_agent +
      this.editOrder.slot_price - (
        this.editOrder.loyality_point_discount +
        this.editOrder.wallet_discount_amount +
        this.editOrder.referral_amount +
        this.editOrder.discountAmount);
  }

  dhlStatus() {
    let params = {
      orderId: this.orderHistory[this.selectedOrder].order_id
    }
    this.http.postData(ApiUrl.orders.trackDHL, params)
      .subscribe(response => {
        if (!!response && response.data) {
          this.dhlData = response.data;
          $('#dhl_status').modal('toggle');
        }
      });
  }


  onSOSNotification() {
    var obj = {
      user_id: this.currentUser.id,
      device_type: 3
    }
    this.isLoading = true;
    this.location.openTracker().subscribe((address) => {
      obj['address'] = address.address;
      obj['latitude'] = address.lat;
      obj['longitude'] = address.lng;
      this.http.postData(ApiUrl.sosAlertNotification, obj)
        .subscribe(response => {
          this.isLoading = false;
          if (!!response && response.data) {
            this.message.toast('success', 'SOS notification sent successfuly');
          }
        }, error => {
          this.isLoading = false;
        })
    }, (err) => {
      this.message.alert('error', err.message);
    });
  }

  itemSelection() {
    this.isAddItems = true;
    this.util.diableCart.next(true);
  }


  downloadReceipt(image) {
    this.imageToView = image;
    this.openImageViewer = true;
  }

  closeImageViewer(event) {
    this.openImageViewer = event;
  }
  openVideoViewer(data) {
    this.videoToPlay = data.url;
    this.openVideoPlayer = true;
  }

  closeVideoPlayer(event) {
    this.openVideoPlayer = event;
  }


  zoomAuth() {
    this.isLoading = true;
    this.http.getData(ApiUrl.zoom_auth).subscribe((res: any) => {

      if (res.status == 200) {
        this.createZoomMeeting(res.data);
      }
      else {
        this.message.toast("error", "Zoom authentication failed");
      }
      this.isLoading = false;
    })
  }
  createZoomMeeting(auth_z) {
    this.isLoading = true;
    var data = {
      zoom_email: auth_z.zoom_email,
      token: auth_z.token,
      topic: 'Order Meeting',
      type: 5,
      start_time: new Date(),
      duration: 60,
      end_date_time: this.orderHistory[this.selectedOrder].schedule_date
    }
    this.http.postData(ApiUrl.zoom_create_meeting, data).subscribe((res: any) => {
      if (res.status == 200) {
        this.message.toast("success", "Zoom meeting created");
        this.getDetail();
        this.joinZoomMeeting(res.data.start_url);
      }
      else {
        this.message.toast("error", "Failed to create zoom meeting");
      }
      this.isLoading = false;
    })
  }
  joinZoomMeeting(zoom_url) {
    window.open(zoom_url);
  }
  listenAgentBio(biourl) {
    window.open(biourl);
  }
  trackByOrderHistoryFn(id, index) {
    return index;
  }
  trackByCustomizationFn(id, index) {
    return index;
  }
  trackByVariantsFn(id, index) {
    return index;
  }
  trackByEditOrderFn(id, index) {
    return index;
  }
  trackByUtilGenerateFn(id, index) {
    return index;
  }



  getCurrency() {
    this.util.getSelectedCurrency.subscribe((res: any) => {
      if (res) {
        this.selected_currency = res;
        this.currency = this.selected_currency.currency_symbol ? this.selected_currency.currency_symbol : this.selected_currency.currency_name;
      }
    })
  }


  showSpecialInstruction(item) {
    // if(data.customization.special_instructions)
    this.special_instructions = item.special_instructions || item.customization.special_instructions || 'No Special Instructions';
    this.is_special_instruction = true;
  }

  onProcessSpecialInstruction(event) {
    this.is_special_instruction = false;
  }



  getDeliverySlot(delivery_date_time) {
    if (delivery_date_time.includes('16:00')) {
      return '04:00 PM - 08:00 PM'
    }
    else {
      return '12:00 PM - 04:00 PM'
    }
  }

  onExtraProductUpdate() {
    let data = this.orderHistory[this.selectedOrder];
    this.extra_product_details = {
      orderId: ((typeof this.orderIds) == 'string') ? this.orderIds : this.orderIds[0],
      extra_product: data.extraProduct,
      order_updated_by: data.extraProduct[0].order_updated_by,
      id: data.extraProduct[0].extra_product_requested_id
    }

    this.openExtraProductUpdate = true;
  }

  closeExtraProductViewer(event) {
    this.openExtraProductUpdate = event;
    this.getDetail();
  }

  payOnline(order: any) {
    const { created_on } = order;
    let paymentDateTime = this.datePipe.transform(created_on, 'medium', '+000');
    this.payOnlineOrder = { ...order, amount: order.agent_extra_charge }
    this.isPayOnline = true;
  }

  newPayOnline(order: any) {
    const { order_id } = order
    let language = JSON.parse(this.util.getLocalData('langData'));
    const { id } = language
    let params = {
      order_id: order_id.toString(),
      payment_type: 0,
      languageId: id
    }
    this.isLoading = true;
    this.http.postData(ApiUrl.makePayment, params).subscribe((res) => {
      console.log(res);
      location.reload();
      this.isLoading = false;
    },
      (err) => {
        this.isLoading = false;
        console.log(err)
      }
    )
  }

  onPaymentSuccess(transaction) {
    this.isLoading = true;
    this.firebaseAnalyticsSvc.firebaseAnalyticsEvents('initiate_checkout_success', 'initiate_checkout_success');
    if (transaction.paymentGatewayId != 'hyperpay') {
      this.isPayOnline = false;
    }
    this.isLoading = true;
    let obj = {};
    if (transaction && !transaction.card_details) {
      obj['gateway_unique_id'] = transaction.paymentGatewayId;
      obj['currency'] = GlobalVariable.CURRENCY_NAME;
      if (transaction.token) {
        obj['payment_token'] = transaction.token;
      } else if (transaction.mobile_no) {
        obj['mobile_no'] = transaction.mobile_no;
      } else {
        if (transaction.paymentGatewayId != "authorize_net") {
          obj['customer_payment_id'] = transaction.customer_payment_id;
          obj['card_id'] = transaction.card_id;
          if (transaction.transaction_id) {
            obj['transaction_id'] = transaction.transaction_id;
          }
          if (transaction.refid) {
            obj['refid'] = transaction.refid;
          }
          if (transaction.paymentGatewayId == "kpay")
            obj['payment_token'] = transaction.transaction_id
        }
      }
    }
    else {
      obj['gateway_unique_id'] = transaction.card_details.paymentGatewayId;
      obj['currency'] = GlobalVariable.CURRENCY_NAME;
      obj['payment_token'] = transaction.card_details.card_number;
      obj['cvt'] = transaction.card_details.cvc;
      obj['cp'] = transaction.card_details.p_code;
      obj['expMonth'] = transaction.card_details.exp_month;
      obj['expYear'] = transaction.card_details.exp_year;
      obj['cardHolderName'] = transaction.card_details.card_holder_name;

    }
    obj['order_id'] = this.payOnlineOrder['order_id'];
    if (transaction && transaction.waitForSuccess) {
      this.util.setLocalData('gop', obj, true);
      if (transaction.paymentGatewayId != 'hyperpay') {
        const a = document.createElement('a');
        //a.target = '_blank'
        a.href = transaction['paymentUrl'];
        a.click();
      }
      this.isLoading = false;
      return
    }
  }


  openReviews(agent) {
    // this.ratingReviews = agent.reviews;
    let params = {
      agent_id: agent.id
    }
    // this.isLoading = true;
    this.http.postData(ApiUrl.getAgentRating, params).subscribe((res: any) => {
      if (res.status == 200) {
        this.ratingReviews = res.data.agentRatingData;
        this.isRatingReviews = true;
      }
      // this.isLoading = false;
    })
  }

  onCloseEvent(event) {
    this.isRatingReviews = event;
  }


  getCounterValue(event) {
    this.count = event;
    if (this.count <= 1) {
      this.is_waiting_for_cancel = false;
    }
    else {
      this.is_waiting_for_cancel = true;
    }
  }

  getLocationSearch(location) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${location}`, '_blank');
  }

  translateThroughMoment(){
    if(this.util.getLocalData('langData'))
    {
     const lanCode = JSON.parse(this.util.getLocalData('langData')).language_code
     if(lanCode == 'ar')
     {
      moment.locale(lanCode)
     }
    }
  }

  ngOnDestroy() {
    this.styleSubscription.unsubscribe();
    this.subscription.unsubscribe();
    this.getDataSubscribe.unsubscribe();
    this.settingsSubscription.unsubscribe();
    if (this.firebaseSubscription) this.firebaseSubscription.unsubscribe();
  }

}
