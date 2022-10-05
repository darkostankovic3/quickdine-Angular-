import { ProductPortionPriceModel } from './product-portion-price.model';

export class ProductPortionModel {
    public product_portion_price: ProductPortionPriceModel;

    constructor(public id: number = null,
        public product_id: number = null,
        public name: string = null,
        public price_with_details: any = null) {
    }
}