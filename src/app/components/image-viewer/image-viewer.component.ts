import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'apv-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
  imgSrc: any = '';

  constructor(
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.imgSrc = this.navParams.data['imgSrc'];
  }
}
