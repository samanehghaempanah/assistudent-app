import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponentModule } from 'src/app/components/page-header/page-header.module';
import { sharedPipeModule } from 'src/app/definitions/pipes/shared-pipe.module';
import { ScrollableTabComponentModule } from "../../components/scrollable-tab/scrollable-tab.module";
import { ScorePageRoutingModule } from './score-routing.module';
import { ScorePage } from './score.page';

@NgModule({
    declarations: [ScorePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        sharedPipeModule,
        ScorePageRoutingModule,
        ScrollableTabComponentModule,
        PageHeaderComponentModule
    ]
})
export class ScorePageModule { }
