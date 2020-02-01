import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrumbsandcreamSharedModule } from 'app/shared';
import {
    BakeryItemComponent,
    BakeryItemDetailComponent,
    BakeryItemUpdateComponent,
    BakeryItemDeletePopupComponent,
    BakeryItemDeleteDialogComponent,
    bakeryItemRoute,
    bakeryItemPopupRoute
} from './';

const ENTITY_STATES = [...bakeryItemRoute, ...bakeryItemPopupRoute];

@NgModule({
    imports: [CrumbsandcreamSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BakeryItemComponent,
        BakeryItemDetailComponent,
        BakeryItemUpdateComponent,
        BakeryItemDeleteDialogComponent,
        BakeryItemDeletePopupComponent
    ],
    entryComponents: [BakeryItemComponent, BakeryItemUpdateComponent, BakeryItemDeleteDialogComponent, BakeryItemDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamBakeryItemModule {}
