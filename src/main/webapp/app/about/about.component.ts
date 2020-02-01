import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-about',
    templateUrl: './about.component.html',
    styleUrls: ['about.component.scss']
})
export class AboutComponent implements OnInit {
    message: string;

    constructor() {
        this.message = 'AboutComponent message';
    }

    ngOnInit() {}
}
