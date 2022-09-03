import { settings } from 'cluster';
import { GlobalVariable } from './../../core/global';
export class AppSettings {

  public app_type: number;
  public type: number;
  public countryISO: string;
  public webMetaDescription: string;
  public webMetaTitle: string;
  public admin_order_priority: number;
  public cart_flow: number;
  public branch_flow: number;
  public is_pickup_order: number;
  public is_scheduled: number;
  public schedule_time: number;
  public vendor_status: number;
  public is_social_module: number;
  public booking_track_status: number;
  public interval: number;
  public temp_banners: Array<{ display_image: string, website_image: string, phone_image: string }>;
  public site_logo: string;
  public site_footer_logo: string;

  public android_app_url: string;
  public ios_app_url: string;
  public app_color: string;
  public payment_method: string;
  public is_single_vendor: number;
  public single_vendor_id: number;
  public hasDafaultAddrees: boolean;
  public terminology: object;
  public privacyPolicy: number;
  public termsAndConditions: number;
  public aboutUs: number;
  public blog: string | number;
  public faqs: number;
  public template_section: number;
  public referral_feature: number;
  public chat_enable: number;
  public search_by: number;
  public referral_given_price: string | number;
  public referral_receive_price: string | number;
  public delivery_charge_type: number;
  public supplier_service_fee: number;
  public cart_image_upload: number;
  public order_instructions: number;
  public email: number | string;
  public header_theme: number;
  public isCustomFlow: boolean = false;
  public dynamic_home_section: number;
  public selected_template: number;
  public tag_search: number = 0;
  public user_register_flow: number;
  public service_booking_flow: number = 0;
  public gift_card: number;
  public extra_instructions: number = 0;
  public enable_instructions_for_driver: number = 0;
  public agent_tip: number = 0;
  public secondary_language: any = 0;
  public things_to_remember: string = '';
  public product_detail: number = 0;
  public bypass_otp: number = 0;
  public payment_card_images: number = 0;
  public is_return_request: number = 0;
  public delivery_distance_unit: number = 0
  public show_prescription_requests: number = 0;
  public category_selection: number = 0;
  public footer_type: number = 0;
  public is_tax_geofence: number = 0;
  public isProductCustomTabDescriptionEnable: number = 0;
  public productCustomTabDescriptionLabel: any = [];
  public laundary_service_flow: number = 0;
  public is_product_wishlist: number = 0;
  public is_supplier_wishlist: number = 0;
  public is_agent_rating: number = 0;
  public is_supplier_rating: number = 0;
  public is_product_rating: number = 0;
  public addCollectFieldInAddress: number = 0;
  public social_media_icons: number = 0;
  public product_prescription: number = 0;
  public categories_above_supplier: number = 0;
  public single_vendor_popular_text: string = '';
  public single_vendor_offer_text: string = '';
  public is_dine_in: number = 0;
  public user_id_proof: number = 0;
  public disable_tax: number = 0;
  public disable_user_cancel_order: number = 0;
  public is_user_subscription: number = 0;
  public singleFoodStoryBackground: number = 0;
  public agentTipPercentage: number = 0;
  public is_loyality_enable: number = 0;
  public is_feedback_form_enabled: number = 0;
  public is_product_weight: number = 0;
  public hideAgentList: number = 0;
  public addon_type_quantity: number = 0;
  public no_default_product_sort: number = 0;
  public logo_background_color: number = 0;
  public order_request: number = 0;
  public auth_terms_check: number = 0;
  public disable_image_force_compression: number = 0;
  public agentsignup: number = 0;
  public enable_multi_supplier_delivery_charge_distance_wise: number = 0;
  public google_pay_merchant_id: string = '';
  public webMetaKeywords: string = '';

  public not_all_variant_required: number = 0;
  public hide_supplier_timing: number = 0;
  public hide_supplier_delivery_time: number = 0;
  public web_custom_domain_theme: number = 0;
  public is_vendor_registration: number = 0;
  public ecom_agent_module: number = 0;
  public price_decimal_length: number = 2;
  public show_expected_delivery_between: number = 0;
  public is_product_border: number = 0;
  public category_popup_width: number = 250;
  public disable_zoom_in_product: number = 0;
  public separate_images_product_detail: number = 0;
  public show_barcode: number = 0;
  public setlogoHeight: number = 0;
  public logoHeight: number = 0;
  public hide_offers_category_home: number = 0;
  public wallet_module: number = 0;
  public is_unify_search: number = 0;
  public is_decimal_quantity_allowed: number = 0;
  public is_social_ecommerce: number = 0;
  public hide_supplier_address: number = 0;
  public disable_user_cancel_after_confirm: number = 0;
  public hide_pickup_status: number = 0;
  public hide_supplier_license_number: number = 0;

  public footer_mockup_image: string = '';
  public footer_mockup_title: string = '';
  public footer_mockup_description: string = '';
  public fackbook_link: string = '';
  public twitter_link: string = '';
  public google_link: string = '';
  public linkedin_link: string = '';
  public instagram_link: string = '';
  public youtube_link: string = '';

  public is_schdule_order: number = 0;
  public payment_through_wallet_discount: number = 0;
  public default_language: number = 0;
  public isFirebaseAnalytics: string = "0";
  public admin_to_user_chat: number = 0;
  public is_segment: string = "0";
  public supplier_to_user_chat: number = 0;
  public is_branch_image_optional: number = 0;
  public agent_android_app_url: string = '';
  public agent_ios_app_url: string = '';
  public can_user_edit: string = '';
  public is_enabled_multiple_base_delivery_charges: number = 0;
  public hide_supplier_phone_email: string = '';
  public is_currency_exchange_rate: number = 0;
  public show_wallet_on_home: number = 0;
  public agent_verification_code_enable: number = 0;
  public enable_promo_code_list: number = 0;
  public hide_supplier_email: number = 0;
  public hide_agent_tip: number = 0;
  public disbale_user_cancel_pending_order: number = 0;
  public footer_color_same_as_header: number = 0;
  public hide_agent_details: number = 0;
  public food_list_pagination: number = 0;
  public disable_login_with_phone: number = 0;
  public no_default_address: number = 0;
  public fetch_current_location_first: number = 0;
  public glassdoor_link: string = '';
  public singleVendorBottomBanner: any = {};

  public by_pass_tables_selection: string = "0";
  public is_table_booking: number;
  public is_table_invite_allowed: string = "0";
  public is_coin_exchange: number = 0;
  public is_abn_business: string = "0";
  public table_booking_add_food_allow: string = "0";

  public is_sos_allow: string = "0";
  public is_survey_monkey_allow: string = "0";

  public content_id: string = "0";

  public is_custom_category_template: string = "0";
  public is_laundry_theme: string = "0";
  public dropoff_buffer: string = "";
  public signup_declaration: string = "";
  public enable_size_chart_in_product: string = "";
  public enable_country_of_origin_in_product: string = "";
  public show_reward_home_button: string = "";

  public is_guest_user_feedback_enable: string = "";
  public is_compare_products: string = "";
  public enable_min_order_distance_wise: string;
  public show_tags_for_suppliers: number;
  public is_glassdoor_link: number = 0;
  public allow_dynamic_image_on_fotter = '0';
  public show_supplier_info_settings: number;
  public show_supplier_categories: number;
  public show_supplier_phone: number;
  public show_supplier_email: number;
  public show_supplier_delivery_timing: number;
  public show_supplier_open_close: number;
  public show_supplier_nationality: number;
  public show_supplier_speciality: number;
  public show_supplier_brand_name: number;
  public display_image_on_customization: number;
  public skip_payment_option: number;
  public is_near_by_supplier_enable: number;
  public is_zoom_call_enabled: number;
  public enable_best_sellers: string = "0";

  public is_alternate_about_us: number;
  public aboutus_two_english: string = "";
  public aboutus_two_other: string = "";
  public enable_tax_on_total_amt: number;
  public is_flavor_of_week_enable: number;
  public flavor_of_week: string;
  public is_delivery_charge_weight_wise_enable: number;

  public is_eligible_order_amount: number;
  public eligible_order_amount: number;


  public is_enable_delivery_type: number;
  public is_enable_multiple_banner: number;

  public is_enable_orderwise_gateways: number;

  public dynamic_order_type_client_wise: number;
  public dynamic_order_type_client_wise_delivery: number;
  public dynamic_order_type_client_wise_pickup: number;
  public dynamic_order_type_client_wise_dinein: number;

  public enable_user_vehicle_number: number;
  public enable_rest_pagination_category_wise: number;

  public address_reference_char_limit: number;
  public enable_item_purchase_limit: number;
  public is_enable_subscription_required: number;
  public is_enable_max_discount_value: number;

  public enable_address_reference: number;

  public enable_referral_bal_limit: number;
  public referral_bal_limit_per_order: number;
  public enable_agent_leave_notes: number;
  public leave_notes_reasons: string;

  public enable_cutlery_option: number;
  public enable_in_out_network: number;
  public enable_audio_video: number;
  public enable_contact_us: number;
  public show_user_subscription_home_button: string;
  public is_instance_selection: number;
  public countryCodes = [];
  public enable_date_of_birth: number;

  public dynamic_home_screen_sections: number;
  public home_screen_sections: any;
  public is_crop_banner: number;

  public trending_rest_section: HomeScreenSection;
  public special_offer_section: HomeScreenSection;
  public best_seller_section: HomeScreenSection;
  public top_selling_section: HomeScreenSection;
  public fastest_del_section: HomeScreenSection;
  public recomm_items_section: HomeScreenSection;
  public near_you_section: HomeScreenSection;
  public cat_wise_rest_section: HomeScreenSection;
  public rating_wise_rest_section: HomeScreenSection;
  public new_rest_section: HomeScreenSection;
  public recent_order_section: HomeScreenSection;

  public enable_food_varients: number;
  public enable_freelancer_flow: number;
  public enable_rating_wise_sorting: number;
  public is_twilio_authy_enable: number;
  public is_number_masking_enable: number;
  public enable_flat_user_service_charge: number;
  public enable_product_allergy: number;

  public enable_supplier_review_list: number;
  public enable_supplier_promo_list: number;

  public enable_supplier_in_special_offer: number;
  public table_book_mac_theme: number;
  public is_multicurrency_enable: number;

  public enable_min_loyality_points: number;
  public min_loyalty_points_to_redeem: number;
  public min_order_amount_for_loyality_points: number;
  public loyality_point_per_order: number;
  public loyality_point_value: number;

  public enable_non_veg_filter: number;
  public enable_signup_phone_only: number;
  public enable_id_for_invoice_in_profile: number;
  public footer_ad_image = '';
  public loyality_discount_on_product_listing: number;
  public enable_whatsapp_contact_us: number;
  public cutom_country_code: number;
  public enable_product_appointment: number;
  public show_filter_on_home: number;
  public display_slot_with_difference: number;
  public enable_video_in_banner: number;

  public enable_product_special_instruction: number;
  public enable_product_wise_special_instruction: number;
  public enable_zone_geofence: number;
  public enable_sequence_wise_supplier: number;

  public enable_no_touch_delivery: number = 0;

  public is_flash_sale: number;

  public plt_liquor_tax: number;
  public liquor_bottle_tax: number;
  public liquor_bottle_tax_without_customization: number;
  public enable_liquor_popup: number;
  public enable_agent_signup_web: number;
  public enable_agent_signup_web_footer: number;
  public hide_agent_signup_web_about_us: number;
  public enable_default_agent_tip: number;
  public enable_comma_separation_text: number;
  public enable_custom_gst: number;
  public custom_tax_value: number;
  public disable_tip_multiple_addition: number;
  public enable_custom_pages: number;
  public enable_food_current_location: number;
  public disable_phone_flag_selection: number;
  public hide_download_section: number;
  public enable_food_theme2_horizontal_view: number;
  public enable_what3words_map: number;
  public enable_header_categories: number;
  public enable_vat_inclusions: number
  public enable_top_margin_162: number
  public enable_free_delivery_note: number

