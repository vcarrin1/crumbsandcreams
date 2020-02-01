import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CrumbsandcreamBakeryItemModule } from './bakery-item/bakery-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CrumbsandcreamBakeryItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamEntityModule {}
