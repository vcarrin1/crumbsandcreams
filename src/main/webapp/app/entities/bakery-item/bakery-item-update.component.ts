import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils } from 'ng-jhipster';

import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { BakeryItemService } from './bakery-item.service';

@Component({
    selector: 'jhi-bakery-item-update',
    templateUrl: './bakery-item-update.component.html'
})
export class BakeryItemUpdateComponent implements OnInit {
    private _bakeryItem: IBakeryItem;
    isSaving: boolean;
    createDate: string;
    lastUpdate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private bakeryItemService: BakeryItemService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.bakeryItem, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.bakeryItem.createDate = moment(this.createDate, DATE_TIME_FORMAT);
        this.bakeryItem.lastUpdate = moment(this.lastUpdate, DATE_TIME_FORMAT);
        if (this.bakeryItem.id !== undefined) {
            this.subscribeToSaveResponse(this.bakeryItemService.update(this.bakeryItem));
        } else {
            this.subscribeToSaveResponse(this.bakeryItemService.create(this.bakeryItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBakeryItem>>) {
        result.subscribe((res: HttpResponse<IBakeryItem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get bakeryItem() {
        return this._bakeryItem;
    }

    set bakeryItem(bakeryItem: IBakeryItem) {
        this._bakeryItem = bakeryItem;
        this.createDate = moment(bakeryItem.createDate).format(DATE_TIME_FORMAT);
        this.lastUpdate = moment(bakeryItem.lastUpdate).format(DATE_TIME_FORMAT);
    }
}
