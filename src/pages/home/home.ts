import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { InventuraService } from '../../services/inventura.services';
import {Lokacija} from '../../models/lokacija.model'
import { LokacijaPage } from '../inventura/lokacija/Lokacija';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @Input() lokacije : Lokacija[];
  @Input() lokacijeprikaz : Lokacija[]
  @Input() server : string = '';
  constructor(public navCtrl: NavController, 
    public inventuraService : InventuraService, 
    public alertCtrl: AlertController) {
  }
  SyncWithServer(){
    this.inventuraService.syncSve();
  }
  getLokacije(){
    this.inventuraService.GetLokacije()
      .then(
        (lokacije) => {
          this.lokacije = lokacije.filter(x=> x.pozicija.length === 1);
        }
      );
  }
  getServer(){
    this.inventuraService.GetServer()
    .then(
      (server) => this.server = server 
    );
  }
  ionViewDidEnter(){
    this.getServer();
    this.getLokacije();
  }
  // onLoadNovaLokacija(){
  //   this.navCtrl.push(NovaLokacijaPage, {lok : this.lokacije});
  // }
  LokacijaSelect(odabranalokacija){
    this.navCtrl.push(LokacijaPage, {lok : odabranalokacija});
  }
  Settings(){
    this.navCtrl.push(SettingsPage);
  }
  RunReport() {
    let alert = this.alertCtrl.create({
      title: 'Spremi Inventuru u bazu?',
      message: 'Zeliš li spremiti inventuru u bazu podataka?<br>Server mora biti dostupan!',
      buttons: [
        {
          text: 'Odustajem',
          handler: () => {
            
          }
        },
        {
          text: 'Do IT!!!',
          handler: () => {
            this.inventuraService.SpremiInventuru();
          }
        }
      ]
    });

    alert.present();
  }
}
