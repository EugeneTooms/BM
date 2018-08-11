import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrimkePage } from './primke';
import { PrimkaPageModule } from './primka/primka.module';

@NgModule({
  declarations: [
    PrimkePage,
  ],
  imports: [
    IonicPageModule.forChild(PrimkePage),PrimkaPageModule
  ],
})
export class PrimkePageModule {}
