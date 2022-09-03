import { ProductModule } from './../shared/product/product.module';
import { SupplierModule } from './../shared/supplier/supplier.module';
import { HomeModule } from './../shared/home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceHomeComponent } from './service-home/service-home.component';
import { LayoutSharedModule } from '../shared/layout-shared/layout-shared.module';
import { HomeServiceRecentlyViewedComponent } from './templates/home-service-recently-viewed/home-service-recently-viewed.component';
import { ServiceSuppliersComponent } from './templates/service-suppliers/service-suppliers.component';
import { LookingHomeComponent } from './templates/looking-home-service/looking-home-service.component';
import { HomeServiceSuppliersComponent } from './templates/home-service-suppliers/home-service-suppliers.component';
import { HomeServiceFavBrandsComponent } from './templates/home-service-fav-brands/home-service-fav-brands.component';


const components = [
  ServiceHomeComponent,
  HomeServiceRecentlyViewedComponent,
  LookingHomeComponent,
  HomeServiceSuppliersComponent,
  HomeServiceFavBrandsComponent
]

@NgModule({
  declarations: [
    ...components,
    HomeServiceRecentlyViewedComponent,
    ServiceSuppliersComponent
  ],
  imports: [
    CommonModule,
    LayoutSharedModule,
    HomeModule,
    ProductModule,
    SupplierModule,
  ], exports: [
    ...components
  ]
})
export class HomeServiceModule { }
