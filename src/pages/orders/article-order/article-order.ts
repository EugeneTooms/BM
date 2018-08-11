import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderArtikal } from '../../../models/orderarticle.model';
import { OrdersService } from '../../../services/orders.services';
import { Order } from '../../../models/order.model';



@IonicPage()
@Component({
  selector: 'page-article-order',
  templateUrl: 'article-order.html',
})
export class ArticleOrderPage {
  artikal : OrderArtikal;
  artikalZaNaruciti : Order;
  narudzba = 'paket';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersService: OrdersService) {
    this.artikal = this.navParams.get('artikal');
  }

  ionViewDidLoad() {
   // this.selectedZapremnina = this.artikal.zapremnina[0].id == null ? [] : this.artikal.zapremnina[0].id;
   // this.selectedPaketi = this.artikal.boxes[0].id == null ? [] : this.artikal.boxes[0].id
  }
  Add(){
    //let nazivpaketa = this.artikal.boxes.find(x=>(x['id']==this.selectedPaketi));
    //let nazivzapremnine = this.artikal.zapremnina.find(x=>(x['id']==this.selectedZapremnina));
    this.artikalZaNaruciti = new Order(
      this.artikal.id,
      this.artikal.naziv,
      this.artikal.kalo,
      this.artikal.paketi,
      this.artikal.boce,
      this.artikal.img,
      this.artikal.supplier_id
    )
    this.ordersService.AddToOrder(this.artikalZaNaruciti);
    this.navCtrl.pop();
  }
  PlusPaket(){
    this.artikal.paketi= this.artikal.paketi + 1;
  }
  MinusPaket(){
    this.artikal.paketi= this.artikal.paketi - 1;
  }
  PlusBoca(){
    this.artikal.boce= this.artikal.boce + 1;
  }
  MinusBoca(){
    this.artikal.boce= this.artikal.boce - 1;
  }
}
