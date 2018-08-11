import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaLokacijaPage } from './nova-lokacija';

@NgModule({
  declarations: [
    NovaLokacijaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaLokacijaPage),
  ],
  exports :[NovaLokacijaPage]
})
export class NovaLokacijaPageModule {}
