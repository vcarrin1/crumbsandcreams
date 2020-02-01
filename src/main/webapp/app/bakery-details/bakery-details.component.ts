import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-bakery-details',
    templateUrl: './bakery-details.component.html',
    styleUrls: ['bakery-details.component.scss']
})
export class BakeryDetailsComponent implements OnInit {
    message: string;

    constructor() {
        this.message = 'BakeryDetailsComponent message';
    }

    ngOnInit() {}
}