  public set_header_ratio_equal: number;
  public enable_order_amount_for_free_delivery: number;
  public enable_mosich_delivery_charge_algo: number;
  public display_order_free_delivery_popup: number;
  public hide_left_section: number;

  public enable_custom_footer_home_service: number;
  public enable_product_calories: number;
  public home_category_limit: number;
  public home_category_border_radius: number;
  public exclude_tax_in_total: number;
  public display_calc_product_price_in_cart: number;
  public hide_contact_details: number;
  public disable_mobile_footer: number;
  public enable_coming_soon_flow: number;
  public toast_top_center_pos: number;
  public enable_supplier_config_closing_day: number;
  public enable_services_customize_flow: number;
  public enable_wala_theme: number;
  public show_edit_order_description: number;
  public enable_banner_title: number;
  public banner_title_text: string;
  public banner_title_text_ol: string;
  public enable_no_of_client_to_be_served: number;
  public enable_sub_banners: number;
  public enable_banner_shade: number;
  public enable_one_vendor_items_in_cart: number;



  public enable_website_font_family: number;
  public website_font_family: string;
  public enable_knock_theme: number;
  public hide_product_detail_image_list: number;
  public hide_tax_for_user: number;
  public price_decimal_zero: number;
  public hide_product_filter: number;
  public hide_processing_step: number;
  public hide_process_complete_status: number;
  public enable_surge_price: number;
  public enable_name_validation: number;
  public enable_sidebar_selection: number;
  public show_slick_arrows: number;
  public hide_product_rating: number;
  public enable_autoplay_slick: number;
  public enable_split_address: number;
  public addon_decimal_value: string;
  public hide_pending_status: Number;
  public change_currency_accordingTo_lang: Number;
  public hide_flag: Number;
  public hide_agent_rating: Number;
  public enable_image_format_manage: Number;
  public show_service_image: number;
  public display_price_unit: Number;
  public hide_add_card_form: number;
  public add_product_within_13km: number;
  public require_date_of_birth: number;

  public appStyle?: {
    headerBackgroundColor?: string;
    headerTextColor?: string;
    topHeaderTextColor?: string;
    topHeaderBackgroundColor?: string;
    headerFontFamily?: string;
    primaryColor?: string;
    baseColor?: string;
  };



  public logo?: {
    background?: string;
    thumb_url?: string;
    url?: string
  };

  public placeholder: Placeholder;
  public card_gateway: object = {};


  public enable_gateway_postal_code: number = 0;
  public enable_fixed_delivery_charges: number = 0;
  public fixed_delivery_charge_value: number = 0;
  public fixed_delivery_charge_radius_exceed_value: number = 0;
  public enable_supplier_express_schedule_delivery_provide: number = 0;
  public express_delivery_charges: number = 0;
  public enable_global_search_items: number = 0;
  public show_confirm_messages_on_cart: number = 0;
  public show_supplier_categories_api_only: number = 0;
  public hide_supplier_categories: number = 0;
  public enable_custom_cart_icon: number = 0;
  public enable_home_icon_on_header: number = 0;
  public enable_whatsapp_floating_chat: number = 0;
  public hide_addOncharges: number = 0;
  public enable_supplier_sorting_by_distance: number = 0;


  public enable_custom_agent_tip: number = 0;
  public custom_agent_tip_min_value: number = 0;
  public enable_add_more_item_redirect: number = 0;
  public enable_every_item_remove_alert: number = 0;
  public enable_custom_tax_static: number = 0;
  public custom_tax_static_value: number = 0;
  public custom_tax_static_value_flat: number = 0;

  public enable_cctv: number = 0;
  public enable_cctv_for_web: number = 0;
  public enable_custom_orderId: number = 0;


  public descriptionSections: Array<{
    title?: string;
    description?: string;
    image?: string;
  }>;

  public default_address?: {
    address?: string,
    latitude?: number
    longitude?: number
  };

  public phone_registration_flag: number;
  public show_saudi_investment_number: number;
  public enable_service_pickup: number;
  public view_supplier_docs_user: number;
  public cart_location_change: number;
  public show_location_icon_black: number;

  public enable_fees_estimated_tax_contant: number;

  public enable_apps_link_in_mobile_footer: number;

  public order_statuswise_deduction_charges: number;
  public is_landing_category_two_in_row: number;
  public preparation_time_adding_to_expected_delivery_time: number;
  public show_closed_by_time: number;
  public enable_extra_product_service: number;
  public hide_supplier_detail: number;
  public enable_sign_up_form_confirm_password: number;
  public hide_verify_dinin_table_no: number;
  public social_login_icon_format: number;
  public show_table_details_on_cart_page: number;
  public login_page_disclaimer: number;
  public doc_rating_upload: number;
  public set_filter_button_to_center: number;
  public disable_slot_selection_2_to_5: number;
  public enable_emoticon_rating: number;
  public hide_sort_by: number = 0;
  public social_media_icons_horizontally_aligned: number;
  public blog_link: any;
  public show_cancellation_and_refund_policy: number;
  public show_cookie_policy: number;
  public cookies_policy_contant: string;
  public cookies_policy_contant_ol: string;
  public enable_adding_multiplefields_in_web: number;
  public hide_slots_by_time: number;
  public hide_start_end_time: number;
  public count_customization_items: number;
  public remove_price_in_customisation: number;
  public price_surge_with_geo_fencing: number;
  public emailVerification: number;
  public show_add_button_for_product_varient: number;
  public enable_different_delivery_status_handling: number;
  public enable_payment_option_for_dine_in: number;
  public cart_audio_upload: number;
  public hide_qty_button: number;
  public enable_optional_image_upload: number;
  public show_agent_extra_charge: number;
  public enable_pay_agent_extra_charge: number;
  public disable_service_fee_pickup: number;
  public hide_customisable_text: number = 0;
  public enable_agent_review_list: number;
  public enable_food_extra_placeholders: number;
  public enable_agent_tip_all_pay_mode: number;
  public enable_booking_gap_two_hrs: number;
  public show_currency_after_amount: number;
  public count_customized_service_duration: number;
  public minimum_order_fee: number;
  public minimum_subtotal_for_small_order_fee: number;
  public small_order_fee: number;
  public disable_edit_user_name: number;
  public enable_location_denied_warning: number;
  public hide_open_close_text: number = 0;
  public hide_rating_supplier_detail: number = 0;
  public enable_product_suggestions_cart: number = 0;
  public enable_multiple_table_booking_at_once: number = 0;
  public copy_right_section_contant: string = '';
  public copy_right_section_contant_ol: string = '';
  public enable_slots_clear_alert_on_cart: number = 0;
  public enable_grid_view_category: number;
  public hide_cod_on_dinin_order_type: number = 0;
  public self_pickup_in_update_cart_info: number = 0;
  public hide_inside_category: number = 0
  public enable_cancel_order_after_confirmation: number = 0
  public enable_manual_user_address: number = 0
  public enable_town_in_address: number = 0
  public enable_state_in_address: number = 0
  public enable_pincode_in_address: number = 0
  public enable_logo_in_copy_right_section: number = 0
  public hide_signup_links_from_footer: number = 0;
  public enable_cod_max_amount_limit: number;
  public cod_max_amount_limit: number;
  public hide_review_title: number;
  public site_name_change: number;
  public change_argentina_to_saudi_arabia_flag_icon: number;
  public include_loyalty_in_net_total: number;
  public display_all_supplier_home: number;
  public hide_category_supplier_home: number;
  public enable_refund_request_category: number;
  public fix_header_logo_dimensions: number;
  public show_eight_popular_products: number;
  public enable_forgot_password_via_phone_number: number;

  public enable_agent_vehicle_model: number;
  public enable_agent_vehicle_maker: number;
  public enable_agent_vehicle_year: number;
  public enable_agent_vehicle_vin: number;
  public enable_user_subscriptin_supplier: number;
  public add_rounded_off_tax_to_subtotal: number;
  public shift_recommended_supplier_above_grocery_products: number;
  public show_payment_model_after_update_info_api: number;
  public enable_i_delivered_theme: number;
  public enable_vendor_reg_via_link: number;
  public is_country_code_enabled: number = 0;


  public hide_popup_text_service_will_remove_from_the_cart: number;
  public by_default_show_red_on_confirmed_status_of_order: number;
  public hide_homeservice_cleaning_selected_title_from_cart: number;
  public hide_homeservice_total_price_show_with_service_after_booking: number;
  public saned_remove_button: number;
  public disable_cancel_order_after_admin_provided_time: number;
  public max_cancellation_waiting_time: number;
  public display_logo_in_center: number;
  public send_null_in_customer_address: number;

  public hide_back_button_of_add_on: number;
  public hide_atleast_from_popup: number;
  public enable_radiobutton_in_both_indicate_curser: number;

  public change_remove_botton_position: number;
  public display_supplier_phone_info: number;
  public display_login_signup_menu: number;
  public hide_search_placeholder: number;
  public set_logo_fit_cover: number;
  public display_cart_text: number;
  public display_cart_floating_icon: number;
  public display_language_menu_function: number;
  public enable_order_scheduling_for_closed_vendors: number;
  public show_currency_flag: number;
  public hide_currency_symbol: number;

  public enable_orderdate_translate:number;
  public home_category_image_border_radius: number;
  public change_flag_of_country_in_language_name: number;
  public enable_base_delivery_charge_percentage: number;
  public base_delivery_charge_percentage: number;

  public remove_language_code : number;
  public change_radious_of_profile_image : number;
  public change_size_of_location_and_search_bar_on_homepage: number;
  public display_privacy_on_supplier_reg: number;
  public hide_default_terms: number;
  public enable_separate_terms_user_supplier: number;
  public hide_country_code_contact: number;
  public display_supplier_email_order: number;
  public enable_federal_provincial_tax: number;
  public federal_tax_percent: number;
  public provincial_tax_percent: number;
  public schedule_after_day : number; 
  public show_language_in_reverse_order: number;
  public show_supplier_name_in_my_orders: number;
  public enable_success_popup_while_adding_to_cart: number;
  public enable_manual_address_fields: number;

