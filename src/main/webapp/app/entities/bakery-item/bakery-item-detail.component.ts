import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBakeryItem } from 'app/shared/model/bakery-item.model';

@Component({
    selector: 'jhi-bakery-item-detail',
    templateUrl: './bakery-item-detail.component.html'
})
export class BakeryItemDetailComponent implements OnInit {
    bakeryItem: IBakeryItem;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bakeryItem }) => {
            this.bakeryItem = bakeryItem;
        });
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
}
