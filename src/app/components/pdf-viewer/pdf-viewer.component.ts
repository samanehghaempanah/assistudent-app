import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'apv-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfViewerContainer', { static: true }) pdfViewerContainer: ElementRef;
  @Input() pdfUrl = 'https://mydownload.iaun.ac.ir/image/formandfiles/Catalog/arabic.pdf';
  isFullscreen: boolean = false;
  currentPage = 1;
  totalPages: number;
  constructor(private platform: Platform) { }
  ngOnInit() { 

  }

  ngAfterViewInit(){
    const iframeDocument = this.pdfIframe.nativeElement.contentDocument || this.pdfIframe.nativeElement.contentWindow?.document;
    if (iframeDocument) {
     debugger
      iframeDocument.fullscreen = true;
    }
  }

  @ViewChild('pdfIframe') pdfIframe: ElementRef;

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;

    const element = document.documentElement as any;
    debugger
    if (element.requestFullscreen) {
      if (!document.fullscreenElement) {
        element.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if (element.mozRequestFullScreen) {
      if (!document.fullscreenElement) {
        element.mozRequestFullScreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else if (element.webkitRequestFullscreen) {
      if (!document.fullscreenElement) {
        element.webkitRequestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if (element.msRequestFullscreen) {
      if (!document.fullscreenElement) {
        element.msRequestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }

  // toggleFullscreen() {
  //   this.isFullscreen = !this.isFullscreen;
  //   this.pdfIframe.nativeElement.classList.add('fullscreen');
  //   console.log(this.pdfIframe);
  //   debugger

  //   if (this.isFullscreen) {
  //     debugger
  //     this.platform.ready().then(() => {
  //       const appElement = document.getElementsByTagName('ion-app')[0];
  //       if (appElement) {
  //         appElement.classList.add('fullscreen');
  //       }
  //     });
  //   } else {
  //     const appElement = document.getElementsByTagName('ion-app')[0];
  //     if (appElement) {
  //       appElement.classList.remove('fullscreen');
  //     }
  //   }
  // }

}
