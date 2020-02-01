import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { BakeryItemDetailsComponent } from './bakery-item-details.component';

export const BAKERY_ITEM_DETAILS_ROUTE: Route = {
    path: 'bakery-item-details/:id',
    component: BakeryItemDetailsComponent,
    data: {
        authorities: [],
        pageTitle: 'Bakery Item Details'
    },
    canActivate: [UserRouteAccessService]
};
