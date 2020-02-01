import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { BakeryDetailsComponent } from './bakery-details.component';

export const BAKERY_DETAILS_ROUTE: Route = {
    path: 'bakery-details',
    component: BakeryDetailsComponent,
    data: {
        authorities: [],
        pageTitle: 'bakery-details.title'
    },
    canActivate: [UserRouteAccessService]
};
