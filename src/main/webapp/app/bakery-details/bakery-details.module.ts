import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrumbsandcreamSharedModule } from '../shared/shared.module';

import { BAKERY_DETAILS_ROUTE, BakeryDetailsComponent } from './';

@NgModule({
    imports: [CrumbsandcreamSharedModule, RouterModule.forRoot([BAKERY_DETAILS_ROUTE], { useHash: true })],
    declarations: [BakeryDetailsComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamAppBakeryDetailsModule {}
