import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InventuraService } from '../../services/inventura.services';
import { Lokacija } from '../../models/lokacija.model';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @Input() lokacije : Lokacija[]
  server : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private inventuraService : InventuraService, 
    public alertCtrl: AlertController) {
  }
  ionViewWillEnter() {
    this.inventuraService.GetServer()
      .then(
        (server) => this.server = server
      );
      this.inventuraService.GetLokacije()
        .then(
          (lokacije) => this.lokacije=lokacije
        );
  }
  onDodajServer(value : {naziv: string}){
    this.inventuraService.AddServer(value.naziv);
    this.navCtrl.pop();
  }
  SyncWithServer(){
    if (this.lokacije.length === 0){
      this.inventuraService.syncSve();
      this.navCtrl.pop()
    }else{
      let alert = this.alertCtrl.create({
        title: 'Sinkronizacija',
        message: 'Jesi li siguran? Ovo će <strong>PREBRISATI</strong> unešene podatke sa podatcima iz servera.<br>Server mora biti dostupan!',
        buttons: [
          {
            text: 'Odustajem',
            handler: () => {
              
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.inventuraService.syncSve();
              this.navCtrl.pop();
            }
          }
        ]
      });
  
      alert.present();
    }

;
  }

}
