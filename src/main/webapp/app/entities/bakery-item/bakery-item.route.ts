import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BakeryItem } from 'app/shared/model/bakery-item.model';
import { BakeryItemService } from './bakery-item.service';
import { BakeryItemComponent } from './bakery-item.component';
import { BakeryItemDetailComponent } from './bakery-item-detail.component';
import { BakeryItemUpdateComponent } from './bakery-item-update.component';
import { BakeryItemDeletePopupComponent } from './bakery-item-delete-dialog.component';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';

@Injectable({ providedIn: 'root' })
export class BakeryItemResolve implements Resolve<IBakeryItem> {
    constructor(private service: BakeryItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((bakeryItem: HttpResponse<BakeryItem>) => bakeryItem.body));
        }
        return of(new BakeryItem());
    }
}

export const bakeryItemRoute: Routes = [
    {
        path: 'bakery-item',
        component: BakeryItemComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'BakeryItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bakery-item/:id/view',
        component: BakeryItemDetailComponent,
        resolve: {
            bakeryItem: BakeryItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BakeryItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bakery-item/new',
        component: BakeryItemUpdateComponent,
        resolve: {
            bakeryItem: BakeryItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BakeryItems'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bakery-item/:id/edit',
        component: BakeryItemUpdateComponent,
        resolve: {
            bakeryItem: BakeryItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BakeryItems'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bakeryItemPopupRoute: Routes = [
    {
        path: 'bakery-item/:id/delete',
        component: BakeryItemDeletePopupComponent,
        resolve: {
            bakeryItem: BakeryItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BakeryItems'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
