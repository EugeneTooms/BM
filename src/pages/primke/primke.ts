import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PrimkaPage } from './primka/primka';
import { PrimkeService } from '../../services/primke.services';
import { InventuraService } from '../../services/inventura.services';
import { Primka } from '../../models/primka.model';

@IonicPage()
@Component({
  selector: 'page-primke',
  templateUrl: 'primke.html',
})
export class PrimkePage {
  @Input() server;
  @Input() primke : Primka[]
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private primkeService : PrimkeService,
              private inventuraService : InventuraService) {

  }
  getPrimke(){
    this.primkeService.GetPrimke().then(
      (primke) => {this.primke = primke;}
    );
  }
  ionViewDidLoad(){
    this.inventuraService.GetServer().then(
      (server)=> {
        this.server=server;
        this.primkeService.syncPrimke(server);
        this.getPrimke();
      })
  }
  ionViewDidEnter() {
    this.getPrimke();
  }

  OrderSelect(selected : Primka){
    this.navCtrl.push(PrimkaPage, {primka : selected})
  } 

}
