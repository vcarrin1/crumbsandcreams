import { Moment } from 'moment';

export interface IBakeryCategory {
    id?: string;
    category?: string;
    createDate?: Moment;
    lastUpdate?: Moment;
    description?: string;
}

export class BakeryCategory implements IBakeryCategory {
    constructor(
        public id?: string,
        public category?: string,
        public createDate?: Moment,
        public lastUpdate?: Moment,
        public description?: string
    ) {}
}
