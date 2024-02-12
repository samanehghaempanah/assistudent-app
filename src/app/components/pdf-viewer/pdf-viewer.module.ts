import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PdfViewerComponent } from './pdf-viewer.component';
import { sharedPipeModule } from "../../definitions/pipes/shared-pipe.module";

@NgModule({
    declarations: [PdfViewerComponent],
    exports: [PdfViewerComponent],
    imports: [CommonModule, FormsModule, IonicModule, sharedPipeModule]
})
export class PdfViewerComponentModule {}
