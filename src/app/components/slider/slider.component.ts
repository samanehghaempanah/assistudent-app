import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SliderModel } from 'src/app/definitions/models/Common.model';



@Component({
  selector: 'apv-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit , OnChanges{
  
  @Input() Slides!: Array<SliderModel>;
  @Output() onTabClick = new EventEmitter();
  
  constructor(private navCtrl: NavController) {  }
  
  ngOnChanges(): void {

  }

  ngAfterViewInit(): void {
    
  }

  onClick(selected: SliderModel) {
    if (selected && selected.actionUrl) {
      if (selected.actionUrl.startsWith('http')) {
        window.open(selected.actionUrl, '_blank');
      }
      else {
        this.navCtrl.navigateForward(selected.actionUrl);
      }
    }

    this.onTabClick.emit(selected);
  }

  

}
