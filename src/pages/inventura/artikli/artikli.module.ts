import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnimationService, AnimatesDirective } from 'css-animator';
import { ArtikliPage } from './artikli';

@NgModule({
  declarations: [
    ArtikliPage,AnimatesDirective
  ],
  imports: [
    IonicPageModule.forChild(ArtikliPage),
  ],
  exports : [ArtikliPage],
  providers : [AnimationService]
})
export class ArtikliPageModule {}
