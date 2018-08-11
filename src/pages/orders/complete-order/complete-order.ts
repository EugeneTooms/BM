import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { OrdersService } from '../../../services/orders.services';
import { Order } from '../../../models/order.model';
import { InventuraService } from '../../../services/inventura.services';



@IonicPage()
@Component({
  selector: 'page-complete-order',
  templateUrl: 'complete-order.html',
})
export class CompleteOrderPage {
  @Input() orders : Order[] = [];
  @Input() server;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private inventuraService : InventuraService,
              private ordersService : OrdersService,
              private toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    this.ordersService.getOrders().then(
      (orders)=>{
        this.orders = orders;
      }
    )
    this.server = this.inventuraService.GetServer().then(
      (server) => {this.server = server;}
    )
  }
  RemoveItem(order: Order){
    this.ordersService.RemoveFromOrder(order);
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
  Order(){
    let alert = this.alertCtrl.create({
      title: 'Naruči artikle?',
      message: 'Naruči artikle u tim količinama?<br>Server mora biti dostupan!',
      buttons: [
        {
          text: 'Odustajem',
          handler: () => {
            
          }
        },
        {
          text: 'Do IT!!!',
          handler: () => {
            this.ordersService.SubmitOrder(this.server).subscribe(
              (data)=>{
                let poruka = {};
                poruka['message'] = 'Narudžba poslana';
                this.presentToast(poruka, true);
                this.ordersService.ClearOrder();},
              (error)=>{this.presentError(error);});
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }
}
