import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TextInputModalComponent } from './text-input-modal/text-input-modal.component';
import { NumberInputModalComponent } from './number-input-modal/number-input-modal.component';
import { CustomerListComponent } from '../customer/customer-list/customer-list';
import { SelectListModalComponent } from './select-list/select-list';

@NgModule({
    declarations: [
        TextInputModalComponent,
        NumberInputModalComponent,
        CustomerListComponent,
        SelectListModalComponent
    ],
    imports: [
        IonicPageModule,
        CommonModule
    ],
    entryComponents: [
        TextInputModalComponent,
        NumberInputModalComponent,
        CustomerListComponent,
        SelectListModalComponent
    ],
    exports: [
        TextInputModalComponent,
        NumberInputModalComponent,
        CustomerListComponent,
        SelectListModalComponent
    ]
})
export class CommonCompoentModule { }