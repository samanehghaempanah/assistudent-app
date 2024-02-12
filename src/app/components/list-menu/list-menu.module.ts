import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMenuComponent } from './list-menu.component';
import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    ListMenuComponent
  ],
  imports: [ 
    CommonModule, 
    IonicModule,
    MatExpansionModule
  ],
  exports: [
    ListMenuComponent
  ]
})
export class ListMenuModule { }
