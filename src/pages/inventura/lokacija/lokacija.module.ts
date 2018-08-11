import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LokacijaPage } from './lokacija';

@NgModule({
  declarations: [
    LokacijaPage,
  ],
  imports: [
    IonicPageModule.forChild(LokacijaPage),
  ],
  exports: [LokacijaPage]
})
export class LokacijaPageModule {}
