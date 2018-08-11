import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventuraPage } from './inventura';
import { LokacijaPageModule } from './lokacija/lokacija.module';
import { ArtikliPageModule } from './artikli/artikli.module';

@NgModule({
  declarations: [
    InventuraPage,
  ],
  imports: [
    IonicPageModule.forChild(InventuraPage), LokacijaPageModule,ArtikliPageModule
  ],
})
export class InventuraPageModule {}
