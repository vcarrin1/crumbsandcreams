import { Component, OnInit } from '@angular/core';
import { IBakeryCategory } from 'app/shared/model/bakery-category.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
    selector: 'jhi-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {
    message: string;
    categoryList: IBakeryCategory[];

    constructor(private jhiAlertService: JhiAlertService, private router: Router) {
        this.message = 'MenuComponent message';
    }

    ngOnInit() {
        // this.loadCategories();
    }

    // loadCategories() {
    //   this.bakeryCategoryService.query({}).subscribe(
    //     (res: HttpResponse<IBakeryCategory[]>) => {
    //       this.categoryList = res.body;
    //       this.router.navigate([
    //         '/menu/' +
    //           this.categoryList[0].category +
    //           '/' +
    //           this.categoryList[0].id
    //       ]);
    //     },
    //     (res: HttpErrorResponse) => this.onError(res.message)
    //   );
    // }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
