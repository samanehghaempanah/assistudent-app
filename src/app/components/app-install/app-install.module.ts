import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInstallComponent } from './app-install.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [ CommonModule,IonicModule],
  declarations: [AppInstallComponent],
  exports: [AppInstallComponent]
})
export class AppInstallModule {}
