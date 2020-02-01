import { Moment } from 'moment';

export const enum Categories {
    cupcakes = 'cupcakes',
    brownies = 'brownies',
    drizzle_cakes = 'drizzle_cakes'
}

export interface IBakeryItem {
    id?: string;
    item?: string;
    itemImageContentType?: string;
    itemImage?: any;
    createDate?: Moment;
    lastUpdate?: Moment;
    description?: string;
    price?: number;
    category?: Categories;
}

export class BakeryItem implements IBakeryItem {
    constructor(
        public id?: string,
        public item?: string,
        public itemImageContentType?: string,
        public itemImage?: any,
        public createDate?: Moment,
        public lastUpdate?: Moment,
        public description?: string,
        public price?: number,
        public category?: Categories
    ) {}
}
