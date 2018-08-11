import { Component, Input } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Lokacija } from '../../../models/lokacija.model';
import { ArtikliPage } from '../artikli/artikli';
import { InventuraService } from '../../../services/inventura.services';
import { Artikal } from '../../../models/artikal.model';

@IonicPage()
@Component({
  selector: 'page-lokacija',
  templateUrl: 'lokacija.html',
})
export class LokacijaPage {
  @Input() lokacija : Lokacija;
  @Input() lokacije : Lokacija [] = [];
  @Input() artikli : Artikal[] = [];

  constructor(private navParams: NavParams, 
    private navCtrl : NavController, 
    public inventuraService : InventuraService) {
      this.lokacija = this.navParams.get('lok');
  }

  ionViewDidEnter(){
    this.artikli=[];
    this.inventuraService.GetArtikle()
    .then(
      (artikli) => {
        this.artikli = artikli.filter(x => (x.lokacija_id==this.lokacija.location_id));
        if(this.artikli.length === 0){
          this.getLokacije();
        }
      }
    )
  }
  
  getArtikle(){
    this.inventuraService.GetArtikle()
      .then(
        (artikli) => {
          this.artikli = artikli.filter(x => (x.lokacija_id==this.lokacija.location_id));
        }
      )
  }
  getLokacije(){
    this.inventuraService.GetLokacije()
      .then(
        (lokacije) => {
          this.lokacije = lokacije.filter(x => x.pozicija.startsWith(this.lokacija.pozicija) && x.pozicija.length === (this.lokacija.pozicija.length + 2) );
        }
      );
  }
  ArtikalSelect(odabraniartikal, artikli){
    this.navCtrl.push(ArtikliPage, {art : odabraniartikal, lok : this.lokacija});
  }
  LokacijaSelect(odabranalokacija){
    this.navCtrl.push(LokacijaPage, {lok : odabranalokacija});
  }
}
