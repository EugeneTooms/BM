import { Http, Response, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { Primka } from '../models/primka.model';
import { AlertController } from 'ionic-angular';



@Injectable()
export class PrimkeService{
    private Primke : Primka[];

    constructor (private http : Http, 
                private storage : Storage, 
                private alertCtrl: AlertController){}
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
    GetPrimke(){
        return this.storage.get('Primke')
            .then(
                (primke) => {
                    this.Primke = primke == null ? [] : primke;
                    return this.Primke;
                }
            );
    }
    RemoveFromPrimke(primka: Primka){
        this.Primke.forEach(
            (item,index)=>{
            if(item===primka) this.Primke.splice(index,1);}
        )
        this.storage.set('orders', this.Primke)
    }
    syncPrimke(server:string){
        this.FetchPrimke(server)
        .subscribe((primke=[]) =>{
          this.Primke = primke;
          this.storage.set('Primke', this.Primke);
        } , error =>{
            this.presentError(error);
        });
    }
    FetchPrimke(server:string){
        return this.http.get('http://'+server+':2000/korra/orders')
        .map((response : Response) => {
            const primke = response.json().obj;
            let transformedPrimke: Primka[] = [];
            for (let primka of primke){
                transformedPrimke.push(new Primka(
                    primka.id,
                    '', 
                    primka.name, 
                    primka.date,
                    primka.artikli));

            }
            this.Primke = transformedPrimke;
            return transformedPrimke;
            })
            .catch((error: Response) => { 
                return Observable.throw(error)
            } 
            );
    }
    SavePrimka(server:string, primka : Primka){
        const body = JSON.stringify(primka);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://'+server+':2000/korra/primka/', body, {headers : headers})
        .map((response : Response) => response.json())
        .catch((error: Response) => { 
            return Observable.throw(error.json())
        } 
        );
    }
}