import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrumbsandcreamSharedModule } from '../shared/shared.module';

import { MENU_ROUTE, MenuComponent } from './index';
import { MenuService } from 'app/menu/menu.service';
import { BakeryItemDetailsComponent } from 'app/menu/bakery-item-details/bakery-item-details.component';
import { BakeryItemsComponent } from 'app/menu/bakery-items/bakery-items.component';

@NgModule({
    imports: [CrumbsandcreamSharedModule, RouterModule.forRoot(MENU_ROUTE, { useHash: true })],
    declarations: [MenuComponent, BakeryItemsComponent, BakeryItemDetailsComponent],
    entryComponents: [],
    providers: [MenuService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrumbsandcreamAppMenuModule {}
