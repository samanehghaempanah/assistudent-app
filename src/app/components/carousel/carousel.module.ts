import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import {SwiperModule} from 'swiper/angular'
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [ CommonModule,SwiperModule,RouterModule],
  declarations: [CarouselComponent],
  exports: [CarouselComponent]
})
export class CarouselModule {}
