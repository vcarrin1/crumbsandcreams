import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrumbsandcreamSharedModule } from '../shared/index';
import { HOME_ROUTE, HomeComponent } from './index';

@NgModule({
    imports: [CrumbsandcreamSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamHomeModule {}
