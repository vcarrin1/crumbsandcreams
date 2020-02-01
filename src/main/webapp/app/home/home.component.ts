import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, Principal, Account } from '../core/index';
import { BakeryItemService } from 'app/entities/bakery-item/bakery-item.service';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    bakeryItems: IBakeryItem[];

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private bakeryItemService: BakeryItemService,
        private router: Router
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.bakeryItemService
            .query({})
            .subscribe(
                (res: HttpResponse<IBakeryItem[]>) => (this.bakeryItems = res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    navigateToItemDetails(id) {
        this.router.navigate(['/bakery-item-details/' + id]);
    }

    private onError(errorMessage: string) {
        console.error(errorMessage, null, null);
    }
}
