import { Http, Response, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { OrderArtikal } from '../models/orderarticle.model';
import { AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Order } from '../models/order.model';


@Injectable()
export class OrdersService{
    private orderArtikli : OrderArtikal[] = []
    private orders : Order[] = [] ;
    constructor (private http : Http, 
                private storage : Storage,
                private alertCtrl: AlertController){
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
    GetArtikle(){
        return this.storage.get('orderArtikli')
            .then(
                (artikli) => {
                    this.orderArtikli = artikli == null ? [] : artikli;
                    return this.orderArtikli;
                }
            );
    }
    getOrders(){
        return this.storage.get('orders')
        .then(
            (orders) => {
                this.orders = orders == null ? [] : orders;
                return this.orders;
            }
        );
    }
    AddToOrder(artikal: Order){
        this.orders.push(artikal);
        this.storage.set('orders', this.orders)
    }
    ClearOrder(){
        this.storage.remove('orders');
    }
    RemoveFromOrder(artikal: Order){
        this.orders.forEach(
            (item,index)=>{
            if(item===artikal) this.orders.splice(index,1);}
        )
        this.storage.set('orders', this.orders)
    }
    syncArtikle(server:string){
        this.FetchArtikle(server)
        .subscribe((artikli=[]) =>{
          this.orderArtikli = artikli;
          this.storage.set('orderArtikli', this.orderArtikli);
        } , error =>{
            this.presentError(error);
        });
    }
    FetchArtikle(server:string){
        return this.http.get('http://'+server+':2000/korra/artikliZaOrder')
        .map((response : Response) => {
            const artikli = response.json().obj;
            let transformedArtikli: OrderArtikal[] = [];
            for (let artikal of artikli){
                transformedArtikli.push(new OrderArtikal(
                    artikal.id, 
                    artikal.name, 
                    artikal.kolicina == null ? 0 : artikal.amount,
                    artikal.box_qty,
                    artikal.qty,
                    0,
                    0,
                    artikal.img_src == null ? 'boca.jpg' : artikal.img_src,
                    artikal.supplier_id));

            }
            this.orderArtikli = transformedArtikli;
            return transformedArtikli;
            })
            .catch((error: Response) => { 
                return Observable.throw(error)
            } 
            );
    }
    SubmitOrder(server:string){
        const body = JSON.stringify(this.orders);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://'+server+':2000/korra/orders/', body, {headers : headers})
        .map((response : Response) => response.json())
        .catch((error: Response) => { 
            return Observable.throw(error.json())
        } 
        );
    }
}