  constructor(settingObj: any) {
    this.app_type = settingObj['app_type'];
    this.type = settingObj['app_type'];
    this.countryISO = settingObj['iso'];
    this.webMetaDescription = settingObj['web_meta_description'] || '';
    this.webMetaTitle = settingObj['web_meta_title'] || '';
    this.admin_order_priority = settingObj['admin_order_priority'];
    this.cart_flow = settingObj['cart_flow'];
    this.branch_flow = settingObj['branch_flow'] || 0;
    this.is_pickup_order = settingObj['is_pickup_order'];
    this.is_scheduled = settingObj['is_scheduled'];
    this.schedule_time = settingObj['schedule_time'];
    this.vendor_status = settingObj['vendor_status'];
    this.booking_track_status = settingObj['booking_track_status'];
    this.is_social_module = settingObj['is_social_module'];
    this.interval = settingObj['interval'];
    this.android_app_url = settingObj['android_app_url'];
    this.app_color = settingObj['app_color'];
    this.ios_app_url = settingObj['ios_app_url'];
    this.site_logo = settingObj['logo_url'];
    this.site_footer_logo = settingObj['footer_logo_url'];
    this.payment_method = settingObj['payment_method'];
    this.is_single_vendor = settingObj['is_single_vendor'];
    this.single_vendor_id = settingObj['single_vendor_id'];
    this.termsAndConditions = settingObj['termsAndConditions'];
    this.privacyPolicy = settingObj['privacyPolicy'];
    this.aboutUs = settingObj['aboutUs'];
    this.blog = settingObj['blog']
    this.countryCodes = settingObj['countryCodes'] || [];
    this.allow_dynamic_image_on_fotter = settingObj['allow_dynamic_image_on_fotter'];
    this.faqs = settingObj['faqs'];
    this.template_section = !!settingObj['template_section'] ? parseInt(settingObj['template_section']) : 0;
    this.referral_feature = settingObj['referral_feature'] || 0;
    this.search_by = settingObj['search_by'] ? parseInt(settingObj['search_by']) : 0;
    this.chat_enable = settingObj['chat_enable'];
    this.referral_given_price = settingObj['referral_given_price'] || 0;
    this.referral_receive_price = settingObj['referral_receive_price'] || 0;
    this.delivery_charge_type = settingObj['delivery_charge_type'] || 0;
    this.supplier_service_fee = settingObj['user_service_fee'] || 0;
    this.cart_image_upload = settingObj['cart_image_upload'] || 0;
    this.order_instructions = settingObj['order_instructions'] || 0;
    this.email = settingObj['email'] || 0;
    this.header_theme = settingObj['header_theme'] || 0;
    this.dynamic_home_section = settingObj['dynamic_home_section'] || 0;
    this.selected_template = !!settingObj['selected_template'] ? parseInt(settingObj['selected_template']) : 0;
    this.phone_registration_flag = settingObj['phone_registration_flag'] || 0;
    this.tag_search = settingObj['tag_search'] || 0;
    this.card_gateway = settingObj['card_gateway'] ? jsonParser(settingObj['card_gateway']) : {};
    this.user_register_flow = !!settingObj['user_register_flow'] ? parseInt(settingObj['user_register_flow']) : 0;
    this.descriptionSections = settingObj['description_sections'] ? jsonParser(settingObj['description_sections']) : [];
    this.service_booking_flow = settingObj['service_booking_flow'] || 0;
    this.gift_card = settingObj['gift_card'] || 0;
    this.things_to_remember = settingObj['things_to_remember'] || '';

    this.extra_instructions = settingObj['extra_instructions'] || 0;
    this.enable_instructions_for_driver = settingObj['enable_instructions_for_driver'] ?
      (Number)(settingObj['enable_instructions_for_driver']) : 0;

    this.secondary_language = settingObj['secondary_language'] || 0;
    this.agent_tip = settingObj['agent_tip'] || 0;
    this.product_detail = settingObj['product_detail'] || 0;
    this.bypass_otp = settingObj['bypass_otp'] || 0;
    this.footer_ad_image = settingObj['footer_ad_image'];
    this.payment_card_images = settingObj['payment_card_images'] || 0;
    this.is_return_request = settingObj['is_return_request'] || 0;
    this.delivery_distance_unit = settingObj['delivery_distance_unit'] || 0;
    this.show_prescription_requests = settingObj['show_prescription_requests'] || 0;
    this.category_selection = settingObj['category_selection'] || 0;
    this.footer_type = settingObj['footer_type'] || 0;
    this.is_tax_geofence = settingObj['is_tax_geofence'] || 0;
    this.isProductCustomTabDescriptionEnable = settingObj['isProductCustomTabDescriptionEnable'] || 0;
    this.social_media_icons = settingObj['social_media_icons'] || 0;
    this.product_prescription = settingObj['product_prescription'] || 0;
    this.categories_above_supplier = settingObj['categories_above_supplier'] || 0;
    this.is_dine_in = settingObj['is_dine_in'] || 0;
    this.user_id_proof = settingObj['user_id_proof'] || 0;
    this.disable_tax = settingObj['disable_tax'] || 0;
    this.is_user_subscription = settingObj['is_user_subscription'] || 0;
    this.agentTipPercentage = settingObj['agentTipPercentage'] || 0;
    this.is_loyality_enable = settingObj['is_loyality_enable'] || 0;
    this.is_feedback_form_enabled = settingObj['is_feedback_form_enabled'] || 0;
    this.is_product_weight = settingObj['is_product_weight'] || 0;
    this.admin_to_user_chat = settingObj['admin_to_user_chat'] || 0;
    this.supplier_to_user_chat = settingObj['supplier_to_user_chat'] || 0;
    this.can_user_edit = settingObj['can_user_edit'] || 0;
    this.hideAgentList = settingObj['hideAgentList'] || 0;
    this.addon_type_quantity = settingObj['addon_type_quantity'] || 0;
    this.is_unify_search = settingObj['is_unify_search'] || 0;
    this.is_decimal_quantity_allowed = settingObj['is_decimal_quantity_allowed'] || 0;
    this.is_social_ecommerce = settingObj['is_social_ecommerce'] || 0;
    this.is_enabled_multiple_base_delivery_charges = settingObj['is_enabled_multiple_base_delivery_charges'] || 0;
    this.hide_supplier_phone_email = settingObj['hide_supplier_phone_email'] || 0;
    this.is_currency_exchange_rate = settingObj['is_currency_exchange_rate'] || 0;
    this.show_wallet_on_home = settingObj['show_wallet_on_home'] || 0;
    this.agent_verification_code_enable = settingObj['agent_verification_code_enable'] || 0;
    this.no_default_product_sort = settingObj['no_default_product_sort'] || 0;
    this.logo_background_color = settingObj['logo_background_color'] || 0;
    this.hide_supplier_email = settingObj['hide_supplier_email'] || 0;
    this.hide_agent_tip = settingObj['hide_agent_tip'] || 0;
    this.footer_color_same_as_header = settingObj['footer_color_same_as_header'] || 0;
    this.hide_agent_details = settingObj['hide_agent_details'] || 0;
    this.disbale_user_cancel_pending_order = settingObj['disbale_user_cancel_pending_order'] || 0;
    this.disable_user_cancel_after_confirm = settingObj['disable_user_cancel_after_confirm'] || 0;
    this.order_request = settingObj['order_request'] || 0;
    this.food_list_pagination = settingObj['food_list_pagination'] || 0;
    this.disable_login_with_phone = settingObj['disable_login_with_phone'] || 0;
    this.auth_terms_check = settingObj['auth_terms_check'] || 0;
    this.hide_pickup_status = settingObj['hide_pickup_status'] || 0;
    this.no_default_address = settingObj['no_default_address'] || 0;
    this.fetch_current_location_first = settingObj['fetch_current_location_first'] || 0;
    this.disable_image_force_compression = settingObj['disable_image_force_compression'] || 0;
    this.agentsignup = settingObj['agentsignup'] || 0;
    this.is_glassdoor_link = settingObj['is_glassdoor_link'] || 0;
    this.glassdoor_link = settingObj['glassdoor_link'] || '';
    this.enable_multi_supplier_delivery_charge_distance_wise = settingObj['enable_multi_supplier_delivery_charge_distance_wise'] || 0;
    this.google_pay_merchant_id = settingObj['google_pay_merchant_id'] || '';
    this.webMetaKeywords = settingObj['web_meta_keywords'] || '';
    this.show_user_subscription_home_button = settingObj['show_user_subscription_home_button'];
    this.show_reward_home_button = settingObj['show_reward_home_button'];
    this.is_crop_banner = settingObj['is_crop_banner'] ? (Number)(settingObj['is_crop_banner']) : 0;
    this.enable_global_search_items = settingObj['enable_global_search_items'] || 0;
    this.enable_header_categories = settingObj['enable_header_categories']
      ? (Number)(settingObj['enable_header_categories']) : 0;
    this.enable_vat_inclusions = settingObj['enable_vat_inclusions']
      ? (Number)(settingObj['enable_vat_inclusions']) : 0;



    this.enable_free_delivery_note = settingObj['enable_free_delivery_note']
      ? (Number)(settingObj['enable_free_delivery_note']) : 0;

    this.show_confirm_messages_on_cart = settingObj['show_confirm_messages_on_cart']
      ? (Number)(settingObj['show_confirm_messages_on_cart']) : 0;


    this.show_supplier_categories_api_only = settingObj['show_supplier_categories_only']
      ? (Number)(settingObj['show_supplier_categories_only']) : 0;

    this.hide_supplier_categories = settingObj['hide_supplier_categories']
      ? (Number)(settingObj['hide_supplier_categories']) : 0;


    this.enable_custom_cart_icon = settingObj['enable_custom_cart_icon']
      ? (Number)(settingObj['enable_custom_cart_icon']) : 0;
    this.enable_home_icon_on_header = settingObj['enable_home_icon_on_header']
      ? (Number)(settingObj['enable_home_icon_on_header']) : 0;



    if (settingObj['productCustomTabDescriptionLabel']) {
      this.productCustomTabDescriptionLabel = jsonParser(settingObj['productCustomTabDescriptionLabel']);
    }
    this.laundary_service_flow = settingObj['laundary_service_flow'] || 0;
    this.web_custom_domain_theme = settingObj['web_custom_domain_theme'] || 0;
    this.ecom_agent_module = settingObj['ecom_agent_module'] || 0;
    this.is_product_wishlist = settingObj['is_product_wishlist'] || 0;
    this.is_supplier_wishlist = settingObj['is_supplier_wishlist'] || 0;

    this.is_agent_rating = settingObj['is_agent_rating'] || 0;
    this.is_supplier_rating = settingObj['is_supplier_rating'] || 0;
    this.is_product_rating = settingObj['is_product_rating'] || 0;
    this.hide_sort_by = settingObj['hide_sort_by'] || 0;

    this.addCollectFieldInAddress = settingObj['addCollectFieldInAddress'] || 0;
    this.hide_supplier_timing = settingObj['hide_supplier_timing'] || 0;
    this.hide_supplier_delivery_time = settingObj['hide_supplier_delivery_time'] || 0;
    this.wallet_module = settingObj['wallet_module'] || 0;

    this.show_expected_delivery_between = settingObj['show_expected_delivery_between'] || 0;
    this.is_schdule_order = settingObj['is_schdule_order'] || 0;
    this.not_all_variant_required = settingObj['not_all_variant_required'] || 0;
    this.is_product_border = settingObj['is_product_border'] || 0;
    this.category_popup_width = settingObj['category_popup_width'] || 250;
    this.disable_zoom_in_product = settingObj['disable_zoom_in_product'] || 0;
    this.separate_images_product_detail = settingObj['separate_images_product_detail'] || 0;
    this.show_barcode = settingObj['show_barcode'] || 0;
    this.setlogoHeight = settingObj['setlogoHeight'] || 0;
    this.logoHeight = settingObj['logoHeight'] || 0;
    this.disable_user_cancel_order = settingObj['disable_user_cancel_order'] || 0;

    this.payment_through_wallet_discount = settingObj['payment_through_wallet_discount'] ? parseInt(settingObj['payment_through_wallet_discount']) : 0;
    this.default_language = settingObj['default_language'] ? parseInt(settingObj['default_language']) : 0;
    this.hide_offers_category_home = settingObj['hide_offers_category_home'] || 0;
    this.display_image_on_customization = settingObj['display_image_on_customization'] ?
      (Number)(settingObj['display_image_on_customization']) : 0;
    this.is_vendor_registration = settingObj['is_vendor_registration'] || 0;
    this.price_decimal_length = settingObj['price_decimal_length'] ? parseInt(settingObj['price_decimal_length']) : 2;

    this.footer_mockup_image = settingObj['footer_mockup_image'] || '';
    this.footer_mockup_title = settingObj['footer_mockup_title'] || '';
    this.footer_mockup_description = settingObj['footer_mockup_description'] || '';
    this.fackbook_link = settingObj['fackbook_link'] || '';
    this.twitter_link = settingObj['twitter_link'] || '';
    this.google_link = settingObj['google_link'] || '';
    this.linkedin_link = settingObj['linkedin_link'] || '';
    this.instagram_link = settingObj['instagram_link'] || '';
    this.youtube_link = settingObj['youtube_link'] || '';
    this.blog_link = settingObj['blog_link'] || '';
    this.is_branch_image_optional = settingObj['is_branch_image_optional'] || 0;
    this.agent_android_app_url = settingObj['agent_android_app_url'] || '';
    this.agent_ios_app_url = settingObj['agent_ios_app_url'] || '';
    this.enable_id_for_invoice_in_profile = settingObj['enable_id_for_invoice_in_profile'] ? parseInt(settingObj['enable_id_for_invoice_in_profile']) : 0;
    this.single_vendor_popular_text = settingObj['single_vendor_popular_text'] || '';
    this.single_vendor_offer_text = settingObj['single_vendor_offer_text'] || '';
    this.singleFoodStoryBackground = settingObj['singleFoodStoryBackground'] || '';
    this.loyality_discount_on_product_listing = settingObj['loyality_discount_on_product_listing'] ? parseInt(settingObj['loyality_discount_on_product_listing']) : 0;
    this.enable_whatsapp_contact_us = settingObj['enable_whatsapp_contact_us'] ? parseInt(settingObj['enable_whatsapp_contact_us']) : 0;
    this.cutom_country_code = settingObj['cutom_country_code'] ? parseInt(settingObj['cutom_country_code']) : 0;
    this.enable_product_appointment = settingObj['enable_product_appointment'] ? parseInt(settingObj['enable_product_appointment']) : 0;
    this.show_filter_on_home = settingObj['show_filter_on_home '] || 0;
    this.show_saudi_investment_number = settingObj['show_saudi_investment_number'] || 0;
    this.enable_service_pickup = settingObj['enable_service_pickup'] || 0;
    this.view_supplier_docs_user = settingObj['view_supplier_docs_user'] || 0;
    this.order_statuswise_deduction_charges = settingObj['order_statuswise_deduction_charges'] || 0;
    this.cart_audio_upload = settingObj['cart_audio_upload'] || 0;
    this.hide_customisable_text = settingObj['hide_customisable_text'] || 0;
    this.disable_edit_user_name = settingObj['disable_edit_user_name'] || 0;
    this.hide_open_close_text = settingObj['hide_open_close_text'] || 0;

    this.singleVendorBottomBanner = {
      banner1: settingObj['singleFoodBottomBanner1'] || '',
      banner2: settingObj['singleFoodBottomBanner2'] || ''
    }

    const placeholder = {};
    if (settingObj['user_location']) {
      placeholder['user_location'] = jsonParser(settingObj['user_location']);
    }

    if (settingObj['empty_cart']) {
      placeholder['empty_cart'] = jsonParser(settingObj['empty_cart']);
    }

    if (settingObj['order_loader']) {
      placeholder['order_loader'] = jsonParser(settingObj['order_loader']);
    }

    if (settingObj['website_background']) {
      placeholder['website_background'] = jsonParser(settingObj['website_background']);
    }

    if (settingObj['user_subscription_placeholder']) {
      placeholder['user_subscription_placeholder'] = jsonParser(settingObj['user_subscription_placeholder']);
    }

    this.placeholder = new Placeholder(placeholder);

    if (settingObj['terminology']) {
      try {
        this.terminology = JSON.parse(settingObj['terminology']);
      } catch {
        this.terminology = {};
      }
    }

    this.appStyle = {
      baseColor: settingObj['element_color'],
      primaryColor: settingObj['theme_color'],
      headerFontFamily: settingObj['font_family'],
      headerBackgroundColor: settingObj['header_color'],
      headerTextColor: settingObj['header_text_color'],
      topHeaderBackgroundColor: settingObj['header_color'],
      topHeaderTextColor: settingObj['header_text_color']
    };

    this.logo = {
      background: settingObj['logo_background'],
      url: settingObj['logo_url'],
      thumb_url: settingObj['logo_thumb_url']
    }

    this.temp_banners = [
      { display_image: settingObj['banner_one_thumb'], website_image: settingObj['banner_one'], phone_image: settingObj['banner_one'] },
      { display_image: settingObj['banner_two_thumb'], website_image: settingObj['banner_two'], phone_image: settingObj['banner_two'] },
      { display_image: settingObj['banner_three_thumb'], website_image: settingObj['banner_three'], phone_image: settingObj['banner_three'] },
      { display_image: settingObj['banner_four_thumb'], website_image: settingObj['banner_four'], phone_image: settingObj['banner_four'] }
    ];

    // if (!!settingObj['banner_url']) {
    //   this.temp_banners.unshift({
    //     display_image: settingObj['banner_thumb_url'],
    //     website_image: settingObj['banner_url']
    //   });
    // }

    if (GlobalVariable.flowData && GlobalVariable.flowData.length) {
      if (GlobalVariable.flowData.length > 1) {
        this.isCustomFlow = true;
      } else {
        this.app_type = GlobalVariable.flowData[0].flow_type;
        this.isCustomFlow = false;
      }
    }

    if (settingObj.default_address) {
      this.default_address = {
        address: settingObj['default_address']['address'],
        latitude: settingObj['default_address']['latitude'],
        longitude: settingObj['default_address']['longitude']
      }
    }

    this.isFirebaseAnalytics = settingObj['isFirebaseAnalytics'] || "0";
    this.is_segment = settingObj['is_segment'] || "0";
    this.by_pass_tables_selection = settingObj['by_pass_tables_selection'] || "0";
    this.is_table_booking = (Number)(settingObj['is_table_booking']) ?
      (Number)(settingObj['is_table_booking']) : 0;
    this.is_table_invite_allowed = settingObj['is_table_invite_allowed'] || "0";
    this.is_coin_exchange = settingObj['is_coin_exchange'] || 0;
    this.is_abn_business = settingObj['is_abn_business'] || "0";
    this.table_booking_add_food_allow = settingObj['table_booking_add_food_allow'] || "0";
    this.is_sos_allow = settingObj['is_sos_allow'] || "0";
    this.is_survey_monkey_allow = settingObj['is_survey_monkey_allow'] || "0";

    this.content_id = settingObj['content_id'] || "0";

    this.is_custom_category_template = settingObj['is_custom_category_template'] || "0";
    this.enable_best_sellers = settingObj['enable_best_sellers'] || "0";

    this.is_alternate_about_us = settingObj['is_alternate_about_us'] ? (Number)(settingObj['is_alternate_about_us']) : 0;
    if (this.is_alternate_about_us) {
      this.aboutus_two_english = settingObj['aboutus_two_english'] || "";
      this.aboutus_two_other = settingObj['aboutus_two_other'] || "";
    }
    this.is_laundry_theme = settingObj['is_laundry_theme'] || "0";
    this.dropoff_buffer = settingObj['dropoff_buffer'] || "0";

    this.signup_declaration = settingObj['signup_declaration'] || "0";

    this.enable_size_chart_in_product = settingObj['enable_size_chart_in_product'] || "0";
    this.enable_country_of_origin_in_product = settingObj['enable_country_of_origin_in_product'] || "0";

    this.is_guest_user_feedback_enable = settingObj['is_guest_user_feedback_enable'] || "0";
    this.is_compare_products = settingObj['is_compare_products'] || "0";
    this.enable_promo_code_list = settingObj['enable_promo_code_list'] || "0";
    this.enable_best_sellers = settingObj['enable_best_sellers'] || "0";
    this.enable_min_order_distance_wise = settingObj['enable_min_order_distance_wise'] || "0";
    this.show_tags_for_suppliers = settingObj['show_tags_for_suppliers'] ? (Number)(settingObj['show_tags_for_suppliers']) : 0;


    this.show_supplier_info_settings = settingObj['show_supplier_info_settings'] ? (Number)(settingObj['show_supplier_info_settings']) : 0;
    this.hide_supplier_address = settingObj['hide_supplier_address'] ? (Number)(settingObj['hide_supplier_address']) : 0;
    this.hide_supplier_license_number = settingObj['hide_supplier_license_number'] ? (Number)(settingObj['hide_supplier_license_number']) : 0;

    if (this.show_supplier_info_settings) {
      this.show_supplier_categories = settingObj['show_supplier_categories'] ? (Number)(settingObj['show_supplier_categories']) : 0;
      this.show_supplier_phone = settingObj['show_supplier_phone'] ? (Number)(settingObj['show_supplier_phone']) : 0;
      this.show_supplier_email = settingObj['show_supplier_email'] ? (Number)(settingObj['show_supplier_email']) : 0;
      this.show_supplier_delivery_timing = settingObj['show_supplier_delivery_timing'] ? (Number)(settingObj['show_supplier_delivery_timing']) : 0;
      this.show_supplier_open_close = settingObj['show_supplier_open_close'] ? (Number)(settingObj['show_supplier_open_close']) : 0;
      this.show_supplier_nationality = settingObj['show_supplier_nationality'] ? (Number)(settingObj['show_supplier_nationality']) : 0;
      this.show_supplier_speciality = settingObj['show_supplier_speciality'] ? (Number)(settingObj['show_supplier_speciality']) : 0;
      this.show_supplier_brand_name = settingObj['show_supplier_brand_name'] ? (Number)(settingObj['show_supplier_brand_name']) : 0;
    }

    this.is_near_by_supplier_enable = settingObj['is_near_by_supplier_enable'] ? (Number)(settingObj['is_near_by_supplier_enable']) : 0;
    this.is_zoom_call_enabled = settingObj['is_zoom_call_enabled'] ? (Number)(settingObj['is_zoom_call_enabled']) : 0;
    this.enable_tax_on_total_amt = settingObj['enable_tax_on_total_amt'] ? (Number)(settingObj['enable_tax_on_total_amt']) : 0;
    this.is_flavor_of_week_enable = settingObj['is_flavor_of_week_enable'] ? (Number)(settingObj['is_flavor_of_week_enable']) : 0;
    if (this.is_flavor_of_week_enable) {
      this.flavor_of_week = settingObj['flavor_of_week'] ? settingObj['flavor_of_week'] : '';
    }
    this.is_delivery_charge_weight_wise_enable = settingObj['is_delivery_charge_weight_wise_enable'] ?
      (Number)(settingObj['is_delivery_charge_weight_wise_enable']) : 0;

    this.is_eligible_order_amount = settingObj['is_eligible_order_amount'] ? (Number)(settingObj['is_eligible_order_amount']) : 0;
    this.eligible_order_amount = settingObj['eligible_order_amount'] ? (Number)(settingObj['eligible_order_amount']) : 0;
    this.is_enable_delivery_type = settingObj['is_enable_delivery_type'] ? (Number)(settingObj['is_enable_delivery_type']) : 0;
    this.is_enable_multiple_banner = settingObj['is_enable_multiple_banner'] ? (Number)(settingObj['is_enable_multiple_banner']) : 0;

    this.is_enable_orderwise_gateways = settingObj['is_enable_orderwise_gateways'] ? (Number)(settingObj['is_enable_orderwise_gateways']) : 0;

    this.dynamic_order_type_client_wise = settingObj['dynamic_order_type_client_wise'] ?
      (Number)(settingObj['dynamic_order_type_client_wise']) : 0;

    if (this.dynamic_order_type_client_wise) {
      this.dynamic_order_type_client_wise_delivery = (Number)(settingObj['dynamic_order_type_client_wise_delivery']) ?
        (Number)(settingObj['dynamic_order_type_client_wise_delivery']) : 0;
      this.dynamic_order_type_client_wise_pickup = (Number)(settingObj['dynamic_order_type_client_wise_pickup']) ?
        (Number)(settingObj['dynamic_order_type_client_wise_pickup']) : 0;
      if (this.is_table_booking) {
        this.dynamic_order_type_client_wise_dinein = (Number)(settingObj['dynamic_order_type_client_wise_dinein']) ?
          (Number)(settingObj['dynamic_order_type_client_wise_dinein']) : 0;
      }
    }

    this.enable_user_vehicle_number = settingObj['enable_user_vehicle_number'] ? (Number)(settingObj['enable_user_vehicle_number']) : 0;

    this.enable_rest_pagination_category_wise = settingObj['enable_rest_pagination_category_wise'] ?
      (Number)(settingObj['enable_rest_pagination_category_wise']) : 0;


    this.address_reference_char_limit = (Number)(settingObj['address_reference_char_limit']) || 0;

    this.enable_item_purchase_limit = settingObj['enable_item_purchase_limit'] ?
      (Number)(settingObj['enable_item_purchase_limit']) : 0;
    this.is_enable_subscription_required = settingObj['is_enable_subscription_required'] ?
      (Number)(settingObj['is_enable_subscription_required']) : 0;
    this.is_enable_max_discount_value = settingObj['is_enable_max_discount_value'] ?
      (Number)(settingObj['is_enable_max_discount_value']) : 0;


    this.enable_address_reference = settingObj['enable_address_reference'] ?
      (Number)(settingObj['enable_address_reference']) : 0;

    this.enable_referral_bal_limit = settingObj['enable_referral_bal_limit'] ?
      (Number)(settingObj['enable_referral_bal_limit']) : 0;
    if (this.enable_referral_bal_limit) {
      this.referral_bal_limit_per_order = settingObj['referral_bal_limit_per_order'] ?
        (Number)(settingObj['referral_bal_limit_per_order']) : 0;
    }

    this.enable_agent_leave_notes = settingObj['enable_agent_leave_notes'] ?
      (Number)(settingObj['enable_agent_leave_notes']) : 0;
    if (this.enable_agent_leave_notes) {
      this.leave_notes_reasons = settingObj['leave_notes_reasons'] || ''
    }

    this.enable_cutlery_option = settingObj['enable_cutlery_option'] ?
      (Number)(settingObj['enable_cutlery_option']) : 0;


    this.is_instance_selection = settingObj['is_instance_selection'] ?
      (Number)(settingObj['is_instance_selection']) : 0;
    this.enable_in_out_network = settingObj['enable_in_out_network'] ?
      (Number)(settingObj['enable_in_out_network']) : 0;

    this.enable_audio_video = settingObj['enable_audio_video'] ?
      (Number)(settingObj['enable_audio_video']) : 0;

    this.enable_contact_us = settingObj['enable_contact_us'] ?
      (Number)(settingObj['enable_contact_us']) : 0;
    this.enable_date_of_birth = settingObj['enable_date_of_birth'] ?
      (Number)(settingObj['enable_date_of_birth']) : 0;

    this.dynamic_home_screen_sections = settingObj['dynamic_home_screen_sections'] ?
      (Number)(settingObj['dynamic_home_screen_sections']) : 0;
    if (this.dynamic_home_screen_sections) {
      this.home_screen_sections = settingObj['home_screen_sections'] ? JSON.parse(settingObj['home_screen_sections']) : null;
      if (this.home_screen_sections) {
        this.home_screen_sections = this.home_screen_sections.sort(function (a, b) { return a.section_place - b.section_place });
        this.trending_rest_section = this.home_screen_sections.find(x => x.code == 'trending_rest');
        this.special_offer_section = this.home_screen_sections.find(x => x.code == 'special_offer');
        this.best_seller_section = this.home_screen_sections.find(x => x.code == 'best_seller');
        this.top_selling_section = this.home_screen_sections.find(x => x.code == 'top_selling');
        this.fastest_del_section = this.home_screen_sections.find(x => x.code == 'fastest_del');
        this.recomm_items_section = this.home_screen_sections.find(x => x.code == 'recomm_items');
        this.near_you_section = this.home_screen_sections.find(x => x.code == 'near_you');
        this.cat_wise_rest_section = this.home_screen_sections.find(x => x.code == 'category_wise_rest');
        this.rating_wise_rest_section = this.home_screen_sections.find(x => x.code == 'highest_rating_resturant');
        this.new_rest_section = this.home_screen_sections.find(x => x.code == 'new_resturant');
        this.recent_order_section = this.home_screen_sections.find(x => x.code == 'recent_orders');

      }
    }

    this.enable_food_varients = settingObj['enable_food_varients'] ?
      (Number)(settingObj['enable_food_varients']) : 0;

    this.enable_freelancer_flow = settingObj['enable_freelancer_flow'] ?
      (Number)(settingObj['enable_freelancer_flow']) : 0;

    this.enable_rating_wise_sorting = settingObj['enable_rating_wise_sorting'] ?
      (Number)(settingObj['enable_rating_wise_sorting']) : 0;

    this.is_twilio_authy_enable = settingObj['is_twilio_authy_enable'] ?
      (Number)(settingObj['is_twilio_authy_enable']) : 0;

    this.is_number_masking_enable = settingObj['is_number_masking_enable'] ?
      (Number)(settingObj['is_number_masking_enable']) : 0;

    this.enable_flat_user_service_charge = settingObj['enable_flat_user_service_charge'] ?
      (Number)(settingObj['enable_flat_user_service_charge']) : 0;

    this.enable_product_allergy = settingObj['enable_product_allergy'] ?
      (Number)(settingObj['enable_product_allergy']) : 0;


    this.enable_supplier_review_list = settingObj['enable_supplier_review_list'] ?
      (Number)(settingObj['enable_supplier_review_list']) : 0;
    this.enable_supplier_promo_list = settingObj['enable_supplier_promo_list'] ?
      (Number)(settingObj['enable_supplier_promo_list']) : 0;

    this.enable_supplier_in_special_offer = settingObj['enable_supplier_in_special_offer'] ?
      (Number)(settingObj['enable_supplier_in_special_offer']) : 0;

    this.table_book_mac_theme = settingObj['table_book_mac_theme'] ?
      (Number)(settingObj['table_book_mac_theme']) : 0;

    this.is_multicurrency_enable = settingObj['is_multicurrency_enable'] ?
      (Number)(settingObj['is_multicurrency_enable']) : 0;

    this.enable_min_loyality_points = settingObj['enable_min_loyality_points'] ?
      (Number)(settingObj['enable_min_loyality_points']) : 0;

    if (this.enable_min_loyality_points) {
      this.min_loyalty_points_to_redeem = settingObj['min_loyalty_points_to_redeem'] ?
        (Number)(settingObj['min_loyalty_points_to_redeem']) : 0;
      this.min_order_amount_for_loyality_points = settingObj['min_order_amount_for_loyality_points'] ?
        (Number)(settingObj['min_order_amount_for_loyality_points']) : 0;
      this.loyality_point_per_order = settingObj['loyality_point_per_order'] ?
        (Number)(settingObj['loyality_point_per_order']) : 0;
      this.loyality_point_value = settingObj['loyality_point_value'] ?
        (Number)(settingObj['loyality_point_value']) : 0;
    }

    this.enable_non_veg_filter = settingObj['enable_non_veg_filter'] ?
      (Number)(settingObj['enable_non_veg_filter']) : 0;

    this.enable_signup_phone_only = settingObj['enable_signup_phone_only'] ?
      (Number)(settingObj['enable_signup_phone_only']) : 0;

    this.enable_product_special_instruction = settingObj['enable_product_special_instruction'] ?
      (Number)(settingObj['enable_product_special_instruction']) : 0;
    if (this.enable_product_special_instruction) {
      this.enable_product_wise_special_instruction = settingObj['enable_product_wise_special_instruction'] ?
        (Number)(settingObj['enable_product_wise_special_instruction']) : 0;
    }

    this.enable_zone_geofence = settingObj['enable_zone_geofence'] ?
      (Number)(settingObj['enable_zone_geofence']) : 0;

    this.enable_sequence_wise_supplier = settingObj['enable_sequence_wise_supplier'] ?
      (Number)(settingObj['enable_sequence_wise_supplier']) : 0;

    this.enable_no_touch_delivery = settingObj['enable_no_touch_delivery'] ?
      (Number)(settingObj['enable_no_touch_delivery']) : 0;

    this.display_slot_with_difference = settingObj['display_slot_with_difference'] ?
      (Number)(settingObj['display_slot_with_difference']) : 0;

    this.enable_video_in_banner = settingObj['enable_video_in_banner'] ?
      (Number)(settingObj['enable_video_in_banner']) : 0;

    this.is_flash_sale = settingObj['is_flash_sale'] ?
      (Number)(settingObj['is_flash_sale']) : 0;

    this.plt_liquor_tax = settingObj['plt_liquor_tax'] ?
      (Number)(settingObj['plt_liquor_tax']) : 0;

    this.liquor_bottle_tax = settingObj['liquor_bottle_tax'] ?
      (Number)(settingObj['liquor_bottle_tax']) : 0;
    this.liquor_bottle_tax_without_customization = settingObj['liquor_bottle_tax_without_customization'] ?
      (Number)(settingObj['liquor_bottle_tax_without_customization']) : 0;

    this.enable_liquor_popup = settingObj['enable_liquor_popup'] ?
      (Number)(settingObj['enable_liquor_popup']) : 0;

    this.enable_agent_signup_web = settingObj['enable_agent_signup_web'] ?
      (Number)(settingObj['enable_agent_signup_web']) : 0;
    if (this.enable_agent_signup_web) {
      this.hide_agent_signup_web_about_us = settingObj['hide_agent_signup_web_about_us'] ?
        (Number)(settingObj['hide_agent_signup_web_about_us']) : 0;
    }
    this.enable_agent_signup_web_footer = settingObj['enable_agent_signup_web_footer'] ?
      (Number)(settingObj['enable_agent_signup_web_footer']) : 0;

    this.enable_default_agent_tip = settingObj['enable_default_agent_tip'] ?
      (Number)(settingObj['enable_default_agent_tip']) : 0;

    this.enable_comma_separation_text = settingObj['enable_comma_separation_text'] ?
      (Number)(settingObj['enable_comma_separation_text']) : 0;

    this.enable_custom_gst = settingObj['enable_custom_gst'] ?
      (Number)(settingObj['enable_custom_gst']) : 0;

    this.custom_tax_value = settingObj['custom_tax_value'] ?
      (Number)(settingObj['custom_tax_value']) : 0;

    this.disable_tip_multiple_addition = settingObj['disable_tip_multiple_addition'] ?
      (Number)(settingObj['disable_tip_multiple_addition']) : 0;

    this.enable_custom_pages = settingObj['enable_custom_pages'] ?
      (Number)(settingObj['enable_custom_pages']) : 0;

    this.enable_food_current_location = settingObj['enable_food_current_location'] ?
      (Number)(settingObj['enable_food_current_location']) : 0;

    this.disable_phone_flag_selection = settingObj['disable_phone_flag_selection'] ?
      (Number)(settingObj['disable_phone_flag_selection']) : 0;

    this.hide_download_section = settingObj['hide_download_section'] ?
      (Number)(settingObj['hide_download_section']) : 0;

    this.enable_food_theme2_horizontal_view = settingObj['enable_food_theme2_horizontal_view'] ?
      (Number)(settingObj['enable_food_theme2_horizontal_view']) : 0;

    this.enable_what3words_map = settingObj['enable_what3words_map'] ?
      (Number)(settingObj['enable_what3words_map']) : 0;

    this.enable_gateway_postal_code = settingObj['enable_gateway_postal_code'] ?
      (Number)(settingObj['enable_gateway_postal_code']) : 0;

    this.set_header_ratio_equal = settingObj['set_header_ratio_equal'] ?
      (Number)(settingObj['set_header_ratio_equal']) : 0;

    this.hide_flag = settingObj['hide_flag'] ?
      (Number)(settingObj['hide_flag']) : 0;

    this.enable_fixed_delivery_charges = settingObj['enable_fixed_delivery_charges'] ?
      (Number)(settingObj['enable_fixed_delivery_charges']) : 0;

    if (this.enable_fixed_delivery_charges) {
      this.fixed_delivery_charge_value = settingObj['fixed_delivery_charge_value'] ?
        (Number)(settingObj['fixed_delivery_charge_value']) : 0;
      this.fixed_delivery_charge_radius_exceed_value = settingObj['fixed_delivery_charge_radius_exceed_value'] ?
        (Number)(settingObj['fixed_delivery_charge_radius_exceed_value']) : 0;
    }

    this.enable_supplier_express_schedule_delivery_provide = settingObj['enable_supplier_express_schedule_delivery_provide'] ?
      (Number)(settingObj['enable_supplier_express_schedule_delivery_provide']) : 0;
    this.express_delivery_charges = settingObj['express_delivery_charges'] ?
      (Number)(settingObj['express_delivery_charges']) : 7;


    this.enable_order_amount_for_free_delivery = settingObj['enable_order_amount_for_free_delivery'] ?
      (Number)(settingObj['enable_order_amount_for_free_delivery']) : 0;
    this.enable_mosich_delivery_charge_algo = settingObj['enable_mosich_delivery_charge_algo'] ?
      (Number)(settingObj['enable_mosich_delivery_charge_algo']) : 0;

    this.display_order_free_delivery_popup = settingObj['display_order_free_delivery_popup'] ?
      (Number)(settingObj['display_order_free_delivery_popup']) : 0;

    this.skip_payment_option = settingObj['skip_payment_option'] ?
      (Number)(settingObj['skip_payment_option']) : 0;

    this.enable_custom_footer_home_service = settingObj['enable_custom_footer_home_service'] ?
      (Number)(settingObj['enable_custom_footer_home_service']) : 0;

    this.hide_left_section = settingObj['hide_left_section'] ?
      (Number)(settingObj['hide_left_section']) : 0;

    this.enable_product_calories = settingObj['enable_product_calories'] ?
      (Number)(settingObj['enable_product_calories']) : 0;

    this.home_category_limit = settingObj['home_category_limit'] ?
      (Number)(settingObj['home_category_limit']) : 12;

    this.home_category_border_radius = (settingObj['home_category_border_radius'] && (Number)(settingObj['home_category_border_radius'])) ?
      (Number)(settingObj['home_category_border_radius']) : 50;

    this.exclude_tax_in_total = settingObj['exclude_tax_in_total'] ?
      (Number)(settingObj['exclude_tax_in_total']) : 0;

    this.display_calc_product_price_in_cart = settingObj['display_calc_product_price_in_cart'] ?
      (Number)(settingObj['display_calc_product_price_in_cart']) : 0;

    this.hide_contact_details = settingObj['hide_contact_details'] ?
      (Number)(settingObj['hide_contact_details']) : 0;


    this.disable_mobile_footer = settingObj['disable_mobile_footer'] ?
      (Number)(settingObj['disable_mobile_footer']) : 0;

    this.enable_coming_soon_flow = settingObj['enable_coming_soon_flow'] ?
      (Number)(settingObj['enable_coming_soon_flow']) : 0;

    this.toast_top_center_pos = settingObj['toast_top_center_pos'] ?
      (Number)(settingObj['toast_top_center_pos']) : 0;

    this.hide_addOncharges = settingObj['hide_addOncharges'] ?
      (Number)(settingObj['hide_addOncharges']) : 0;

    this.enable_supplier_config_closing_day = settingObj['enable_supplier_config_closing_day'] ?
      (Number)(settingObj['enable_supplier_config_closing_day']) : 0;

    this.enable_website_font_family = settingObj['enable_website_font_family'] ?
      (Number)(settingObj['enable_website_font_family']) : 0;
    if (this.enable_website_font_family) {
      this.website_font_family = settingObj['website_font_family'] || 'Gilroy';
    }

    this.enable_knock_theme = settingObj['enable_knock_theme'] ?
      (Number)(settingObj['enable_knock_theme']) : 0;

    this.hide_product_detail_image_list = settingObj['hide_product_detail_image_list'] ?
      (Number)(settingObj['hide_product_detail_image_list']) : 0;

    this.hide_tax_for_user = settingObj['hide_tax_for_user'] ?
      (Number)(settingObj['hide_tax_for_user']) : 0;

    this.price_decimal_zero = settingObj['price_decimal_zero'] ?
      parseInt(settingObj['price_decimal_zero']) : 0;

    if (this.price_decimal_zero) {
      this.price_decimal_length = 0;
    }

    this.hide_product_filter = settingObj['hide_product_filter'] ?
      parseInt(settingObj['hide_product_filter']) : 0;

    this.hide_processing_step = settingObj['hide_processing_step'] ?
      parseInt(settingObj['hide_processing_step']) : 0;

    this.hide_process_complete_status = settingObj['hide_process_complete_status'] ?
      parseInt(settingObj['hide_process_complete_status']) : 0;

    this.enable_whatsapp_floating_chat = settingObj['enable_whatsapp_floating_chat'] ?
      parseInt(settingObj['enable_whatsapp_floating_chat']) : 0;

    this.enable_supplier_sorting_by_distance = settingObj['enable_supplier_sorting_by_distance'] ?
      parseInt(settingObj['enable_supplier_sorting_by_distance']) : 0;

    this.enable_surge_price = settingObj['enable_surge_price'] ?
      parseInt(settingObj['enable_surge_price']) : 0;

    this.enable_name_validation = settingObj['enable_name_validation'] ?
      parseInt(settingObj['enable_name_validation']) : 0;

    this.enable_sidebar_selection = settingObj['enable_sidebar_selection'] ?
      parseInt(settingObj['enable_sidebar_selection']) : 0;
    // this.show_slick_arrows = 0;
    this.show_slick_arrows = settingObj['show_slick_arrows'] ?
      parseInt(settingObj['show_slick_arrows']) : 0;

    this.hide_product_rating = settingObj['hide_product_rating'] ?
      parseInt(settingObj['hide_product_rating']) : 0;

    this.enable_autoplay_slick = settingObj['enable_autoplay_slick'] ?
      parseInt(settingObj['enable_autoplay_slick']) : 0;

    this.enable_split_address = settingObj['enable_split_address'] ?
      parseInt(settingObj['enable_split_address']) : 0;

    this.hide_pending_status = settingObj['hide_pending_status'] ?
      parseInt(settingObj['hide_pending_status']) : 0;

    this.change_currency_accordingTo_lang = settingObj['change_currency_accordingTo_lang'] ?
      parseInt(settingObj['change_currency_accordingTo_lang']) : 0;

    this.hide_agent_rating = settingObj['hide_agent_rating'] ?
      parseInt(settingObj['hide_agent_rating']) : 0;

    this.enable_custom_agent_tip = settingObj['enable_custom_agent_tip'] ?
      (Number)(settingObj['enable_custom_agent_tip']) : 0;
    if (this.enable_custom_agent_tip) {
      this.custom_agent_tip_min_value = settingObj['custom_agent_tip_min_value'] ?
        (Number)(settingObj['custom_agent_tip_min_value']) : 0;
    }
    this.enable_add_more_item_redirect = settingObj['enable_add_more_item_redirect'] ?
      (Number)(settingObj['enable_add_more_item_redirect']) : 0;
    this.enable_every_item_remove_alert = settingObj['enable_every_item_remove_alert'] ?
      (Number)(settingObj['enable_every_item_remove_alert']) : 0;
    this.enable_custom_tax_static = settingObj['enable_custom_tax_static'] ?
      (Number)(settingObj['enable_custom_tax_static']) : 0;
    if (this.enable_custom_tax_static) {
      this.custom_tax_static_value = settingObj['custom_tax_static_value'] ?
        (Number)(settingObj['custom_tax_static_value']) : 0;
      this.custom_tax_static_value_flat = settingObj['custom_tax_static_value_flat'] ?
        (Number)(settingObj['custom_tax_static_value_flat']) : 0;
    }

    this.enable_cctv = settingObj['enable_cctv'] ?
      (Number)(settingObj['enable_cctv']) : 0;
    this.enable_cctv_for_web = settingObj['enable_cctv_for_web'] ?
      (Number)(settingObj['enable_cctv_for_web']) : 0;

    this.cart_location_change = settingObj['cart_location_change'] ?
      (Number)(settingObj['cart_location_change']) : 0;

    this.show_location_icon_black = settingObj['show_location_icon_black'] ?
      (Number)(settingObj['show_location_icon_black']) : 0;

    this.enable_fees_estimated_tax_contant = settingObj['enable_fees_estimated_tax_contant'] ?
      (Number)(settingObj['enable_fees_estimated_tax_contant']) : 0;

    this.enable_apps_link_in_mobile_footer = settingObj['enable_apps_link_in_mobile_footer'] ?
      (Number)(settingObj['enable_apps_link_in_mobile_footer']) : 0;

    this.addon_decimal_value = settingObj['addon_decimal_value'] ?
      (settingObj['addon_decimal_value']) : '1.2-2';

    this.is_landing_category_two_in_row = settingObj['is_landing_category_two_in_row'] ?
      (Number)(settingObj['is_landing_category_two_in_row']) : 0;

    this.preparation_time_adding_to_expected_delivery_time = settingObj['preparation_time_adding_to_expected_delivery_time'] ?
      (Number)(settingObj['preparation_time_adding_to_expected_delivery_time']) : 0;

    this.show_closed_by_time = settingObj['show_closed_by_time'] ?
      (Number)(settingObj['show_closed_by_time']) : 0;

    this.enable_services_customize_flow = settingObj['enable_services_customize_flow'] ?
      (Number)(settingObj['enable_services_customize_flow']) : 0;

    this.enable_extra_product_service = settingObj['enable_extra_product_service'] ?
      (Number)(settingObj['enable_extra_product_service']) : 0;

    this.hide_supplier_detail = settingObj['hide_supplier_detail'] ?
      (Number)(settingObj['hide_supplier_detail']) : 0;

    this.enable_sign_up_form_confirm_password = settingObj['enable_sign_up_form_confirm_password'] ?
      (Number)(settingObj['enable_sign_up_form_confirm_password']) : 0;

    this.hide_verify_dinin_table_no = settingObj['hide_verify_dinin_table_no'] ?
      (Number)(settingObj['hide_verify_dinin_table_no']) : 0;

    this.social_login_icon_format = settingObj['social_login_icon_format'] ?
      (Number)(settingObj['social_login_icon_format']) : 0;

    this.show_table_details_on_cart_page = settingObj['show_table_details_on_cart_page'] ?
      (Number)(settingObj['show_table_details_on_cart_page']) : 0;

    this.enable_custom_orderId = settingObj['enable_custom_orderId'] ?
      (Number)(settingObj['enable_custom_orderId']) : 0;

    this.hide_slots_by_time = settingObj['hide_slots_by_time'] ?
      (Number)(settingObj['hide_slots_by_time']) : 0;

    this.hide_start_end_time = settingObj['hide_start_end_time'] ?
      (Number)(settingObj['hide_start_end_time']) : 0;

    this.count_customization_items = settingObj['count_customization_items'] ?
      (Number)(settingObj['count_customization_items']) : 0;

    this.remove_price_in_customisation = settingObj['remove_price_in_customisation'] ?
      (Number)(settingObj['remove_price_in_customisation']) : 0;

    this.hide_qty_button = settingObj['hide_qty_button'] ?
      (Number)(settingObj['hide_qty_button']) : 0;

    this.enable_optional_image_upload = settingObj['enable_optional_image_upload'] ?
      (Number)(settingObj['enable_optional_image_upload']) : 0;

    this.show_agent_extra_charge = settingObj['show_agent_extra_charge'] ?
      (Number)(settingObj['show_agent_extra_charge']) : 0;

    this.enable_pay_agent_extra_charge = settingObj['enable_pay_agent_extra_charge'] ?
      (Number)(settingObj['enable_pay_agent_extra_charge']) : 0;

    this.enable_booking_gap_two_hrs = settingObj['enable_booking_gap_two_hrs'] ?
      (Number)(settingObj['enable_booking_gap_two_hrs']) : 0;

    this.count_customized_service_duration = settingObj['count_customized_service_duration'] ?
      (Number)(settingObj['count_customized_service_duration']) : 0;


    this.login_page_disclaimer = settingObj['login_page_disclaimer'] ?
      (Number)(settingObj['login_page_disclaimer']) : 0

    this.enable_wala_theme = settingObj['enable_wala_theme'] ?
      (Number)(settingObj['enable_wala_theme']) : 0;

    this.doc_rating_upload = settingObj['doc_rating_upload'] ?
      (Number)(settingObj['doc_rating_upload']) : 0;

    this.set_filter_button_to_center = settingObj['set_filter_button_to_center'] ?
      (Number)(settingObj['set_filter_button_to_center']) : 0;

    this.disable_slot_selection_2_to_5 = settingObj['disable_slot_selection_2_to_5'] ?
      (Number)(settingObj['disable_slot_selection_2_to_5']) : 0;

    this.enable_emoticon_rating = settingObj['enable_emoticon_rating'] ?
      (Number)(settingObj['enable_emoticon_rating']) : 0;

    this.show_edit_order_description = settingObj['show_edit_order_description'] ?
      (Number)(settingObj['show_edit_order_description']) : 0;


    this.enable_banner_title = settingObj['enable_banner_title'] ?
      (Number)(settingObj['enable_banner_title']) : 0;
    if (this.enable_banner_title) {
      this.banner_title_text = settingObj['banner_title_text'] ?
        settingObj['banner_title_text'] : 'Welcome!';
      this.banner_title_text_ol = settingObj['banner_title_text_ol'] ?
        settingObj['banner_title_text_ol'] : 'Welcome!';
    }

    this.enable_no_of_client_to_be_served = settingObj['enable_no_of_client_to_be_served'] ?
      (Number)(settingObj['enable_no_of_client_to_be_served']) : 0;

    this.enable_sub_banners = settingObj['enable_sub_banners'] ?
      (Number)(settingObj['enable_sub_banners']) : 0;

    this.enable_banner_shade = settingObj['enable_banner_shade'] ?
      (Number)(settingObj['enable_banner_shade']) : 0;

    this.enable_one_vendor_items_in_cart = settingObj['enable_one_vendor_item_in_cart'] ?
      (Number)(settingObj['enable_one_vendor_item_in_cart']) : 0;


    this.enable_image_format_manage = settingObj['enable_image_format_manage'] ?
      (Number)(settingObj['enable_image_format_manage']) : 0;

    this.social_media_icons_horizontally_aligned = settingObj['social_media_icons_horizontally_aligned'] ?
      (Number)(settingObj['social_media_icons_horizontally_aligned']) : 0;

    this.show_cancellation_and_refund_policy = settingObj['show_cancellation_and_refund_policy'] ?
      (Number)(settingObj['show_cancellation_and_refund_policy']) : 0;

    this.show_cookie_policy = settingObj['show_cookie_policy'] ?
      (Number)(settingObj['show_cookie_policy']) : 0;
    if (this.show_cookie_policy) {
      this.cookies_policy_contant = settingObj['cookies_policy_contant'] ?
        settingObj['cookies_policy_contant'] : '';
      this.cookies_policy_contant_ol = settingObj['cookies_policy_contant_ol'] ?
        settingObj['cookies_policy_contant_ol'] : '';
    }

    this.enable_adding_multiplefields_in_web = settingObj['enable_adding_multiplefields_in_web'] ?
      (Number)(settingObj['enable_adding_multiplefields_in_web']) : 0;

    this.price_surge_with_geo_fencing = settingObj['price_surge_with_geo_fencing'] ?
      (Number)(settingObj['price_surge_with_geo_fencing']) : 0;

    this.emailVerification = settingObj['emailVerification'] ?
      (Number)(settingObj['emailVerification']) : 0;

    this.show_add_button_for_product_varient = settingObj['show_add_button_for_product_varient'] ?
      (Number)(settingObj['show_add_button_for_product_varient']) : 0;

    this.enable_different_delivery_status_handling = settingObj['enable_different_delivery_status_handling'] ?
      (Number)(settingObj['enable_different_delivery_status_handling']) : 0;

    this.enable_payment_option_for_dine_in = settingObj['enable_payment_option_for_dine_in'] ?
      (Number)(settingObj['enable_payment_option_for_dine_in']) : 0;
    this.disable_service_fee_pickup = settingObj['disable_service_fee_pickup'] ?
      (Number)(settingObj['disable_service_fee_pickup']) : 0;

    this.enable_agent_review_list = settingObj['enable_agent_review_list'] ?
      (Number)(settingObj['enable_agent_review_list']) : 0;

    this.enable_food_extra_placeholders = settingObj['enable_food_extra_placeholders'] ?
      (Number)(settingObj['enable_food_extra_placeholders']) : 0;

    this.enable_agent_tip_all_pay_mode = settingObj['enable_agent_tip_all_pay_mode'] ?
      (Number)(settingObj['enable_agent_tip_all_pay_mode']) : 0;

    this.show_service_image = settingObj['show_service_image'] ?
      (Number)(settingObj['show_service_image']) : 0;

    this.show_currency_after_amount = settingObj['show_currency_after_amount'] ?
      (Number)(settingObj['show_currency_after_amount']) : 0;

    this.minimum_order_fee = settingObj['minimum_order_fee'] ?
      (Number)(settingObj['minimum_order_fee']) : 0;

    this.minimum_subtotal_for_small_order_fee = settingObj['minimum_subtotal_for_small_order_fee'] ?
      (Number)(settingObj['minimum_subtotal_for_small_order_fee']) : 0;

    this.small_order_fee = settingObj['small_order_fee'] ?
      (Number)(settingObj['small_order_fee']) : 0;
    this.enable_location_denied_warning = settingObj['enable_location_denied_warning'] ?
      (Number)(settingObj['enable_location_denied_warning']) : 0;

    this.hide_rating_supplier_detail = settingObj['hide_rating_supplier_detail'] ?
      (Number)(settingObj['hide_rating_supplier_detail']) : 0;

    this.enable_product_suggestions_cart = settingObj['enable_product_suggestions_cart'] ?
      (Number)(settingObj['enable_product_suggestions_cart']) : 0;

    this.enable_multiple_table_booking_at_once = settingObj['enable_multiple_table_booking_at_once'] ?
      (Number)(settingObj['enable_multiple_table_booking_at_once']) : 0;

    this.copy_right_section_contant = settingObj['copy_right_section_contant'] ?
      settingObj['copy_right_section_contant'] : '';

    this.copy_right_section_contant_ol = settingObj['copy_right_section_contant_ol'] ?
      settingObj['copy_right_section_contant_ol'] : '';

    this.enable_slots_clear_alert_on_cart = settingObj['enable_slots_clear_alert_on_cart'] ?
      (Number)(settingObj['enable_slots_clear_alert_on_cart']) : 0;

    this.enable_grid_view_category = settingObj['enable_grid_view_category']
      ? (Number)(settingObj['enable_grid_view_category']) : 0;

    this.hide_inside_category = settingObj['hide_inside_category']
      ? (Number)(settingObj['hide_inside_category']) : 0;

    this.hide_cod_on_dinin_order_type = settingObj['hide_cod_on_dinin_order_type']
      ? (Number)(settingObj['hide_cod_on_dinin_order_type']) : 0;

    this.self_pickup_in_update_cart_info = settingObj['self_pickup_in_update_cart_info']
      ? (Number)(settingObj['self_pickup_in_update_cart_info']) : 0;
    this.enable_cancel_order_after_confirmation = settingObj['enable_cancel_order_after_confirmation']
      ? (Number)(settingObj['enable_cancel_order_after_confirmation']) : 0;

    this.enable_manual_user_address = settingObj['enable_manual_user_address']
      ? (Number)(settingObj['enable_manual_user_address']) : 0;
    this.enable_town_in_address = settingObj['enable_town_in_address']
      ? (Number)(settingObj['enable_town_in_address']) : 0;
    this.enable_state_in_address = settingObj['enable_state_in_address']
      ? (Number)(settingObj['enable_state_in_address']) : 0;
    this.enable_pincode_in_address = settingObj['enable_pincode_in_address']
      ? (Number)(settingObj['enable_pincode_in_address']) : 0;

    this.enable_logo_in_copy_right_section = settingObj['enable_logo_in_copy_right_section']
      ? (Number)(settingObj['enable_logo_in_copy_right_section']) : 0;

    this.hide_signup_links_from_footer = settingObj['hide_signup_links_from_footer']
      ? (Number)(settingObj['hide_signup_links_from_footer']) : 0;

    this.enable_cod_max_amount_limit = settingObj['enable_cod_max_amount_limit'] ?
      (Number)(settingObj['enable_cod_max_amount_limit']) : 0;

    if (this.enable_cod_max_amount_limit) {
      this.cod_max_amount_limit = settingObj['cod_max_amount_limit'] ?
        (Number)(settingObj['cod_max_amount_limit']) : 500;
    }

    this.hide_review_title = settingObj['hide_review_title'] ?
      (Number)(settingObj['hide_review_title']) : 0;

    this.display_price_unit = settingObj['display_price_unit'] ?
      (Number)(settingObj['display_price_unit']) : 0;

    this.site_name_change = settingObj['site_name_change'] ?
      (Number)(settingObj['site_name_change']) : 0;

    this.change_argentina_to_saudi_arabia_flag_icon = settingObj['change_argentina_to_saudi_arabia_flag_icon'] ?
      (Number)(settingObj['change_argentina_to_saudi_arabia_flag_icon']) : 0;

    this.include_loyalty_in_net_total = settingObj['include_loyalty_in_net_total'] ?
      (Number)(settingObj['include_loyalty_in_net_total']) : 0;

    this.display_all_supplier_home = settingObj['display_all_supplier_home'] ?
      (Number)(settingObj['display_all_supplier_home']) : 0;

    this.hide_category_supplier_home = settingObj['hide_category_supplier_home'] ?
      (Number)(settingObj['hide_category_supplier_home']) : 0;

    this.enable_refund_request_category = settingObj['enable_refund_request_category'] ?
      (Number)(settingObj['enable_refund_request_category']) : 0;

    this.hide_add_card_form = settingObj['hide_add_card_form'] ?
      (Number)(settingObj['hide_add_card_form']) : 0;

    this.add_product_within_13km = settingObj['add_product_within_13km'] ?
      (Number)(settingObj['add_product_within_13km']) : 0;

    this.fix_header_logo_dimensions = settingObj['fix_header_logo_dimensions'] ?
      (Number)(settingObj['fix_header_logo_dimensions']) : 0;

    this.show_eight_popular_products = settingObj['show_eight_popular_products'] ?
      (Number)(settingObj['show_eight_popular_products']) : 0;

    this.enable_agent_vehicle_model = settingObj['enable_agent_vehicle_model'] ?
      (Number)(settingObj['enable_agent_vehicle_model']) : 0;
    this.enable_agent_vehicle_maker = settingObj['enable_agent_vehicle_maker'] ?
      (Number)(settingObj['enable_agent_vehicle_maker']) : 0;
    this.enable_agent_vehicle_year = settingObj['enable_agent_vehicle_year'] ?
      (Number)(settingObj['enable_agent_vehicle_year']) : 0;
    this.enable_agent_vehicle_vin = settingObj['enable_agent_vehicle_vin'] ?
      (Number)(settingObj['enable_agent_vehicle_vin']) : 0;
    this.enable_user_subscriptin_supplier = settingObj['enable_user_subscriptin_supplier'] ?
      (Number)(settingObj['enable_user_subscriptin_supplier']) : 0;
    this.add_rounded_off_tax_to_subtotal = settingObj['add_rounded_off_tax_to_subtotal'] ?
      (Number)(settingObj['add_rounded_off_tax_to_subtotal']) : 0;
    this.shift_recommended_supplier_above_grocery_products = settingObj['shift_recommended_supplier_above_grocery_products'] ?
      (Number)(settingObj['shift_recommended_supplier_above_grocery_products']) : 0;
    this.show_payment_model_after_update_info_api = settingObj['show_payment_model_after_update_info_api'] ?
      (Number)(settingObj['show_payment_model_after_update_info_api']) : 0;


    this.enable_forgot_password_via_phone_number = settingObj['enable_forgot_password_via_phone_number'] ?
      (Number)(settingObj['enable_forgot_password_via_phone_number']) : 0;

    this.enable_i_delivered_theme = settingObj['enable_i_delivered_theme'] ?
      (Number)(settingObj['enable_i_delivered_theme']) : 0;

    this.enable_vendor_reg_via_link = settingObj['enable_vendor_reg_via_link'] ?
      (Number)(settingObj['enable_vendor_reg_via_link']) : 0;

    this.hide_popup_text_service_will_remove_from_the_cart = settingObj['hide_popup_text_service_will_remove_from_the_cart'] ?
      (Number)(settingObj['hide_popup_text_service_will_remove_from_the_cart']) : 0;

    this.by_default_show_red_on_confirmed_status_of_order = settingObj['by_default_show_red_on_confirmed_status_of_order'] ?
      (Number)(settingObj['by_default_show_red_on_confirmed_status_of_order']) : 0;

    this.hide_homeservice_cleaning_selected_title_from_cart = settingObj['hide_homeservice_cleaning_selected_title_from_cart'] ?
      (Number)(settingObj['hide_homeservice_cleaning_selected_title_from_cart']) : 0;

    this.hide_homeservice_total_price_show_with_service_after_booking = settingObj['hide_homeservice_total_price_show_with_service_after_booking'] ?
      (Number)(settingObj['hide_homeservice_total_price_show_with_service_after_booking']) : 0;

    this.saned_remove_button = settingObj['saned_remove_button'] ?
      (Number)(settingObj['saned_remove_button']) : 0;

    this.require_date_of_birth = settingObj['require_date_of_birth'] ?
      (Number)(settingObj['require_date_of_birth']) : 0;

    this.is_country_code_enabled = settingObj['is_country_code_enabled'] ?
      (Number)(settingObj['is_country_code_enabled']) : 0;

    this.disable_cancel_order_after_admin_provided_time = settingObj['disable_cancel_order_after_admin_provided_time'] ?
      (Number)(settingObj['disable_cancel_order_after_admin_provided_time']) : 0;

    this.max_cancellation_waiting_time = settingObj['max_cancellation_waiting_time'] ?
      (Number)(settingObj['max_cancellation_waiting_time']) : 0;

    this.display_logo_in_center = settingObj['display_logo_in_center'] ?
      (Number)(settingObj['display_logo_in_center']) : 0;
    this.hide_back_button_of_add_on = settingObj['hide_back_button_of_add_on'] ?
      (Number)(settingObj['hide_back_button_of_add_on']) : 0;

    this.hide_atleast_from_popup = settingObj['hide_atleast_from_popup'] ?
      (Number)(settingObj['hide_atleast_from_popup']) : 0;

    this.enable_radiobutton_in_both_indicate_curser = settingObj['enable_radiobutton_in_both_indicate_curser'] ?
      (Number)(settingObj['enable_radiobutton_in_both_indicate_curser']) : 0;

    this.change_remove_botton_position = settingObj['change_remove_botton_position'] ?
      (Number)(settingObj['change_remove_botton_position']) : 0;

    this.display_supplier_phone_info = settingObj['display_supplier_phone_info'] ?
      (Number)(settingObj['display_supplier_phone_info']) : 0;

      this.display_login_signup_menu = settingObj['display_login_signup_menu']? 
      (Number)(settingObj['display_login_signup_menu']) : 0;

      this.hide_search_placeholder = settingObj['hide_search_placeholder']? 
      (Number)(settingObj['hide_search_placeholder']) : 0;

      this.set_logo_fit_cover = settingObj['set_logo_fit_cover']? 
      (Number)(settingObj['set_logo_fit_cover']) : 0;

      this.send_null_in_customer_address = settingObj['send_null_in_customer_address']? 
      (Number)(settingObj['send_null_in_customer_address']) : 0;

      this.display_cart_text = settingObj['display_cart_text']? 
      (Number)(settingObj['display_cart_text']) : 0;

      this.display_cart_floating_icon = settingObj['display_cart_floating_icon']? 
      (Number)(settingObj['display_cart_floating_icon']) : 0;

      this.display_language_menu_function = settingObj['display_language_menu_function']? 
      (Number)(settingObj['display_language_menu_function']) : 0;

      this.enable_order_scheduling_for_closed_vendors = settingObj['enable_order_scheduling_for_closed_vendors']? 
      (Number)(settingObj['enable_order_scheduling_for_closed_vendors']) : 0;
      this.show_currency_flag = settingObj['show_currency_flag']? 
      (Number)(settingObj['show_currency_flag']) : 0;

      this.hide_currency_symbol = settingObj['hide_currency_symbol']? 
      (Number)(settingObj['hide_currency_symbol']) : 0;

      this.enable_orderdate_translate = settingObj['enable_orderdate_translate']? 
      (Number)(settingObj['enable_orderdate_translate']) : 0; 

      this.home_category_image_border_radius = settingObj['home_category_image_border_radius']? 
      (Number)(settingObj['home_category_image_border_radius']) : 0; 

      
    this.change_flag_of_country_in_language_name = settingObj['change_flag_of_country_in_language_name'] ?
      (Number)(settingObj['change_flag_of_country_in_language_name']) : 0;


    this.enable_base_delivery_charge_percentage = settingObj['enable_base_delivery_charge_percentage'] ?
      (Number)(settingObj['enable_base_delivery_charge_percentage']) : 0;
    if (this.enable_base_delivery_charge_percentage) {
      this.base_delivery_charge_percentage = settingObj['base_delivery_charge_percentage'] ?
        (Number)(settingObj['base_delivery_charge_percentage']) : 0;
    }

      this.remove_language_code = settingObj['remove_language_code']? 
      (Number)(settingObj['remove_language_code']) : 0;

      this.change_radious_of_profile_image = settingObj['change_radious_of_profile_image']? 
      (Number)(settingObj['change_radious_of_profile_image']) : 0;

      this.change_size_of_location_and_search_bar_on_homepage = settingObj['change_size_of_location_and_search_bar_on_homepage']? 
      (Number)(settingObj['change_size_of_location_and_search_bar_on_homepage']) : 0;

      this.display_privacy_on_supplier_reg = settingObj['display_privacy_on_supplier_reg']? 
      (Number)(settingObj['display_privacy_on_supplier_reg']) : 0;

      this.hide_default_terms = settingObj['hide_default_terms']? 
      (Number)(settingObj['hide_default_terms']) : 0;

      this.enable_separate_terms_user_supplier = settingObj['enable_separate_terms_user_supplier']? 
      (Number)(settingObj['enable_separate_terms_user_supplier']) : 0;

      this.hide_country_code_contact = settingObj['hide_country_code_contact']? 
      (Number)(settingObj['hide_country_code_contact']) : 0;

      this.display_supplier_email_order = settingObj['display_supplier_email_order']? 
      (Number)(settingObj['display_supplier_email_order']) : 0;

      this.enable_federal_provincial_tax = settingObj['enable_federal_provincial_tax']? 
      (Number)(settingObj['enable_federal_provincial_tax']) : 0;

      if (this.enable_federal_provincial_tax == 1) {
        this.federal_tax_percent = settingObj['federal_tax_percent'] ?
        (Number)(settingObj['federal_tax_percent']) : 0;

        this.provincial_tax_percent = settingObj['provincial_tax_percent'] ?
        (Number)(settingObj['provincial_tax_percent']) : 0;
      }

      this.schedule_after_day = settingObj['schedule_after_day'] ?
      (Number)(settingObj['schedule_after_day']) : 0;

      this.show_language_in_reverse_order = settingObj['show_language_in_reverse_order'] ?
      (Number)(settingObj['show_language_in_reverse_order']) : 0;

      this.show_supplier_name_in_my_orders = settingObj['show_supplier_name_in_my_orders'] ?
      (Number)(settingObj['show_supplier_name_in_my_orders']) : 0;

      this.enable_success_popup_while_adding_to_cart = settingObj['enable_success_popup_while_adding_to_cart'] ?
      (Number)(settingObj['enable_success_popup_while_adding_to_cart']) : 0;

      this.enable_manual_address_fields = settingObj['enable_manual_address_fields'] ?
      (Number)(settingObj['enable_manual_address_fields']) : 0;
  }
}

class Placeholder {
  user_location: PlaceholderKey;
  empty_cart: PlaceholderKey;
  order_loader: PlaceholderKey;
  website_background: PlaceholderKey;

  constructor(obj?: any) {
    if (!obj) return;
    this.user_location = new PlaceholderKey(obj.user_location)
    this.empty_cart = new PlaceholderKey(obj.empty_cart)
    this.order_loader = new PlaceholderKey(obj.order_loader)
    this.website_background = new PlaceholderKey(obj.website_background)
  }

}

class PlaceholderKey {
  id: number;
  app: string;
  web: string;
  constructor(obj?: any) {
    if (!obj) return;
    this.id = obj.id;
    this.app = obj.app;
    this.web = obj.web;
  }
}

class HomeScreenSection {
  id: number;
  code: string;
  section_name: string;
  section_place: string;
  is_active: number;
}


function jsonParser(json: string) {
  if (!json) return;
  try {
    return JSON.parse(json);
  } catch (err) {
    return;
  }
}
