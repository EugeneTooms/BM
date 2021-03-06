import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderArtikal } from '../../models/orderarticle.model';
import { CompleteOrderPage } from './complete-order/complete-order';
import { ArticleOrderPage } from './article-order/article-order';
import { OrdersService } from '../../services/orders.services';
import { InventuraService } from '../../services/inventura.services';
import { Order } from '../../models/order.model';


@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  @Input() orderArtikli : OrderArtikal[] = [];
  displayArtikli : OrderArtikal[] = [];
  searchParam : string = '';
  server : string;
  orders : Order[] = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersService: OrdersService,
              private inventuraService: InventuraService,
              private alertCtrl : AlertController) {

  }
  ionViewDidLoad() {
    this.inventuraService.GetServer().then(
      (server)=>{
          this.server = server;
          this.ordersService.syncArtikle(server);
          this.ordersService.GetArtikle()
          .then(
            (artikli) => {
              this.orderArtikli = artikli;
              this.displayArtikli = JSON.parse(JSON.stringify(artikli));
            }
          )
      }
    )
  }
  ionViewDidEnter(){
    this.ordersService.GetArtikle()
    .then(
      (artikli) => {
        this.orderArtikli = artikli;
        this.displayArtikli = JSON.parse(JSON.stringify(artikli));
      }
    );
    this.ordersService.getOrders().then(
      (orders) => {
        this.orders = orders;
      }
    );
  }
  onInputParam(ev:any){
    if(this.searchParam == ''){
      this.displayArtikli = this.orderArtikli;
    }else{
      this.displayArtikli = this.orderArtikli.filter(x=>{ return x.naziv.toLowerCase().includes(this.searchParam.toLowerCase())});
    }
  }
  Order(selected : OrderArtikal){
    if(selected.qty == null){
      let alert = this.alertCtrl.create({
      title: 'Nema Zapremninu',
      message: 'Artikal nema unesenu Zapremninu<br>Ne može se naručiti preko mobilne aplikacije',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.searchParam = '';
          }
        }
      ]
      });
      alert.present();
    }else if(this.orders.find(x=>(x['id'] == selected.id))){
      let alert = this.alertCtrl.create({
        title: 'Artikal već upisan',
        message: 'Artikal je već dodan<br>Ako želiš promijeniti izbriši ga i doaj ponovno',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.searchParam = '';
            }
          }
        ]
        });
        alert.present();
    }
    else{
    this.navCtrl.push(ArticleOrderPage, {artikal : selected});
    this.searchParam = '';
    }
  }
  Finnsih(){
    this.navCtrl.push(CompleteOrderPage);
  }

}
