import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleOrderPage } from './article-order';

@NgModule({
  declarations: [
    ArticleOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleOrderPage),
  ],
})
export class ArticleOrderPageModule {}
