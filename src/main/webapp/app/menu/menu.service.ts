import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { createRequestOption } from '../shared/index';

type EntityResponseType = HttpResponse<IBakeryItem>;
type EntityArrayResponseType = HttpResponse<IBakeryItem[]>;

@Injectable()
export class MenuService {
    private bakeryItemsUrl = SERVER_API_URL + 'api/bakery-items';
    private bakeryItemsByCategoryUrl = SERVER_API_URL + 'api/bakery-items-by-category';

    constructor(private http: HttpClient) {}

    getItemsByCategory(category: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBakeryItem[]>(`${this.bakeryItemsByCategoryUrl}/${category}`, {
                params: options,
                observe: 'response'
            })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    getCategoryByName(categoryName: string): Observable<EntityResponseType> {
        return this.http
            .get<IBakeryItem>(`${this.bakeryItemsUrl}/${categoryName}`, {
                observe: 'response'
            })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.lastUpdate = res.body.lastUpdate != null ? moment(res.body.lastUpdate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((bakeryItem: IBakeryItem) => {
            bakeryItem.createDate = bakeryItem.createDate != null ? moment(bakeryItem.createDate) : null;
            bakeryItem.lastUpdate = bakeryItem.lastUpdate != null ? moment(bakeryItem.lastUpdate) : null;
        });
        return res;
    }
}
