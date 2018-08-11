import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
import { InventuraPage } from '../pages/inventura/inventura';
import { OrdersPage } from '../pages/orders/orders';
import { SettingsPage } from '../pages/settings/settings';
import { PrimkePage } from '../pages/primke/primke';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = StartPage;
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  openMenu(){
    this.menuCtrl.open();
  }
  menuToggle(){
    this.menuCtrl.toggle();
  }
  Close(){
    this.menuCtrl.close();
  }
  Settings(){
    this.nav.push(SettingsPage);
    this.menuCtrl.close();
  }
  Orders(){
    this.nav.push(OrdersPage);
    this.menuCtrl.close();
  }
  Inventura(){
    this.nav.push(InventuraPage);
    this.menuCtrl.close();
  }
  Primke(){
    this.nav.push(PrimkePage);
    this.menuCtrl.close();
  }
}

