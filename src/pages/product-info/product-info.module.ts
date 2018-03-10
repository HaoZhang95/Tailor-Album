import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductInfoPage } from './product-info';

@NgModule({
  declarations: [
    ProductInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductInfoPage),
  ],
})
export class ProductInfoPageModule {}
