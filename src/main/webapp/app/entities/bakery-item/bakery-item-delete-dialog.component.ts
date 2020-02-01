import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { BakeryItemService } from './bakery-item.service';

@Component({
    selector: 'jhi-bakery-item-delete-dialog',
    templateUrl: './bakery-item-delete-dialog.component.html'
})
export class BakeryItemDeleteDialogComponent {
    bakeryItem: IBakeryItem;

    constructor(private bakeryItemService: BakeryItemService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.bakeryItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bakeryItemListModification',
                content: 'Deleted an bakeryItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bakery-item-delete-popup',
    template: ''
})
export class BakeryItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ bakeryItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BakeryItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.bakeryItem = bakeryItem;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
