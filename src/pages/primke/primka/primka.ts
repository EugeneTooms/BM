import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Primka } from '../../../models/primka.model';
import { PrimkeService } from '../../../services/primke.services';
import { InventuraService } from '../../../services/inventura.services';


@IonicPage()
@Component({
  selector: 'page-primka',
  templateUrl: 'primka.html',
})
export class PrimkaPage {
  @Input() primka : Primka
  checked : boolean;
  server : string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl : AlertController,
              private primkeService : PrimkeService,
              private inventuraService : InventuraService,
              private toastCtrl: ToastController) {
               this.primka = this.navParams.get('primka');

  }
  presentError(err) {
    if(!err.title){
        let alert = this.alertCtrl.create({
            title: err,
            subTitle: err,
            buttons: ['Dismiss']
          });
          alert.present();
    }else{
        let alert = this.alertCtrl.create({
            title: err.title,
            subTitle: err.message,
            buttons: ['Dismiss']
          });
          alert.present();
    }
  }
  presentToast(data, report:boolean) {
    let toast = this.toastCtrl.create({
      message: data.message,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });    
    if (report){
        toast.onDidDismiss(() => {
          
        });
    }  

    toast.present();
  }
  ionViewDidLoad() {
    this.inventuraService.GetServer().then(
      (server) => {this.server = server;}
    )

  }
  Receive(){
    
    let artikli = this.primka.artikli.filter(x=>(x['checked']==true));
    if (artikli.length == 0){
      let alert = this.alertCtrl.create({
        title: 'Nema artikala?',
        message: 'Primka bez artikala je nevaljana',
        buttons: [
          {
            text: 'Odustajem',
            handler: () => {
              
            }
          }
        ]
      });
  
      alert.present();
      
    }else{
    let alert = this.alertCtrl.create({
      title: 'Zapiši primku?',
      message: 'Zapiši primku u bazu podataka',
      buttons: [
        {
          text: 'Odustajem',
          handler: () => {
            
          }
        },
        {
          text: 'Do IT!!!',
          handler: () => {
            this.primka.artikli = artikli;
            this.primkeService.SavePrimka(this.server,this.primka).subscribe(
              (data)=>{
                let poruka = {};
                poruka['message'] = 'Primka zapisana';
                this.presentToast(poruka, true);
                this.primkeService.RemoveFromPrimke(this.primka);
                this.navCtrl.pop();
              },
              (error)=>{this.presentError(error);});
            
          }
        }
      ]
    });

    alert.present();
    }
  }

  presentPrompt(art ,mjera : string) {
    let alert = this.alertCtrl.create({
      title: 'Unesi količinu',
      inputs: [
        {
          name: 'Number',
          placeholder: '',
          type : 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: 'OK',
          handler: data => {
            if (mjera == 'gajbe'){
              art.paketi_kol= +data.Number;
            }
            else if(mjera == 'boce'){
              art.boce_kol= +data.Number;
            }

          }
        }
      ]
    });
    alert.present();
  }
}
