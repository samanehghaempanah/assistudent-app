import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from './file-uploader.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [ CommonModule, FormsModule,RouterModule,IonicModule],
  declarations: [FileUploaderComponent],
  exports: [FileUploaderComponent]
})
export class FileUploaderModule {}
