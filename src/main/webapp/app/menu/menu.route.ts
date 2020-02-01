import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { MenuComponent } from './menu.component';
import { BakeryItemDetailsComponent } from 'app/menu/bakery-item-details/bakery-item-details.component';

export const MENU_ROUTE: Routes = [
    {
        path: 'menu',
        redirectTo: 'menu/cupcakes',
        pathMatch: 'full'
    },
    {
        path: 'menu/:category',
        component: MenuComponent,
        data: {
            authorities: [],
            pageTitle: 'Menu'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bakery-item-details/:id',
        component: BakeryItemDetailsComponent,
        data: {
            authorities: [],
            pageTitle: 'Bakery Item Details'
        }
        // canActivate: [UserRouteAccessService]
    }
];
