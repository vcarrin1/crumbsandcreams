import { Moment } from 'moment';

export const enum Categories {
    cupcakes = 'cupcakes',
    brownies = 'brownies',
    drizzle_cakes = 'drizzle_cakes',
    cookies = 'cookies'
}

export interface IBakeryItem {
    id?: string;
    item?: string;
    itemImageContentType?: string;
    itemImage?: any;
    createDate?: Moment;
    lastUpdate?: Moment;
    description?: any;
    price?: number;
    category?: Categories;
    ingredients?: any;
}

export class BakeryItem implements IBakeryItem {
    constructor(
        public id?: string,
        public item?: string,
        public itemImageContentType?: string,
        public itemImage?: any,
        public createDate?: Moment,
        public lastUpdate?: Moment,
        public description?: any,
        public price?: number,
        public category?: Categories,
        public ingredients?: any
    ) {}
}
