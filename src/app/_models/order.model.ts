import { TaxModel } from 'app/_models/tax.model';
import { ProductModel } from './product.model';

export class OrderModel {
    public product_obj: ProductModel;
    public tax_obj: TaxModel[];
    public order_obj: any;

    constructor(public id: number = null,
        public quantity: number = null,
        public price: number = null,
        public remarks: string = null) {
    }
}