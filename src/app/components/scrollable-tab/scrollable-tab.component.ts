import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChildren,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, NavController } from '@ionic/angular';
import { ScrollableTabModel } from 'src/app/definitions/models/Common.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'apv-scrollableTab',
  templateUrl: './scrollable-tab.component.html',
  styleUrls: ['./scrollable-tab.component.scss'],
})
export class ScrollableTabComponent implements OnInit, AfterViewChecked {
  @ViewChildren(IonSegment, { read: ElementRef }) ionSegment: any;
  @ViewChildren('IonSegmentButton', { read: ElementRef }) ionSegmentButton: any;
  @Input() Tabs?: Array<ScrollableTabModel>;
  @Input() selectedTab: any = null;
  @Input() isCategory: boolean = false;
  @Input() clickable: 'true' | 'false' = 'true';
  @Input() marginClasses: string = 'mt-4 mb-3';
  @Input() isIframe = false;
  @Output() onTabClick = new EventEmitter();

  executed: number = 0;

  constructor(
    public route: ActivatedRoute,
    private navCtrl: NavController,
    public location: PlaceService
  ) { }

  ngOnInit() { }

  ngAfterViewChecked(): void {
    // !this.isCategory ? this.scrollToTab() : '';
  }

  scrollToTab() {
    const ignoreTab = ['1', '2'];
    if (this.selectedTab == null) {
      this.executed = 140;
    } else {
      if (!ignoreTab.includes(this.selectedTab) && this.executed < 139) {
        this.executed++;
        this.ionSegment.toArray().map((ionSegmentElement: any) => {
          this.ionSegmentButton
            .toArray()
            .map((ionSegmentButtonElement: any) => {
              ionSegmentElement.nativeElement.scroll({
                left:
                  ionSegmentButtonElement.nativeElement.offsetLeft -
                  window.innerWidth / 2 +
                  ionSegmentButtonElement.nativeElement.clientWidth / 2,
                behavior: 'smooth',
              });
            });
        });
      }
    }
  }

  onClick(selected: ScrollableTabModel) {
    if (!this.isIframe) {
      if (selected && selected.actionUrl) {
        if (selected.actionUrl.startsWith('http')) {
          window.open(selected.actionUrl, '_blank');
        } else {
          this.navCtrl.navigateForward(selected.actionUrl);
        }
      }
    }
    this.onTabClick.emit(selected);
  }
}
