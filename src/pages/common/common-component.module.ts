import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TextInputModalComponent } from './text-input-modal/text-input-modal.component';
import { NumberInputModalComponent } from './number-input-modal/number-input-modal.component';

@NgModule({
    declarations: [
        TextInputModalComponent,
        NumberInputModalComponent
    ],
    imports: [
        IonicPageModule,
        CommonModule
    ],
    entryComponents: [
        TextInputModalComponent,
        NumberInputModalComponent
    ],
    exports: [
        TextInputModalComponent,
        NumberInputModalComponent
    ]
})
export class CommonCompoentModule { }