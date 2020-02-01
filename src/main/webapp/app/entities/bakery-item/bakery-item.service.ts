import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBakeryItem } from 'app/shared/model/bakery-item.model';

type EntityResponseType = HttpResponse<IBakeryItem>;
type EntityArrayResponseType = HttpResponse<IBakeryItem[]>;

@Injectable({ providedIn: 'root' })
export class BakeryItemService {
    private resourceUrl = SERVER_API_URL + 'api/bakery-items';

    constructor(private http: HttpClient) {}

    create(bakeryItem: IBakeryItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bakeryItem);
        return this.http
            .post<IBakeryItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(bakeryItem: IBakeryItem): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(bakeryItem);
        return this.http
            .put<IBakeryItem>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http
            .get<IBakeryItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBakeryItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(bakeryItem: IBakeryItem): IBakeryItem {
        const copy: IBakeryItem = Object.assign({}, bakeryItem, {
            createDate: bakeryItem.createDate != null && bakeryItem.createDate.isValid() ? bakeryItem.createDate.toJSON() : null,
            lastUpdate: bakeryItem.lastUpdate != null && bakeryItem.lastUpdate.isValid() ? bakeryItem.lastUpdate.toJSON() : null
        });
        return copy;
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
