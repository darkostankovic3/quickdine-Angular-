import { BrandLocationProductModel } from './brand-location-product.model';
import { ProductPriceModel } from './product-price.model';

export class BrandLocationModel {
    public product_prices: ProductPriceModel[];
    public brand_location_products: BrandLocationProductModel[];

    constructor(public id: number = null,
        public location_id: number = null,
        public brand_menu_id: number = null,
        public brand_id: number = null) {
    }
}