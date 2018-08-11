import { Component, ViewChild, Input  } from '@angular/core';
import { IonicPage, NavParams, Slides, NavController } from 'ionic-angular';
import { Artikal } from '../../../models/artikal.model';
import { Lokacija } from '../../../models/lokacija.model';
import { InventuraService } from '../../../services/inventura.services';

@IonicPage()

@Component({
  selector: 'page-artikli',
  templateUrl: 'artikli.html',
})
export class ArtikliPage {
art : any
@Input() artikli : Artikal[] = [];
@Input() lokacije : Lokacija[] = [];
odabraniArtikal : Artikal;
odabranaLokacija : Lokacija;
sljedecaLokacija : Lokacija;
result = '';
@ViewChild(Slides) slides: Slides;

  goToSlide(id){
    this.slides.slideTo(id, 500)
  }
  constructor( 
    public navParams: NavParams, 
    public navCtr : NavController, 
    private inventuraService:  InventuraService) {
      this.art = navParams.get('art');
      this.odabranaLokacija = navParams.get('lok');
      this.getArtikle();
  }
  getArtikle(){
    this.inventuraService.GetArtikle()
      .then(
        (artikli) => {
          this.artikli = artikli.filter(x => (x.lokacija_id==this.odabranaLokacija.location_id));
        }
      )
  }

  ionViewDidEnter(){
    this.goToSlide(this.art - 1);
    this.odabraniArtikal = this.artikli.find(x => x.indeks == (this.slides.getActiveIndex() + 1));
  }

  ionViewWillLeave(){
    this.inventuraService.SaveArtikle(this.artikli);
  }
  slideChanged(){
    this.inventuraService.SaveArtikle(this.artikli);
    let currentIndex = this.slides.getActiveIndex();
    this.odabraniArtikal = this.artikli.find(x => x.indeks == currentIndex + 1)
    this.result = '';
  }
  btnClicked(btn) {
    if(btn == 'c'){
      this.result = this.result.slice(0,-1);
      this.artikli[this.odabraniArtikal.indeks -1].kolicina = eval(this.result);
    }else if(btn == '.'){
      this.result += btn;
    }else{
      this.result += btn;
      this.artikli[this.odabraniArtikal.indeks -1].kolicina = eval(this.result);
    }

    if(this.result == ''){
      this.artikli[this.odabraniArtikal.indeks -1].kolicina = 0;
    }
  }
}
