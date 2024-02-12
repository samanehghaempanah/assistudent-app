import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectBoxComponent } from './select-box.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollEndDirective } from './scroll-end.directive';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  declarations: [SelectBoxComponent, ScrollEndDirective],
  exports: [SelectBoxComponent]
})
export class SelectBoxComponentModule { }
