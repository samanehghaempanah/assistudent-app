import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.page.html',
  styleUrls: ['./iframe.page.scss'],
})
export class IframePage implements OnInit {

  PageData = { Waiting: true, IFrameName: '', IFrameTitle: '', IFrameURL: '' }

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    // Set pre data
    this.PageData.IFrameName = this.route.snapshot.paramMap.get('name');
    this.PageData.IFrameTitle = this.route.snapshot.paramMap.get('title');

    // load iframe URL
    this.authService.IFrame(this.PageData.IFrameName).then((result: any) => {
      if (result) {
        console.log(result.URL);
        this.PageData.IFrameURL = result.URL;
      }
    }).finally(() => { this.PageData.Waiting = false; });
  }

}
