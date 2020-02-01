import { Component, OnInit } from '@angular/core';
import { BakeryItemService } from 'app/entities/bakery-item/bakery-item.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute, Route } from '@angular/router';
import { MenuService } from 'app/menu/menu.service';

@Component({
    selector: 'jhi-bakery-item-details',
    templateUrl: './bakery-item-details.component.html',
    styleUrls: ['bakery-item-details.component.scss']
})
export class BakeryItemDetailsComponent implements OnInit {
    bakeryItem: IBakeryItem;
    id: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private activatedRoute: ActivatedRoute,
        private bakeryItemService: BakeryItemService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(data => {
            console.log('', data);
            this.id = data.id;
        });
        this.getItemDetails();
    }

    getItemDetails() {
        // this.categoryId = await this.bakeryCategoryService.getCategoryByName(this.categoryName);
        this.bakeryItemService
            .find(this.id)
            .subscribe(
                (res: HttpResponse<IBakeryItem>) => (this.bakeryItem = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
