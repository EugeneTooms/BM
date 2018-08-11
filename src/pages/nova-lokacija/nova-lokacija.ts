import { Component , Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InventuraService } from '../../services/inventura.services';
import { Lokacija } from '../../models/lokacija.model';

@Component({
  selector: 'page-nova-lokacija',
  templateUrl: 'nova-lokacija.html',
})
export class NovaLokacijaPage {
  @Input() lokacije : Lokacija[]
  constructor(private navParams: NavParams,private inventuraService: InventuraService, private navCtr : NavController) {
    this.lokacije = navParams.get('lok');
  }

  onDodajLokaciju(value :{naziv: string}){
    
    let novaLokacija = new Lokacija(this.lokacije.length + 1, this.lokacije[0].pozicija, value.naziv);
    
    this.inventuraService.AddLokacija(novaLokacija)
      .subscribe(data => console.log(data), error => console.log(error)
                );
    this.navCtr.pop();
  }
}
