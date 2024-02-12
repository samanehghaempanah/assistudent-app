import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatExpansionModule } from '@angular/material/expansion';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import {initializeApp} from 'firebase/app'
import { Interceptor } from './http.interceptor';
import { environment } from 'src/environments/environment';
import { DynamicColDirective } from './directive/dynamic-col.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInstallModule } from './components/app-install/app-install.module';
import {MatIconModule} from '@angular/material/icon';

initializeApp(environment.firebase)

@NgModule({
  declarations: [AppComponent, DynamicColDirective],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('../firebase-messaging-sw.js', {enabled: true}),
    MatExpansionModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AppInstallModule,
    MatIconModule
  ],
  providers: [
    HttpClientModule,
    Device,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
