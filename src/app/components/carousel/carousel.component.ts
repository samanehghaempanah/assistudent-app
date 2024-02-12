import { AfterContentChecked, AfterViewInit, Component, Input, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { SwiperOptions, Navigation, Pagination, Swiper, Autoplay, } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

Swiper.use([Autoplay, Pagination, Navigation]);
@Component({
  selector: 'apv-carousel',
  templateUrl: 'carousel.component.html',
  styleUrls: ['carousel.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterContentChecked, AfterViewInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() sliderItems: any[] = []

  config: SwiperOptions = {
    spaceBetween: 20,
    pagination: true,
    observer: true,
    slidesPerView: 'auto',
    loopedSlides: 7,
    observeParents: true,
    loop: true,
    autoplay: {
      pauseOnMouseEnter: false,
      delay: 2000,
      disableOnInteraction: false,
    },
  };

  constructor(public baseService: BaseService) { }

  ngAfterViewInit(): void { }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
      this.swiper.swiperRef.autoplay.start();
    }
  }

  swiperSlideChnaged(e: any) { }

  next() { this.swiper?.swiperRef.slideNext(500); }

  prev() { this.swiper?.swiperRef.slidePrev(500); }
}
