import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'apv-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() marginClasses: string = 'mt-1 mb-1';
  @Input() paddingClasses: string = '';
  @Input() placeholder: string = this.baseService.translate('offer-search-input');
  @Output() onSearchClick = new EventEmitter();

  constructor(public baseService: BaseService) {}

  ngOnInit() {}

  onSearch(event: any) {
    this.onSearchClick.emit(event);
  }
}
