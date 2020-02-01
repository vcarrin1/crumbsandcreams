import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrumbsandcreamSharedModule } from '../shared/shared.module';

import { ABOUT_ROUTE, AboutComponent } from './';

@NgModule({
    imports: [CrumbsandcreamSharedModule, RouterModule.forRoot([ABOUT_ROUTE], { useHash: true })],
    declarations: [AboutComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamAppAboutModule {}
