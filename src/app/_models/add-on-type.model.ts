import { PriceDetailModel } from './price-detail.model';
export class AddOnTypeModel {
    public price_details: PriceDetailModel;

    constructor(public id: number = null,
        public name: string = null,
        public price: number = null,
        public quantity: number = 0,
        public price_with_tax: number = 1,
        public price_without_tax: number = 0.5) {
    }
}