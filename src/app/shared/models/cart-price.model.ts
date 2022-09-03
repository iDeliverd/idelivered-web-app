export class CartPriceModel {
    amount: number = 0;
    deliveryCharges: number = 0;
    handingCharges: number = 0;
    subTotal: number = 0;
    netTotal: number = 0;
    displayNetTotal: number = 0;
    originalNetTotal: number = 0;
    handlingAdmin: number = 0;
    handlingSupplier: number = 0;
    discount: number = 0;
    agent_tip: number = 0;
    promo: PromoModel = new PromoModel();
    questionPrice: number = 0;
    referral_amount: number = 0;
    supplier_service_charge: number = 0;
    serviceCharge: number = 0;
    walletAmount: number = 0;
    walletDiscountAmount: number = 0;
    gift: any = {};
    slot_price: number = 0;
    totalLoyaltyAmount: number = 0;
    appliedLoyaltyAmount: number = 0;
    productLoyaltyDiscountAmount: number = 0;
    is_user_loyalty_point: boolean = false;
    perProductLoyalityDiscount: number = 0;
    currency_exchange_rate: number = 0;
    local_currency: string = '';
    flat_user_service_charges: any = [];
    freeQuantity = 0;
    bottle_deposit_price = 0;
    plt_tax = 0;
    order_amount_for_free_delivery = 0;
    surge_price: any = '';
    surge_charges: number = 0;
    exceed_order_limit: boolean;
    geofence_surge: any = [];
    geofence_surge_price: number = 0;
    minimum_subtotal_for_small_order_fee: number = 0;
    small_order_fee: number = 0;
    federal_tax = 0;
    provincial_tax = 0;

    constructor(obj?: any) {
        if (!obj) { return; }
        this.promo = obj.promo;
        this.agent_tip = obj.agent_tip;
        this.referral_amount = obj.referral_amount;
        this.supplier_service_charge = obj.supplier_service_charge;
        this.walletAmount = obj.walletAmount;
        this.slot_price = obj.slot_price;
        this.totalLoyaltyAmount = obj.totalLoyaltyAmount;
        this.appliedLoyaltyAmount = obj.appliedLoyaltyAmount;
        this.productLoyaltyDiscountAmount = obj.productLoyaltyDiscountAmount;
        this.currency_exchange_rate = obj.currency_exchange_rate;
        this.local_currency = obj.local_currency;
        this.flat_user_service_charges = obj.flat_user_service_charges;
        this.freeQuantity = obj.freeQuantity;
        this.order_amount_for_free_delivery = obj.order_amount_for_free_delivery;
        this.surge_price = obj.surge_price;
        this.exceed_order_limit = obj.exceed_order_limit;
        this.geofence_surge = obj.geofence_surge;
        this.geofence_surge_price = obj.geofence_surge_price;
        this.minimum_subtotal_for_small_order_fee = obj.minimum_subtotal_for_small_order_fee;
        this.small_order_fee = obj.small_order_fee;
        this.federal_tax = obj.federal_tax;
        this.provincial_tax = obj.provincial_tax;
    }
}

export class PromoModel {
    id: number;
    code: string;
    constructor(obj?: any) {
        if (!obj) { return; }
        this.id = obj.id || undefined;
        this.code = obj.code || undefined;
    }
}
