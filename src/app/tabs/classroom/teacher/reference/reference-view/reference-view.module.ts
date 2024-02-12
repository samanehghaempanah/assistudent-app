import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferenceViewPageRoutingModule } from './reference-view-routing.module';

import { ReferenceViewPage } from './reference-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferenceViewPageRoutingModule
  ],
  declarations: [ReferenceViewPage]
})
export class ReferenceViewPageModule {}
