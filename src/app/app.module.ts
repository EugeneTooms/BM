import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule  } from '@ionic/storage';
import {HttpModule} from '@angular/http'

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { StartPage} from '../pages/start/start' 
import { InventuraService } from '../services/inventura.services';
import { OrdersService } from '../services/orders.services';
import { PrimkeService } from '../services/primke.services';


import { NovaLokacijaPageModule } from '../pages/nova-lokacija/nova-lokacija.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { OrdersPageModule } from '../pages/orders/orders.module';
import { InventuraPageModule } from '../pages/inventura/inventura.module';
import { PrimkePageModule } from '../pages/primke/primke.module';

@NgModule({
  declarations: [
    MyApp,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NovaLokacijaPageModule,
    SettingsPageModule,
    OrdersPageModule,
    InventuraPageModule,
    PrimkePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InventuraService,
    OrdersService,
    PrimkeService
  ]
})
export class AppModule {}
