import { Http, Response, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

import { Lokacija } from '../models/lokacija.model';
import { Artikal } from '../models/artikal.model';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class InventuraService{
    private lokacije : Lokacija[] = [];
    private artikli : Artikal[] = [];
    private server : string;
    constructor (private http : Http, private storage : Storage, public alertCtrl: AlertController, private toastCtrl: ToastController){}
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
                this.syncSve();
            });
        }  

        toast.present();
      }

    syncLokacije(){
        return this.http.get('http://'+this.server+':2000/korra/lokacije')
            .map((response : Response) => {
                const lokacije = response.json().obj;
                let transformedLokacije: Lokacija[] = [];
                for (let lokacija of lokacije){               
                    transformedLokacije.push(new Lokacija(lokacija.id , lokacija.naziv_lokacije, lokacija.pozicija));
                }
                this.lokacije = transformedLokacije;
                return transformedLokacije;
                
            })
            .catch((error: Response) => { 
                return Observable.throw(error)
            } 
            );
    }
    syncArtikle(){
        return this.http.get('http://'+this.server+':2000/korra/artikli')
            .map((response : Response) => {
                const artikli = response.json().obj;
                let transformedArtikli: Artikal[] = [];
                for (let artikal of artikli){
                    transformedArtikli.push(new Artikal(artikal.article_id, artikal.inventory_id == null ? 0 : artikal.inventory_id , artikal.location_id, artikal.indeks, artikal.article_name, artikal.img_src, artikal.kolicina == null ? 0 : artikal.kolicina));
                }
                this.artikli = transformedArtikli;
                return transformedArtikli;
                })
                .catch((error: Response) => { 
                    return Observable.throw(error)
                } 
                );
    }

    syncSve(){
        this.syncLokacije()
        .subscribe((lokacije=[]) =>{
          this.lokacije = lokacije;
          this.storage.set('lokacije', this.lokacije);  
          this.syncArtikle()
          .subscribe((artikli=[]) =>{
            this.artikli = artikli;
            this.storage.set('artikli', this.artikli);
            let data = {}
            data['message'] = 'Sinkronizacija uspjesna';
            this.presentToast(data, false);
          },  error =>{
            this.presentError(error);
            }
            );
        } , error =>{
            this.presentError(error);
        });
    }
    AddLokacija(lok : Lokacija){
        this.lokacije.push(lok);
        this.storage.set('lokacije', this.lokacije);
        const body = JSON.stringify(lok);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://'+this.server+':2000/ang/lokacije', body , {headers : headers})
            .map((response : Response) => response.json())
            .catch((error: Response) => { 
                return Observable.throw(error.json())
            } 
            );
        
    }
    AddServer(name : string){
        this.server = name;
        this.storage.set('server', this.server);        
    }
    GetServer(){
        return this.storage.get('server')
            .then(
                (server) => {
                    this.server = server == null ? '192.168.0.7' : server;
                    return this.server;
                }
            );
    }
    GetLokacije(){
        return this.storage.get('lokacije')
            .then(
                (lokacije) => {
                    this.lokacije = lokacije == null ? [] : lokacije;
                    return this.lokacije;
                }
            );
    }
    GetArtikle(){
        return this.storage.get('artikli')
            .then(
                (artikli) => {
                    this.artikli = artikli == null ? [] : artikli;
                    return this.artikli;
                }
            );
    }
    SaveArtikle(artikli: Artikal[] ){
        this.storage.set('artikli', this.artikli);
    }
    Save(data){
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post('http://'+this.server+':2000/korra/ionicinventura/', body, {headers : headers})
        .map((response : Response) => response.json())
        .catch((error: Response) => { 
            return Observable.throw(error.json())
        } 
        );
    }
    SpremiInventuru(){
        let j = {};
        j["datum"]= Date.now();     
        this.GetArtikle()
            .then(
                (artikli) => {
                    j["artikli"] = artikli;
                    this.Save(j).subscribe(data => this.presentToast(data,true), error => this.presentError(error));
                }
            );
    }
}