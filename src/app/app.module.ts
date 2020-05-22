import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './services/data.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { YesNoComponent } from './widget/yes-no/yes-no.component';
import { CardComponent } from './home/todo-container/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    YesNoComponent,
    CardComponent
  ],
  exports: [],
  entryComponents: [
    YesNoComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(DataService)
  ],
  providers: [
    MatDialog,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
