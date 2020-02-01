import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuService } from 'app/menu/menu.service';
import { IBakeryCategory } from 'app/shared/model/bakery-category.model';
import { BakeryItemService } from 'app/entities/bakery-item/bakery-item.service';

@Component({
    selector: 'jhi-bakery-items',
    templateUrl: './bakery-items.component.html',
    styleUrls: ['bakery-items.component.scss']
})
export class BakeryItemsComponent implements OnInit {
    bakeryItemsCol1: IBakeryItem[];
    bakeryItemsCol2: IBakeryItem[];

    constructor(
        private menuService: MenuService,
        private bakeryItemService: BakeryItemService,
        private jhiAlertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.loadAll(params.category);
        });
    }

    loadAll(category) {
        this.menuService.getItemsByCategory(category, {}).subscribe(
            (res: HttpResponse<IBakeryItem[]>) => {
                const half = Math.ceil(res.body.length / 2);
                this.bakeryItemsCol1 = res.body.slice(0, half);
                this.bakeryItemsCol2 = res.body.slice(half, res.body.length);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    navigateToItemDetails(id) {
        this.router.navigate(['/bakery-item-details/' + id]);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
