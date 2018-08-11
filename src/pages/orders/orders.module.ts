import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { CompleteOrderPageModule } from './complete-order/complete-order.module';
import { ArticleOrderPageModule } from './article-order/article-order.module';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage), CompleteOrderPageModule,ArticleOrderPageModule
  ],
})
export class OrdersPageModule {}
