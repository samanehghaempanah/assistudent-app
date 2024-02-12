import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'apv-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
})
export class SelectBoxComponent implements OnInit {
  @ViewChild('matSelect') matSelect: ElementRef | any;
  @ViewChild('matInput') matInput: ElementRef | any;

  @Input() label: string = '';
  @Input() pageMode: any;
  @Input() searchable: boolean = false;
  @Input() multiple: boolean = false;
  @Input() scrollable: boolean = false;
  @Input() showOptions: boolean = true;
  @Input() OptionItems: any[] = [];
  @Input() entityModel: any;
  @Output() searchValue = new EventEmitter();
  @Output() selectedOption = new EventEmitter();
  @Output() scroll = new EventEmitter();

  PageData = {
    formGroup: null as FormGroup,
    filteredOptions: [] as any[],
    selectedOption: [] as any,
    searchVal: '',
  }

  constructor(public baseService: BaseService, private fb: FormBuilder) { }

  ngOnInit() {
    this.PageData.formGroup = this.fb.group({
      myControl: ['']
    });

    this.PageData.formGroup.get('myControl')?.valueChanges.pipe(debounceTime(1000)).subscribe((response: any) => {
      this.filterData(response);
      this.PageData.searchVal = response;
      if (response.length < 3){this.ngOnChanges()}
    });
  }

  ngOnChanges() {
    if (this.showOptions) { this.PageData.filteredOptions = this.OptionItems; }

    else if (!this.showOptions) {
      if (this.PageData.searchVal.length >= 3) {
        this.PageData.filteredOptions = this.OptionItems;
      }
      // else { this.PageData.filteredOptions = [{ Key: '', Value: 0 }]; }
    }

  }

  filterData(enteredData: string) {
    if (enteredData.length >= 3) {
      this.searchValue.emit(enteredData);

      this.PageData.filteredOptions = this.OptionItems.filter(item => {
        return item.Title.toLowerCase().indexOf(enteredData) > -1
      });
    }
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectedOption.emit(event.value);
    this.resetSelect();

    if (!this.showOptions) {
      this.resetSelect();
      this.ngOnChanges();
    }
  }

  resetSelect() {
    this.entityModel = null;
    this.matSelect.writeValue(null);
    this.PageData.formGroup.patchValue({
      myControl: ''
    })
  }

  loadAllOnScroll() {
    if (this.scrollable) { this.scroll.emit(true); }
  }
}
